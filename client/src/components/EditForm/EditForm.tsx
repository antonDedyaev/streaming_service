import Image from 'next/image';
import styles from './EditForm.module.scss';
import { useEffect, useState } from 'react';
import editBtn from '../../../public/icons/edit.svg';
import confirmBtn from '../../../public/icons/confirm.svg';
import deleteBtn from '../../../public/icons/waste_bin.svg';
import BorderedButton from '../UI/buttons/BorderedButton/BorderedButton';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface IEditableItem {
    id: number;
    name: string;
    enName: string;
}

interface IEditFormProps {
    item: IEditableItem;
    deletable: boolean;
}

const EditForm = ({ item, deletable }: IEditFormProps) => {
    const { t } = useTranslation('adminPage');
    const [isFieldActive, setIsFieldActive] = useState(false);
    const [isItemDeleted, setIsItemDeleted] = useState(false);

    const [inputValueRus, setInputValueRus] = useState(item.name || '');
    const [inputValueEn, setInputValueEn] = useState(item.enName || '');

    useEffect(() => {
        setInputValueRus(item.name || '');
        setInputValueEn(item.enName || '');
    }, [item]);

    const { asPath } = useRouter();
    const route = asPath.split('/').slice(-1)[0];
    const endpoint = route === 'genres' ? 'namesofgenre' : 'film';

    const handleDeleteItem = async () => {
        try {
            await axios.delete(`http://localhost:6125/film/${item.id}`);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        setIsItemDeleted(true);
    };

    const handleSaveResult = async () => {
        try {
            await axios.patch(`http://localhost:6125/${endpoint}`, {
                id: item.id,
                name: inputValueRus,
                enName: inputValueEn,
            });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        setIsFieldActive(false);
    };
    return (
        <div
            className={[styles.container, isItemDeleted ? styles.container_hidden : styles.container_visible].join(' ')}
        >
            <div className={styles.container__form}>
                {deletable && (
                    <button className={styles.container__deleteButton} onClick={handleDeleteItem}>
                        <Image src={deleteBtn} width={20} height={20} alt="Кнопка удаления" />
                    </button>
                )}
                <div className={[styles.container__field, styles.container__field_first].join(' ')}>
                    <label htmlFor="id">ID</label>
                    <input type="text" id="id" value={item.id} disabled />
                </div>
                <div className={styles.container__field}>
                    <label htmlFor="name-rus">{t('editing.ruName')}</label>
                    <input
                        type="text"
                        id="name-rus"
                        value={inputValueRus}
                        disabled={!isFieldActive}
                        onChange={(e) => setInputValueRus(e.target.value)}
                    />
                </div>
                <div className={styles.container__field}>
                    <label htmlFor="name-en">{t('editing.enName')}</label>
                    <input
                        type="text"
                        id="name-en"
                        value={inputValueEn}
                        disabled={!isFieldActive}
                        onChange={(e) => setInputValueEn(e.target.value)}
                    />
                </div>
                <button className={styles.container__editButton} onClick={() => setIsFieldActive(!isFieldActive)}>
                    <Image
                        src={isFieldActive ? confirmBtn : editBtn}
                        width={20}
                        height={20}
                        alt="Кнопка редактирования и удаления"
                    />
                </button>
                <BorderedButton size="small" className={styles.container__saveButton} onClick={handleSaveResult}>
                    {t('editing.saveButton')}
                </BorderedButton>
            </div>
        </div>
    );
};
export default EditForm;
