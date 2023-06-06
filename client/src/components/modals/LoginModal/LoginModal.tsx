import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './LoginModal.module.scss';
import InputUI from '@/components/UI/Input/InputUI';
import { useEffect, useRef, useState } from 'react';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import TextLinkUI from '@/components/UI/links/TextLink/TextLinkUI';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { login, loginGoogle, loginVK, logout, registration } from '@/store/ActionCreators';
import exitIcon from '../../../../public/icons/exit.svg';
import TransparentButton from '@/components/UI/buttons/TransparentButton/TransparentButton';
import { userSlice } from '../../../store/slices/userSlice';

interface LoginModalProps {
    type: 'sign-in' | 'sign-up' | 'authorized';
}

const LoginModal = ({ type }: LoginModalProps) => {
    const { t } = useTranslation('modals');
    const location = useRouter();
    const backPath = location.asPath.replace(/(\?ivi_search)|(\?sign-in)|(\?sign-up)|(\?trailer)|(\?more)/, '');
    const hrefSing = type === 'sign-in' ? `${backPath}?sign-up` : `${backPath}?sign-in`;
    const dispatch = useAppDispatch();
    const { user, isAuth, error } = useAppSelector((state) => state.user);
    const [isClose, setIsClose] = useState(false);
    const [errAuth, setErrAuth] = useState('');
    const [errPassword, setErrPassword] = useState('');

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

    const [isValid, setIsValid] = useState(false);

    /* const [signIn, {}] = loginAPI.useFetchLoginMutation();
    const [signUp, {}] = loginAPI.useFetchRegistrationMutation();
    console.log(signIn.bind);*/

    // const [signInWithVK, {}] = loginAPI.useFetchAuthWithVKQuery()
    // const [signInWithGoogle, {}] = loginAPI.useFetchAuthWithGoogleQuery()

    const signInHandler = async () => {
        dispatch(login(email, password));
        /* await signIn({ email: email, password: password });*/
    };

    const signInGoogleHandler = async () => {
        dispatch(loginGoogle());
    };

    const signInVKHandler = async () => {
        dispatch(loginVK());
    };

    const signUpHandler = async () => {
        dispatch(registration(email, password));
        /*await signUp({ email: email, password: password });*/
    };

    const logoutHandler = () => {
        dispatch(logout());
        setIsClose(true);
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

    useEffect(() => {
        if (error === 'Internal server error' && type === 'sign-up') {
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            dispatch(userSlice.actions.setError(''));
            setErrAuth(location.locale === 'ru' ? 'Пользователь уже зарегистрирован' : 'User already registered');
        }

        if (error === 'Internal server error' && type === 'sign-in') {
            setErrAuth(
                location.locale === 'ru' ? 'Email или пароль введены неверно' : 'Email or password entered incorrectly',
            );
            setEmail('');
            setPassword('');
            dispatch(userSlice.actions.setError(''));
        }

        if (!!password && !!repeatPassword && type === 'sign-up') {
            setErrPassword(location.locale === 'ru' ? 'Пароли не совпадают' : 'Password mismatch');
            setIsValid(true);
        }

        if (error === '' && password === repeatPassword && type === 'sign-up') {
            setErrPassword('');
            setIsValid(false);
        }

        if (isAuth) {
            setErrAuth('');
            setErrPassword('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
        }
    }, [error, isAuth, password, repeatPassword, type]);

    return (
        <ModalUI close={isClose}>
            {type === 'authorized' || isAuth ? (
                <div className={styles.container}>
                    <h3 className={styles.container__user}>{user.user}</h3>
                    <TransparentButton
                        textColor="faded"
                        className={styles.container__link}
                        onClick={() => logoutHandler()}
                    >
                        <Image src={exitIcon} height={20} width={20} alt="Иконка 'Выход'" /> {t('loginModal.signOut')}
                    </TransparentButton>
                </div>
            ) : (
                <div className={styles.container} onClick={(event) => clickHandler(event)}>
                    <div className={styles.container__content}>
                        <div
                            className={styles.container__inputWrapper}
                            ref={emailWrapperRef}
                            onClick={(event) => clickHandler(event)}
                        >
                            <InputUI
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
                            <InputUI
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
                                <InputUI
                                    focus={repeatPasswordFocus}
                                    type="password"
                                    inputType={isShowRepeatPassword ? 'text' : 'password'}
                                    placeholder={t('loginModal.passwordConfirm')}
                                    value={repeatPassword}
                                    onChange={(value) => setRepeatPassword(value)}
                                    onClick={() => setIsShowRepeatPassword(!isShowRepeatPassword)}
                                />
                            </div>
                        )}

                        {errAuth && <div className={styles.container__error}>{errAuth}</div>}
                        {errPassword && <div className={styles.container__error}>{errPassword}</div>}

                        <div className={styles.container__sing}>
                            <TextLinkUI href={`${hrefSing}`} option="dim">
                                {type === 'sign-in' ? t('loginModal.signUpLabel') : t('loginModal.signInLabel')}
                            </TextLinkUI>

                            <ColoredButton
                                onClick={type === 'sign-in' ? signInHandler : signUpHandler}
                                className={styles.container__button}
                                color="red"
                                size="large"
                                disabled={isValid}
                            >
                                {type === 'sign-in' ? t('loginModal.signIn') : t('loginModal.signUp')}
                            </ColoredButton>
                        </div>
                    </div>
                    <div className={styles.container__social}>
                        <h3>{t('loginModal.signInSocial')}</h3>

                        <div className={styles.container__socialButtons}>
                            <ColoredButton size="medium" color="gray" onClick={() => signInVKHandler()}>
                                <Image
                                    src="https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/social_vkontakte.svg"
                                    height={20}
                                    width={20}
                                    alt="Логотип Vk"
                                />
                            </ColoredButton>
                            <ColoredButton size="medium" color="gray" onClick={() => signInGoogleHandler()}>
                                <Image src="/icons/google.svg" height={20} width={20} alt="Логотип google" />
                            </ColoredButton>
                        </div>
                    </div>
                </div>
            )}
        </ModalUI>
    );
};

export default LoginModal;
