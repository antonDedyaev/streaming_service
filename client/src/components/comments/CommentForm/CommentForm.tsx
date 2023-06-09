import InputUI from '@/components/UI/Input/InputUI';
import styles from './CommentForm.module.scss';
import { useRef, useState } from 'react';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';
import { addNewComment } from '@/store/ActionCreators';
import axios from 'axios';
import { commentsSlice } from '@/store/slices/commentsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';


interface CommentFormProps {
    onSubmit: (value: string) => void
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
    const { t } = useTranslation('movie');
    const [value, setValue] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const inputWrapperRef = useRef(null);
    const currentUser = useAppSelector((state) => state.user.user);

    const clickHandler = (event: React.MouseEvent) => {
        const inputWrapper: HTMLDivElement = inputWrapperRef.current!;

        if (inputWrapper.firstElementChild === event.target) {
            setFocus(true);
        } else {
            setFocus(false);
            setShowTooltip(false);
        }
    };

    const changeHandler = (value: string) => {
        setValue(value);

        if (!currentUser.user && value != '') {
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div
                    className={styles.container__inputWrapper}
                    ref={inputWrapperRef}
                    onClick={(event) => clickHandler(event)}
                >
                    <InputUI
                        focus={focus}
                        type="comment"
                        inputType="text"
                        placeholder={t('comments.placeholder')}
                        value={value}
                        onChange={(value) => changeHandler(value)}
                        onClick={() => setValue('')}
                    />
                </div>
                <ColoredButton 
                    className={styles.container__button}
                    size='large'
                    color='gray'
                    onClick={() => {
                        onSubmit(value);
                        setValue('')
                    }}
                >
                    {t('comments.send')}
                </ColoredButton>
            </div>
            
            {showTooltip && <div className={styles.tooltip}>{t('comments.tooltip')}</div>}
        </>
    );
};

export default CommentForm;
