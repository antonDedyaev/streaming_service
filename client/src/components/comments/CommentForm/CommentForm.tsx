import InputUI from '@/components/UI/Input/InputUI';
import styles from './CommentForm.module.scss';
import { useRef, useState } from 'react';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface CommentFormProps {
    onSubmit: (value: string) => void
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
    const { t } = useTranslation('movie');
    const [value, setValue] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);

    const inputWrapperRef = useRef(null);

    const clickHandler = (event: React.MouseEvent) => {
        const inputWrapper: HTMLDivElement = inputWrapperRef.current!;

        if (inputWrapper.firstElementChild === event.target) {
            setFocus(true);
        } else {
            setFocus(false);
        }
    };

    return (
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
                    onChange={(value) => setValue(value)}
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
    );
};

export default CommentForm;
