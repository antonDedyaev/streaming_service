import Image from 'next/image';
import ButtonUI from '../UI/buttons/Button/ButtonUI';
import styles from './FilterPanel.module.scss';
import closeIcon from '../../../public/icons/close.svg';
import { ReactNode, useState } from 'react';
import { UseTranslation, useTranslation } from 'next-i18next';
interface IPanel {
    children: ReactNode;
}

const FilterPanel = ({ children }: IPanel) => {
    const { t } = useTranslation('moviesPage');
    const [isFilterSelected, setIsFilterSelected] = useState(false);

    return (
        <section className={styles.container}>
            <div className={styles.container__body}>
                <div className={styles.container__content}>
                    <div className={styles.container__filterList}>{children}</div>
                    <div className={styles.container__buttonContainer}>
                        <ButtonUI
                            className={[
                                styles.container__resetButton,
                                !isFilterSelected ? styles.container__resetButton_disabled : null,
                            ].join(' ')}
                            background="transparent"
                            onClick={() => setIsFilterSelected(false)}
                        >
                            <Image src={closeIcon} height={16} width={16} alt="Иконка-крестик" />
                            {t('filterPanel.removeFilters')}
                        </ButtonUI>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterPanel;
