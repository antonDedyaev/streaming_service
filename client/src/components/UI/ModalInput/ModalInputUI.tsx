import React, { useEffect, useRef, useState } from 'react';
import styles from './ModalInputUI.module.scss';
import searchIcon from '../../../../public/icons/search.svg';
import closeIcon from '../../../../public/icons/close.svg';
import userIcon from '../../../../public/icons/user.svg';
import eyeCloseIcon from '../../../../public/icons/eye_close.svg';
import eyeOpenIcon from '../../../../public/icons/eye_open.svg';
import Image from 'next/image';

interface ModalInputUIProps {
    type: 'search' | 'email' | 'password' | 'comment';
    inputType: string;
    placeholder: string;
    value: string;
    focus: boolean;
    onChange: (value: string) => void;
    onClick?: () => void;
}

const ModalInputUI = ({ type, inputType, placeholder, value, focus, onChange, onClick }: ModalInputUIProps) => {
    const inputRef = useRef(null);

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    useEffect(() => {
        if (focus) {
            const input: HTMLInputElement = inputRef.current!;
            input.focus();
        }
    }, [focus]);

    const passwordClickHandler = () => {
        if (onClick) onClick();

        setIsShowPassword(!isShowPassword);
    };

    return (
        <div
            className={[
                styles.container,
                styles[`container_${type}`],
                focus || value ? styles.container_focus : '',
            ].join(' ')}
        >
            <div className={styles.container__placeholder}>{placeholder}</div>

            <input
                ref={inputRef}
                className={styles.container__input}
                type={inputType}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />

            {type === 'search' &&
                (value === '' ? (
                    <Image src={searchIcon} className={styles.container__icon} alt="search" />
                ) : (
                    <Image
                        src={closeIcon}
                        className={styles.container__icon}
                        alt="close"
                        onClick={() => (onClick ? onClick() : '')}
                    />
                ))}

                {type === 'comment' &&
                    (value === '' ? ('') : (
                        <Image
                            src={closeIcon}
                            className={styles.container__icon}
                            alt="close"
                            onClick={() => (onClick ? onClick() : '')}
                        />
                    ))}

            {type === 'email' && <Image src={userIcon} className={styles.container__icon} alt="user" />}

            {type === 'password' &&
                (isShowPassword ? (
                    <Image
                        src={eyeOpenIcon}
                        className={[styles.container__icon, styles.container__icon_eye].join(' ')}
                        alt=""
                        onClick={passwordClickHandler}
                    />
                ) : (
                    <Image
                        src={eyeCloseIcon}
                        className={[styles.container__icon, styles.container__icon_eye].join(' ')}
                        alt=""
                        onClick={passwordClickHandler}
                    />
                ))}
        </div>
    );
};

export default ModalInputUI;
