import Image from 'next/image';
import styles from './FilterPanel.module.scss';
import closeIcon from '../../../public/icons/close.svg';
import { ReactNode, useState } from 'react';
import TransparentButton from '../UI/buttons/TransparentButton/TransparentButton';

interface IPanel {
    children: ReactNode;
}

const FilterPanel = ({ children }: IPanel) => {
    const [isFilterSelected, setIsFilterSelected] = useState(false);

    return (
        <section className={styles.container}>
            <div className={styles.container__body}>
                <div className={styles.container__content}>
                    <div className={styles.container__filterList}>{children}</div>
                    <div className={styles.container__buttonContainer}>
                        <TransparentButton
                            className={[
                                styles.container__resetButton,
                                !isFilterSelected ? styles.container__resetButton_disabled : null,
                            ].join(' ')}
                            textColor='bright'
                            onClick={() => setIsFilterSelected(false)}
                        >
                            <Image src={closeIcon} height={16} width={16} alt="Иконка-крестик" />
                            Сбросить фильтры
                        </TransparentButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterPanel;
