import styles from './SocialLinkUI.module.scss'

interface SocialLinkUIProps {
    href: string;
    logo: string;
}

function SocialLinkUI({ href, logo }: SocialLinkUIProps) {
    return (
        <a href={href} target='blank' role='link-to-media'>
            <div className={styles['social-link']}>
                <img className={styles['social-logo']} src={logo} alt="Social media logo" />
            </div>
        </a>
    )
}

export default SocialLinkUI;