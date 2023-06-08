import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/pages/GooglePage.module.scss';

const GooglePage = () => {
    const { data: session } = useSession();
    console.log(session);

    if (session) {
        return (
            <div className={styles.container}>
                <p>Welcome, {session.user?.name}</p>

                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                <p>You are not authorized!</p>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        );
    }
};

export default GooglePage;
