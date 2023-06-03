import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './TrailerModal.module.scss';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

interface TrailerModalProps {
    trailer: string;
}

const TrailerModal = ({ trailer }: TrailerModalProps) => {
    const { locale } = useRouter();
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
    return (
        <ModalUI className={styles.modal}>
            <div className={styles.container} data-testid={'trailerModal'}>
                {trailer ? (
                    <ReactPlayer className={styles.player} width="80%" height="80%" url={trailer} controls={true} />
                ) : (
                    <h2>{locale === 'ru' ? 'Трейлер еще не добавлен' : 'Trailer not yet added'}</h2>
                )}
            </div>
        </ModalUI>
    );
};

export default TrailerModal;
