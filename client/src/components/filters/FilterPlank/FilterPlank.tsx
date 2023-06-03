import { useAppSelector } from '../../../store/hooks/redux';
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
    const [subTitle, setSubTitle] = useState('');

    const filters = useAppSelector((state) => state.movies.filters);

    useEffect(() => {
        switch (title) {
            case 'Жанры':
                setSubTitle(filters.genres.join(', '));
                break;
            case 'Страны':
                setSubTitle(filters.countries.join(', '));
                break;
            case 'Рейтинг':
                filters.ratingKp > 0 ? setSubTitle(`Больше ${filters.ratingKp}`) : setSubTitle('');
                break;
            case 'Оценки':
                filters.votesKp > 0 ? setSubTitle(`Больше ${filters.votesKp}`) : setSubTitle('');
                break;
            case 'Режиссер':
                setSubTitle(filters.director);
                break;
            case 'Актер':
                setSubTitle(filters.actor);
                break;
        }
    }, [filters]);

    const domNode = useClickOutside(() => setIsDropdownShown(false));

    return (
        <div className={styles.container} data-testid={'filterPlank'}>
            <div
                className={[styles.container__plank, isDropdownShown ? styles.container__plank_isActive : null].join(
                    ' ',
                )}
                onClick={() => setIsDropdownShown(!isDropdownShown)}
            >
                <div className={styles.container__plankContent}>
                    <div className={styles.container__textWrapper}>
                        <div className={styles.container__title}>{title}</div>
                        {subTitle !== '' && <div className={styles.container__subTitle}>{subTitle}</div>}
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
