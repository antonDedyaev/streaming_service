import IComment from '@/models/IComment';
import styles from './CommentItem.module.scss';
import VoteWidget from '../VoteWidget/VoteWidget';
import { useTranslation } from 'next-i18next';
import TransparentButton from '../../UI//buttons/TransparentButton/TransparentButton';
import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import { formatDate } from '../../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { addChildComment } from '../../../store/ActionCreators';
import { useRouter } from 'next/router';

interface CommentItemProps {
    comment: IComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
    const { t } = useTranslation('movie');
    const { asPath } = useRouter();
    const dispatch = useAppDispatch();

    const [formShown, setFormShown] = useState<boolean>(false);
    const currentUser = useAppSelector((state) => state.user.user);
    const movieid = asPath.replace(/\D/g, '');

    const handleClick = () => {
        setFormShown(!formShown);
    };

    const handleReply = (value: string) => {
        if (currentUser.user && value != '') {
            dispatch(
                addChildComment({
                    text: value,
                    movieid: +movieid,
                    parentId: comment.id,
                    user: currentUser.user,
                }),
            );
        }

        setFormShown(false);
    };

    return (
        <div className={styles.container} data-testid={'commentItem'}>
            <div className={styles.container__header}>
                <div className={styles.container__info}>
                    <p className={styles.container__username}>{comment.user}</p>
                    <time className={styles.container__date} dateTime={comment.date}>
                        {formatDate(comment.date)}
                    </time>
                </div>
                <VoteWidget />
            </div>

            <div className={styles.container__content}>
                <div className={styles.container__text}>{comment.text}</div>
            </div>

            {comment.childComment && (
                <div className={styles.container__actions}>
                    <TransparentButton className={styles.container__button} textColor="faded" onClick={handleClick}>
                        {t('comments.reply')}
                    </TransparentButton>
                </div>
            )}

            {formShown && <CommentForm onSubmit={handleReply} />}
        </div>
    );
};

export default CommentItem;
