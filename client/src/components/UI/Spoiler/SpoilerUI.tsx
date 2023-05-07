import { ReactNode, useState } from 'react';
import styles from './SpoilerUI.module.scss';
import TransparentButton from '../buttons/TransparentButton/TransparentButton';

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
                <TransparentButton
                    className={styles.container__button}
                    textColor={buttonTextColor}
                    onClick={() => setIsShowAll(!isShowAll)}
                >
                    {isShowAll ? toggleButtonTexts[1] : toggleButtonTexts[0]}
                </TransparentButton>
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
