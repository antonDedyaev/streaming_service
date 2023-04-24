import { ReactNode, useState } from 'react';
import styles from './SpoilerUI.module.scss';

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
    const [isCollapsed, setIsCollapsed] = useState(true);

    const spoilerButtonColor =
        buttonTextColor === 'bright'
            ? styles.container__spoilerButton_colorBright
            : styles.container__spoilerButton_colorFaded;

    const textDisplayClass = isCollapsed ? styles.container__text_isHidden : styles.container__text_isShown;

    return (
        <>
            <div className={styles.container} role="spoiler-wrapper">
                <div
                    id="text-wrapper"
                    data-testid="clipped-text"
                    className={[styles.container__text, textDisplayClass].join(' ')}
                >
                    <div className={[styles.container__textInner, 'clamped'].join(' ')}>{children}</div>
                    <span
                        className={[styles.container__spoilerButton, spoilerButtonColor].join(' ')}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? toggleButtonTexts[0] : toggleButtonTexts[1]}
                    </span>
                </div>
            </div>
            <style jsx>
                {`
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
