import { useEffect } from 'react';
import ActorItem from '../ActorItem/ActorItem';
import styles from './ActorList.module.scss';

import { IActor } from "./Temp/IActor";

interface ActorListProps {
	actors: IActor[];
	role?: boolean;
	effect?: boolean;
	amt?: boolean;
	size: 'Large' | 'Medium' | 'Small';
	className: string
}

const ActorList = ({ actors, amt, role, effect, size, className }: ActorListProps) => {
	return (
		<>
			{actors.map(actor =>
				<ActorItem
					key={actor.id}
					className={[styles.actorItem, className].join(' ')}
					href="/"
					actor={actor}
					amt={amt}
					effect={effect}
					role={role}
					size={size}
				/>
			)}
		</>
	)
}

export default ActorList;