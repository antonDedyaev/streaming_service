import styles from './FilterPlank.module.scss';
import { ReactNode, useState, useEffect, useRef } from 'react';

const useClickOutside = (handler: () => void) => {
    const domNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkClickedTarget = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            if (target.closest(`.${styles.container__plank_isActive}`)) {
                return;
            }
            if (!domNode.current!.contains(target)) {
                handler();
            }
        };
        document.addEventListener('mousedown', checkClickedTarget);

        return () => document.removeEventListener('mousedown', checkClickedTarget);
    });

    return domNode;
};

interface IPlank {
    title: string;
    className?: string;
    children: ReactNode;
}

const FilterPlank = ({ title, className, children }: IPlank) => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    const domNode = useClickOutside(() => setIsDropdownShown(false));

    return (
        <div className={styles.container}>
            <div
                className={[styles.container__plank, isDropdownShown ? styles.container__plank_isActive : null].join(
                    ' ',
                )}
                onClick={() => setIsDropdownShown(!isDropdownShown)}
            >
                <div className={styles.container__plankContent}>
                    <div className={styles.container__textWrapper}>
                        <div className={styles.container__title}>{title}</div>
                    </div>
                    <div className={styles.container__arrow}></div>
                </div>
                <div className={[styles.container__dropdown, className].join(' ')} ref={domNode}>
                    <div className={styles.container__dropdownContent} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPlank;
