import style from './TextBadge.module.scss';

interface TextBadgeProps {
    text: string;
}

const TextBadge = ({ text }: TextBadgeProps) => {
    return (
        <div className={style.badge} data-testid={'textBadge'}>
            {text}
        </div>
    );
};

export default TextBadge;
