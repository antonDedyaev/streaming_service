import styles from './TextSquareUI.module.scss';

interface TextSquareUIProps {
    value: number;
    textSize?: 'medium' | 'small';
}

const TextSquareUI = ({ value, textSize = 'small' }: TextSquareUIProps) => {
    return (
        <div
            className={[
                styles.value,
                textSize === 'medium' ? styles.value_medium : '',
                value > 7.5 ? styles.value_high : '',
            ]
                .join(' ')
                .trim()}
            data-testid="div-text"
        >
            {value}
        </div>
    );
};

export default TextSquareUI;
