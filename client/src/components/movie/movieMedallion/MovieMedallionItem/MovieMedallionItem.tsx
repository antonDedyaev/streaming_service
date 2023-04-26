import styles from './MovieMedallionItem.module.scss';

interface MovieMedallionItemProps {
    children: React.ReactNode;
    text: string;
    disabled?: boolean;
}

const MovieMedallionItem = ({ children, text, disabled = false }: MovieMedallionItemProps) => {
    return (
        <div
            className={[styles.container, disabled ? styles.container_inactive : ''].join(' ').trim()}
            data-testid="div-MedallionItem"
        >
            <div className={styles.container__content}>
                <div className={styles.container__contentBlock}>{children}</div>
            </div>
            <div className={styles.container__caption}>{text}</div>
        </div>
    );
};

export default MovieMedallionItem;
