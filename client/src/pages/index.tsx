import MoviesSlider from '@/components/sliders/MoviesSlider/MoviesSlider';
import ButtonUI from '@/components/UI/Button/ButtonUI';
import PreviewPoster from '@/components/posters/PreviewPoster/PreviewPoster';
import styles from '@/styles/pages/HomePage.module.scss';
import SocialLinkUI from '@/components/UI/Link/SocialLinkUI';
import AppStoreLinkUI from '@/components/UI/Link/AppStoreLinkUI';
import ExpandedListUI from '@/components/UI/ExpandedList/ExpandedListUI';
import TextBadge from '@/components/UI/badges/TextBadge';
import PriceBadge from '@/components/UI/badges/PriceBadge';
import AgeBadge from '@/components/UI/badges/AgeBadge';
import ArrowButton from '@/components/UI/ArrowButton/ArrowButtonUI';

import { actors } from '@/components/actor/ActorList/Temp/Actors.data';
import ActorList from '@/components/actor/ActorList/ActorList';
import Link from 'next/link';
import SimpleLinkUI from '@/components/UI/SimpleLink/SimpleLinkUI';
import SquareCard from '@/components/SquareCard/SquareCard';

function HomePage() {
  return (
    <>
      <ButtonUI className="button" variant="large" background="lightRed">
        <div>Красная кнопка</div>
      </ButtonUI>
      <ButtonUI className="button" variant="medium" background="gray">
        <div>Серая кнопка</div>
      </ButtonUI>
      <PreviewPoster />

      <SquareCard href="/" src="/img/actorTest1.jpg" />
      <SquareCard disabled={true} mainValue="9,6" />

      <MoviesSlider
        list={
          actors /*[
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
          { id: 10 },
          { id: 11 },
          { id: 12 },
          { id: 13 },
          { id: 14 },
        ]*/
        }
      />
    </>
  );
}

export default HomePage;

/*<ActorList actors={actors} effect={true} amt={true} size="large" />
      <ActorList actors={actors} amt={true} size="medium" />
      <ActorList actors={actors} role={true} size="small" />*/
