import IComment from '@/models/IComment';
import styles from './CommentsList.module.scss';
import CommentItem from '../CommentItem/CommentItem';

interface CommentsListProps {
    comments: IComment[];
    handleReply: (value: string) => void;
}

const CommentsList = ({ comments, handleReply }: CommentsListProps) => {
    return (
        <div className={styles.container}>
            {comments.map((comment) => {
                return (
                    <>
                        <CommentItem key={comment.id} comment={comment} handleReply={handleReply} />
                        <div className={styles.container__childcomments}>
                            {
                                comment.childComment?.map(child => 
                                    <CommentItem key={child.id} comment={child} handleReply={handleReply} />)
                            }
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default CommentsList;