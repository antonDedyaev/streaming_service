import ModalInputUI from '@/components/UI/ModalInput/ModalInputUI';
import styles from './CommentForm.module.scss';
import { useRef, useState } from 'react';
import ColoredButton from '@/components/UI/buttons/ColoredButton/ColoredButton';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface CommentFormProps {
    
}

const CommentForm = ({  }: CommentFormProps) => {
    const { t } = useTranslation('movie');
    const { locale } = useRouter();
    const [value, setValue] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);

    const inputWrapperRef = useRef(null);

    const clickHandler = (event: React.MouseEvent) => {
        const inputWrapper: HTMLDivElement = inputWrapperRef.current!;

        if (inputWrapper.firstElementChild === event.target) {
            setFocus(true);
        } else {
            setFocus(false)
        }
    }

    const submitHeandler = () => {
        console.log(value)
        setValue('')
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.container__inputWrapper}
                ref={inputWrapperRef}
                onClick={(event) => clickHandler(event)}
            >
                <ModalInputUI
                    focus={focus}
                    type='comment'
                    inputType='text'
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
                onClick={submitHeandler}
            >
                {t('comments.send')}
            </ColoredButton>
        </div>
    )
}

export default CommentForm;