import { ReactNode } from 'react'
import styles from './ExpandedListUI.module.scss'
import Link from 'next/link';

interface ExpandedListUIProps {
    children: ReactNode;
    toggleButtonTexts: string[];
    clipSize?: number;
    clipFormat?: string;
}

function ExpandedListUI({ children, toggleButtonTexts, clipSize = 2, clipFormat = 'vertical' }: ExpandedListUIProps) {

    function handleShowText({ currentTarget }: React.MouseEvent<HTMLSpanElement>) {
        const text = document.getElementById('text-wrapper');
        if (text && text.classList.contains(styles['is-truncated'])) {
            text.classList.remove(styles['is-truncated']);
            currentTarget.innerHTML = toggleButtonTexts[1];
        } else {
            text?.classList.add(styles['is-truncated']);
            currentTarget.innerHTML = toggleButtonTexts[0];
        }
    }

    return (
        <>
            <div className={styles.clause} role='expanded-wrapper'>
                <div
                    id='text-wrapper'
                    data-testid='clipped-text'
                    className={[styles['clause-text'], styles['is-truncated']].join(' ')}
                >
                    <div className={[styles['clause-text-inner'], styles['hidden-children'], 'clause-clamped'].join(' ') }>
                        {children}
                    </div>
                    <span
                        className={styles['clause-toggle']}
                        onClick={handleShowText}>
                        {toggleButtonTexts[0]}
                    </span>
                </div>
            </div>
            <style jsx>
                {`
                    .clause-clamped {
                        -webkit-line-clamp: ${clipSize};
                        -webkit-box-orient: ${clipFormat};
                    }
                `}
            </style>
        </>
    )
}

export default ExpandedListUI;