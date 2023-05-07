import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './LoginModal.module.scss';
import ModalInputUI from '@/components/UI/ModalInput/ModalInputUI';
import { useRef, useState } from 'react';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';

interface LoginModalProps {
    type: 'sign-in' | 'sign-up';
}

const LoginModal = ({ type }: LoginModalProps) => {
    const [email, setEmail] = useState<string>('');
    const [passord, setPassord] = useState<string>('');
    const [repeatPassord, setRepeatPassord] = useState<string>('');

    const [emailFocus, setEmailFocus] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState<boolean>(false);

    const emailWrapperRef = useRef(null);
    const passwordWrapperRef = useRef(null);
    const repeatPasswordWrapperRef = useRef(null);

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowRepeatPassword, setIsShowRepeatPassword] = useState<boolean>(false);

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
                            placeholder="Введите email"
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
                            placeholder="Введите пароль"
                            value={passord}
                            onChange={(value) => setPassord(value)}
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
                                value={repeatPassord}
                                onChange={(value) => setRepeatPassord(value)}
                                onClick={() => setIsShowRepeatPassword(!isShowRepeatPassword)}
                            />
                        </div>
                    )}

                    <ColoredButton className={styles.container__button} color="red" size="large">
                        {type === 'sign-in' ? 'Войти' : 'Зарегистрироваться'}
                    </ColoredButton>
                </div>
            </div>
        </ModalUI>
    );
};

export default LoginModal;
