import ActorItem from '../ActorItem/ActorItem';
import { IActor } from './Temp/IActor';

interface ActorListProps {
    actors: IActor[];
    role?: boolean;
    effect?: boolean;
    amt?: boolean;
    size?: 'large' | 'medium' | 'small';
    className?: string;
}

const ActorList = ({ actors, amt = true, role, effect = true, size = 'large', className }: ActorListProps) => {
    return (
        <>
            {actors.map((actor) => (
                <ActorItem
                    key={actor.id}
                    className={className}
                    href="/"
                    actor={actor}
                    amt={amt}
                    effect={effect}
                    role={role}
                    size={size}
                />
            ))}
        </>
    );
};

export default ActorList;
