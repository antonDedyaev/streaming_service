import { useTranslation } from 'next-i18next';
import { useAppSelector } from '../../../store/hooks/redux';
import styles from './FilterPlank.module.scss';
import { ReactNode, useState, useEffect, useRef } from 'react';

interface IPlank {
    title: string;
    className?: string;
    children: ReactNode;
}

const FilterPlank = ({ title, className, children }: IPlank) => {
    const { t } = useTranslation('moviesPage');
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const [subTitle, setSubTitle] = useState('');

    const domNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkClickedTarget = (e: MouseEvent) => {
            const target = e.target as HTMLDivElement;
            if (target.closest(`.${styles.container__plank_isActive}`)) {
                return;
            }
            if (!domNode.current!.contains(target)) {
                setIsDropdownShown(false);
            }
        };
        document.addEventListener('mousedown', checkClickedTarget);

        return () => document.removeEventListener('mousedown', checkClickedTarget);
    });

    const filters = useAppSelector((state) => state.movies.filters);
    console.log('genres', filters.genres);

    useEffect(() => {
        switch (title) {
            case t('filterPanel.genres'):
                setSubTitle(filters.genres.join(', '));
                break;
            case t('filterPanel.countries'):
                setSubTitle(filters.countries.join(', '));
                break;
            case t('filterPanel.rating'):
                filters.ratingKp > 0 ? setSubTitle(`${t('filterPanel.over')} ${filters.ratingKp}`) : setSubTitle('');
                break;
            case t('filterPanel.userRank'):
                filters.votesKp > 0 ? setSubTitle(`${t('filterPanel.over')} ${filters.votesKp}`) : setSubTitle('');
                break;
            case t('filterPanel.director'):
                setSubTitle(filters.director);
                break;
            case t('filterPanel.actor'):
                setSubTitle(filters.actor);
                break;
        }
    }, [filters]);

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
