import styles from './AppStoreLinkUI.module.scss'

interface AppStoreUIProps {
    href: string;
    logo: string;
    linkTexts: string[];
}

function AppStoreLinkUI({ href, logo, linkTexts }: AppStoreUIProps) {
    return (
        <a href={href} className={styles['appstore-link-wrapper']} role='link-to-store'>
            <img src={logo} alt="App store logo" className={styles['appstore-link-logo']}/>
            <div className={styles['appstore-link-textblock']}>
                <div className={styles['appstore-link-preamble']}>{linkTexts[0]}</div>
                <div className={styles['appstore-link-caption']}>{linkTexts[1]}</div>
            </div>
        </a>
    )
}

export default AppStoreLinkUI;