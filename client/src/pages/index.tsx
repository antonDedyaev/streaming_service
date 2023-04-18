import MoviesSlider from "@/components/sliders/MoviesSlider/MoviesSlider"
import styles from '@/styles/pages/HomePage.module.scss'
import { actors } from "@/components/actor/ActorList/Temp/Actors.data"
import Navbar from "@/components/menu/Navbar/Navbar"

function HomePage() {

	const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

	return (
		<>
			<Navbar/>

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