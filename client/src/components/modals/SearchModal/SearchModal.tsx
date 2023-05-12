import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './SearchModal.module.scss';
import React, { useRef, useState } from 'react';
import ModalInputUI from '@/components/UI/ModalInput/ModalInputUI';
import SearchMovieLink from '@/components/UI/links/SearchMovieLink/SearchMovieLink';
import { useTranslation } from 'next-i18next';

const SearchModal = () => {
    const { t } = useTranslation('modals');
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
        <ModalUI>
            <div className={styles.container} onClick={(event) => clickHandler(event)}>
                <div className={styles.container__header}>
                    <h2 className={styles.container__title}>{t('searchModal.search')}</h2>

                    <div className={styles.container__inputWrapper} ref={inputWrapperRef}>
                        <ModalInputUI
                            focus={focus}
                            type="search"
                            inputType="string"
                            placeholder={t('searchModal.moviesSearch')}
                            value={value}
                            onChange={(value) => setValue(value)}
                            onClick={() => setValue('')}
                        />
                    </div>
                </div>

                <div className={styles.container__content}>
                    <SearchMovieLink href="/movie/1" name="Каратэ пацан" year={2010} />
                </div>
            </div>
        </ModalUI>
    );
};

export default SearchModal;
