import styles from './MovieMedallionItem.module.scss';

interface MovieMedallionItemProps {
    children: React.ReactNode;
    text: string;
    disabled?: boolean;
}

const MovieMedallionItem = ({ children, text, disabled = false }: MovieMedallionItemProps) => {
    return (
        <div
            className={[styles.medallion, disabled ? styles.medallion_inactive : ''].join(' ').trim()}
            role="div-MedallionItem"
        >
            <div className={styles.medallion__content}>
                <div className={styles.medallion__contentBlock}>{children}</div>
            </div>
            <div className={styles.medallion__caption}>{text}</div>
        </div>
    );
};

export default MovieMedallionItem;
