import CommentsList from '@/components/comments/CommentsList/CommentsList';
import styles from './CommentsSection.module.scss';
import IComment from '@/models/IComment';
import CommentForm from '@/components/comments/CommentForm/CommentForm';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';
import { addChildComment, addNewComment, setComments } from '@/store/ActionCreators';
import { useEffect, useState } from 'react';

interface CommentsSectionProps {
    comments: IComment[]
}

const CommentsSection = ({ comments }: CommentsSectionProps) => {
    const { t } = useTranslation('movie');
    const { asPath } = useRouter();

    const [tooltipShown, setTooltipShown] = useState(false);

    const currentUser = useAppSelector((state) => state.user.user);
    const movieid = asPath.replace(/\D/g,'');

    useEffect(() => {
        setComments(comments);
    }, []);

    const handleAdd = (value: string) => {
        if (currentUser.user) {
            addNewComment({text: value, movieid: +movieid});
        } else {
            console.log('авторизуйтесь, чтобы оставить комментарий');
        }
    }

    const handleReply = (value: string) => {
        if (currentUser.user) {
            // addChildComment({text: value, movieid: +movieid, parentId: ''});
        } else {
            console.log('авторизуйтесь, чтобы оставить комментарий');
        }
    }

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <h2 className={styles.section__title}>{t('comments.comments')}</h2>
                <CommentForm onSubmit={handleAdd} />
            </div>

            <div className={styles.section__content}>
                <CommentsList comments={comments} handleReply={handleReply} />
            </div>
        </div>
    )
}

export default CommentsSection;