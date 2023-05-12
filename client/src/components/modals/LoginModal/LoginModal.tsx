import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './LoginModal.module.scss';
import ModalInputUI from '@/components/UI/ModalInput/ModalInputUI';
import { useRef, useState } from 'react';
import ButtonUI from '@/components/UI/buttons/Button/ButtonUI';
import { loginAPI } from '@/store/services/LoginService';
import { useTranslation } from 'next-i18next';

interface LoginModalProps {
    type: 'sign-in' | 'sign-up';
}

const LoginModal = ({ type }: LoginModalProps) => {
    const { t } = useTranslation('modals');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [emailFocus, setEmailFocus] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState<boolean>(false);

    const emailWrapperRef = useRef(null);
    const passwordWrapperRef = useRef(null);
    const repeatPasswordWrapperRef = useRef(null);

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowRepeatPassword, setIsShowRepeatPassword] = useState<boolean>(false);

    const [signIn, {}] = loginAPI.useFetchLoginMutation();
    const [signUp, {}] = loginAPI.useFetchRegistrationMutation();
    // const [signInWithVK, {}] = loginAPI.useFetchAuthWithVKQuery()
    // const [signInWithGoogle, {}] = loginAPI.useFetchAuthWithGoogleQuery()

    const signInHandler = async () => {
        await signIn({ email: email, password: password });
    };

    const signUpHandler = async () => {
        await signUp({ email: email, password: password });
    };

    const clickHandler = (event: React.MouseEvent) => {
        event.stopPropagation();

        const emailWrapper: HTMLDivElement = emailWrapperRef.current!;
        const passwordWrapper: HTMLDivElement = passwordWrapperRef.current!;
        const repeatPasswordWrapper: HTMLDivElement = repeatPasswordWrapperRef.current!;

        setEmailFocus(false);
        setPasswordFocus(false);
        setRepeatPasswordFocus(false);

        if (type === 'sign-in') {
            switch (true) {
                case emailWrapper.contains(event.currentTarget):
                    setEmailFocus(true);
                    break;
                case passwordWrapper.contains(event.currentTarget):
                    setPasswordFocus(true);
                    break;
            }
        } else {
            switch (true) {
                case emailWrapper.contains(event.currentTarget):
                    setEmailFocus(true);
                    break;
                case passwordWrapper.contains(event.currentTarget):
                    setPasswordFocus(true);
                    break;

                case repeatPasswordWrapper.contains(event.currentTarget):
                    setRepeatPasswordFocus(true);
                    break;
            }
        }
    };

    return (
        <ModalUI>
            <div className={styles.container} onClick={(event) => clickHandler(event)}>
                <div className={styles.container__content}>
                    <div
                        className={styles.container__inputWrapper}
                        ref={emailWrapperRef}
                        onClick={(event) => clickHandler(event)}
                    >
                        <ModalInputUI
                            focus={emailFocus}
                            type="email"
                            inputType="text"
                            placeholder={t('loginModal.emailInput')}
                            value={email}
                            onChange={(value) => setEmail(value)}
                        />
                    </div>

                    <div
                        className={styles.container__inputWrapper}
                        ref={passwordWrapperRef}
                        onClick={(event) => clickHandler(event)}
                    >
                        <ModalInputUI
                            focus={passwordFocus}
                            type="password"
                            inputType={isShowPassword ? 'text' : 'password'}
                            placeholder={t('loginModal.passwordInput')}
                            value={password}
                            onChange={(value) => setPassword(value)}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        />
                    </div>

                    {type === 'sign-up' && (
                        <div
                            className={styles.container__inputWrapper}
                            ref={repeatPasswordWrapperRef}
                            onClick={(event) => clickHandler(event)}
                        >
                            <ModalInputUI
                                focus={repeatPasswordFocus}
                                type="password"
                                inputType={isShowRepeatPassword ? 'text' : 'password'}
                                placeholder="Подтвердите пароль"
                                value={repeatPassword}
                                onChange={(value) => setRepeatPassword(value)}
                                onClick={() => setIsShowRepeatPassword(!isShowRepeatPassword)}
                            />
                        </div>
                    )}

                    <ButtonUI onClick={type === 'sign-in' ? signInHandler : signUpHandler} className={styles.container__button} background="lightRed" shape="large">
                        {type === 'sign-in' ? t('loginModal.signIn') : t('loginModal.signUp')}
                    </ButtonUI>
                </div>
            </div>
        </ModalUI>
    );
};

export default LoginModal;
