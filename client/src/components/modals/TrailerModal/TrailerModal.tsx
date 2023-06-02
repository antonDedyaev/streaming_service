import ModalUI from '@/components/UI/Modal/ModalUI';
import styles from './TrailerModal.module.scss';
import dynamic from 'next/dynamic';

interface TrailerModalProps {
    trailer: string;
}

const TrailerModal = ({ trailer }: TrailerModalProps) => {
    const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
    return (
        <ModalUI className={styles.modal}>
            <div className={styles.container}>
                {trailer ? (
                    <ReactPlayer className={styles.player} width="80%" height="80%" url={trailer} controls={true} />
                ) : (
                    <h2>Трейлер еще не появился</h2>
                )}
            </div>
        </ModalUI>
    );
};

export default TrailerModal;
