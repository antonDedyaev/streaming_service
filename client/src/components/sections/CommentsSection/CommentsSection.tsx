import CommentsList from '@/components/comments/CommentsList/CommentsList';
import styles from './CommentsSection.module.scss';
import IComment from '@/models/IComment';
import CommentForm from '@/components/comments/CommentForm/CommentForm';
import { useTranslation } from 'next-i18next';

interface CommentsSectionProps {
    comments: IComment[]
}

const CommentsSection = ({ comments }: CommentsSectionProps) => {
    const { t } = useTranslation('movie');

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <h2 className={styles.section__title}>{t('comments.comments')}</h2>
                <CommentForm />
            </div>

            <div className={styles.section__content}>
                <CommentsList comments={comments} />
            </div>
        </div>
    )
}

export default CommentsSection;