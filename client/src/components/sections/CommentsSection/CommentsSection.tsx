import CommentsList from '@/components/comments/CommentsList/CommentsList';
import { comments } from '@/components/comments/commentsTestData';
import styles from './CommentsSection.module.scss';

const CommentsSection = () => {
    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <h2 className={styles.section__title}>Отзывы</h2>
            </div>

            <div className={styles.section__content}>
                <CommentsList comments={comments} />
            </div>
        </div>
    )
}

export default CommentsSection;