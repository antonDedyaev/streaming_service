import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';
import { useTranslation } from 'next-i18next';

const Breadcrumbs = ({ path }: { path: string[] }) => {
    const { t } = useTranslation('collection');

    const localizedPaths = path.map((item) => {
        const splitItem = item.split('-');
        const joinedItem =
            splitItem.length > 1 ? splitItem[0] + splitItem[1][0].toUpperCase() + splitItem[1].slice(1) : splitItem;
        return t(`${joinedItem}`);
    });
    return (
        <div className={styles.container}>
            <ul className={styles.container__crumbsList}>
                <Link href={'/'} className={styles.container__crumb}>
                    {t('myIvi')}
                </Link>
                {localizedPaths.map((item, index) => {
                    const last = index === path.length - 1;
                    const ref = path.slice(0, index).join('/');
                    if (!last) {
                        return (
                            <li key={index}>
                                <Link href={`/${ref}`} className={styles.container__crumb}>
                                    {item}
                                </Link>
                            </li>
                        );
                    } else {
                        return <li key={index}>{item}</li>;
                    }
                })}
            </ul>
        </div>
    );
};
export default Breadcrumbs;
