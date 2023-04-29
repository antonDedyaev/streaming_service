import { ReactNode, useState } from 'react';
import styles from './SpoilerUI.module.scss';
import ButtonUI from '../buttons/Button/ButtonUI';

interface SpoilerUIProps {
    children: ReactNode;
    toggleButtonTexts: [string, string];
    buttonTextColor?: 'bright' | 'faded';
    shownLines?: number;
    truncateFormat?: 'horizontal' | 'vertical';
}

const SpoilerUI = ({
    children,
    toggleButtonTexts,
    buttonTextColor = 'bright',
    shownLines = 2,
    truncateFormat = 'vertical',
}: SpoilerUIProps) => {
    const [isShowAll, setIsShowAll] = useState(false);

    const buttonColor =
        buttonTextColor === 'bright'
            ? styles.container__button_bright
            : styles.container__button_faded;

    const textDisplayClass = isShowAll ? styles.container_show : styles.container_hidden;

    return (
        <>
            <div
                role="spoiler-wrapper"
                id="text-wrapper"
                data-testid="clipped-text"
                className={[styles.container, textDisplayClass].join(' ')}
            >
                <div className={[styles.container__text, shownLines !== 0 ? 'clamped' : 'hidden'].join(' ')}>{children}</div>
                <ButtonUI
                    className={[styles.container__button, buttonColor].join(' ')}
                    onClick={() => setIsShowAll(!isShowAll)}
                    background='transparent'
                    shape='none'
                >
                    {isShowAll ? toggleButtonTexts[1] : toggleButtonTexts[0]}
                </ButtonUI>
            </div>
            <style jsx>
                {`
                    .hidden {
                        display: none;
                    }
                    .clamped {
                        -webkit-line-clamp: ${shownLines};
                        -webkit-box-orient: ${truncateFormat};
                    }
                `}
            </style>
        </>
    );
};

export default SpoilerUI;
