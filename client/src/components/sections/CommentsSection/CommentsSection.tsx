import CommentsList from '@/components/comments/CommentsList/CommentsList';
import styles from './CommentsSection.module.scss';
import IComment from '@/models/IComment';
import CommentForm from '@/components/comments/CommentForm/CommentForm';
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useRouter } from 'next/router';
import { addNewComment, setComments } from '@/store/ActionCreators';
import { useEffect, useState } from 'react';

interface CommentsSectionProps {
    comments: IComment[];
}

const CommentsSection = ({ comments }: CommentsSectionProps) => {
    const { t } = useTranslation('movie');
    const { asPath } = useRouter();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.user.user);
    const movieid = asPath.replace(/\D/g, '');

    useEffect(() => {
        dispatch(setComments(comments));
    }, []);

    const handleAdd = (value: string) => {
        if (currentUser.user && value != '') {
            dispatch(addNewComment({ text: value, movieid: +movieid, user: currentUser.user }));
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.section__header}>
                <h2 className={styles.section__title}>{t('comments.comments')}</h2>
                <CommentForm onSubmit={handleAdd} />
            </div>

            <div className={styles.section__content}>
                <CommentsList comments={comments} />
            </div>
        </div>
    );
};

export default CommentsSection;
