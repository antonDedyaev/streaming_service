import Link from 'next/link';
import styles from './ActorItem.module.scss';
import Image from 'next/image';
import { IActor } from "../ActorList/Temp/IActor";

interface ActorItemProps {
	className: string
	href: string;
	actor: IActor;
	role?: boolean;
	effect?: boolean;
	amt?: boolean;
	size: 'Large' | 'Medium' | 'Small';
}

const ActorItem = ({ className, href, actor, amt, role, effect, size }: ActorItemProps) => {
	let width = 153;
	let height = 183;
	if (size === 'Small') {
		width = 153 / 1.7;
		height = 183 / 1.7;
	} else if (size === 'Medium') {
		width = 128;
		height = 153;
	}

	return (
		<Link href={href} className={[styles.container, className].join(' ')}>
			<div className={[styles.imageSection, styles[`imageSection${size}`], effect && styles['imageSectionEffect']].join(' ')}>
				<div className={styles.imageActorWrapper}>
					<Image className={styles.image} src={actor.img} alt={`${actor.firstName} ${actor.lastName}`} width={width} height={height} />
				</div>
				{effect &&
					<div className={styles.amountBadge}>
						<div className={styles.backBox}></div>
						<div className={styles.text}>{actor.amtMovies}</div>
					</div>}
			</div>
			<div className={styles.textSection}>
				<div className={[styles.titleSection, styles[`titleSection${size}`]].join(' ')}>{actor.firstName}</div>
				<div className={[styles.titleSection, styles[`titleSection${size}`]].join(' ')}>{actor.lastName}</div>
				{role && <div className={styles.extra}>{actor.role}</div>}
				{amt && <div className={styles.extra}>{actor.amtMovies} фильма</div>}
			</div>
		</Link>
	)
}

export default ActorItem;