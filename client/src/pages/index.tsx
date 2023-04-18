import MoviesSlider from "@/components/sliders/MoviesSlider/MoviesSlider"
import styles from '@/styles/pages/HomePage.module.scss'
import { actors } from "@/components/actor/ActorList/Temp/Actors.data"
import RatingPoster from "@/components/posters/RatingPoster/RatingPoster"

function HomePage() {

	const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

	return (
		<>
			<RatingPoster className={styles.container__item} />
			<MoviesSlider
				actors={actors}
			/>

			<MoviesSlider
				movies={movies}
			/>
		</>
	)
}

export default HomePage