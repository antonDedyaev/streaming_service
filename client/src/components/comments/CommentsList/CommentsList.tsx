import IComment from '@/models/IComment';
import styles from './CommentsList.module.scss';
import CommentItem from '../CommentItem/CommentItem';

interface CommentsListProps {
    comments: IComment[]
}

const CommentsList = ({ comments }: CommentsListProps) => {
    return (
        <div className={styles.container}>
            {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
        </div>
    )
}

export default CommentsList;