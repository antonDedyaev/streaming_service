import styles from './Breadcrumbs.module.scss';
import { useTranslation } from 'next-i18next';
import IGenre from '@/models/IGenre';
import { firstCapitalLetter } from '@/utils/functions';
import TextLinkUI from '../UI/links/TextLink/TextLinkUI';
import { useRouter } from 'next/router';

interface BreadcrumbsProps {
    path: string[];
    genre?: IGenre;
    ponytailName?: { name: string; enName: string };
    type?: 'slash' | 'point' | 'pointShort';
}

const Breadcrumbs = ({ path, genre, ponytailName, type = 'slash' }: BreadcrumbsProps) => {
    const { t } = useTranslation('collection');
    const { locale } = useRouter();

    const localizedPaths = path.map((item) => {
        const splitItem = item.split('-');
        const joinedItem =
            splitItem.length > 1 ? splitItem[0] + splitItem[1][0].toUpperCase() + splitItem[1].slice(1) : splitItem;
        return t(`${joinedItem}`);
    });
    return (
        <div className={styles.container}>
            <ul className={[styles.container__crumbsList, styles[`container__crumbsList_${type}`]].join(' ')}>
                {type !== 'pointShort' && (
                    <TextLinkUI
                        option="bright"
                        href={'/'}
                        className={type === 'slash' ? styles.container__crumb : styles.container__crumb2}
                    >
                        {t('myIvi')}
                    </TextLinkUI>
                )}
                {localizedPaths.map((item, index) => {
                    const last = index === path.length - 1;
                    const ref = path.slice(0, index).join('/');
                    if (!last) {
                        if (item !== 'persons') {
                            return (
                                <li key={index}>
                                    <TextLinkUI
                                        option="bright"
                                        href={`/${ref}`}
                                        className={
                                            type === 'slash' ? styles.container__crumb : styles.container__crumb2
                                        }
                                    >
                                        {item}
                                    </TextLinkUI>
                                </li>
                            );
                        }
                    } else {
                        if (genre && ponytailName) {
                            return (
                                <>
                                    <li key={genre.id}>
                                        <TextLinkUI
                                            option="bright"
                                            href={`/collections/${genre.enName}`}
                                            className={type === 'slash' ? styles.container__crumb : ''}
                                        >
                                            {firstCapitalLetter(locale === 'ru' ? genre.name : genre.enName)}
                                        </TextLinkUI>
                                    </li>
                                    {type !== 'pointShort' && (
                                        <li key={index}>{locale === 'ru' ? ponytailName.name : ponytailName.enName}</li>
                                    )}
                                </>
                            );
                        }
                        if (ponytailName) {
                            return (
                                type !== 'pointShort' && (
                                    <li key={index}>{locale === 'ru' ? ponytailName.name : ponytailName.enName}</li>
                                )
                            );
                        }
                        return <li key={index}>{item}</li>;
                    }
                })}
            </ul>
        </div>
    );
};
export default Breadcrumbs;
