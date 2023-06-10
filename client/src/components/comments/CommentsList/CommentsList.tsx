import IComment from '@/models/IComment';
import styles from './CommentsList.module.scss';
import CommentItem from '../CommentItem/CommentItem';

interface CommentsListProps {
    comments: IComment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
    return (
        <div className={styles.container} data-testid={'commentsList'}>
            {comments.map((comment) => {
                return (
                    <>
                        <CommentItem key={comment.id} comment={comment} />
                        <div className={styles.container__childcomments}>
                            {comment.childComment?.map((child) => (
                                <CommentItem key={child.id} comment={child} />
                            ))}
                        </div>
                    </>
                );
            })}
        </div>
    );
};

export default CommentsList;
