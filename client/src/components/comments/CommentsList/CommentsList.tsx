import IComment from '@/models/IComment';
import styles from './CommentsList.module.scss';
import CommentItem from '../CommentItem/CommentItem';

interface CommentsListProps {
    comments: IComment[]
}

const CommentsList = ({ comments }: CommentsListProps) => {
    return (
        <div className={styles.container}>
            {comments.map((comment) => {
                return (
                    <>
                        <CommentItem key={comment.id} comment={comment} hasChildren={true} />
                        <div className={styles.container__childcomments}>
                            {
                                comment.childComment?.map(child => 
                                    <CommentItem key={child.id} comment={child} hasChildren={false} />)
                            }
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default CommentsList;