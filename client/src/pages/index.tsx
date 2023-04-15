import ButtonUI from "@/components/UI/Button/ButtonUI"

import styles from '@/styles/pages/HomePage.module.scss'

import ActorList from "@/components/actor/ActorList/ActorList";
import { actors } from "@/components/actor/ActorList/Temp/Actors.data";

function HomePage() {

	return (
		<>
			<ButtonUI
				className="button"
				variant="large"
				background="lightRed">
				<div>Красная кнопка</div>
			</ButtonUI>
			<ButtonUI
				className="button"
				variant="medium"
				background="gray">
				<div>Серая кнопка</div>
			</ButtonUI>


			<ActorList actors={actors} effect={true} amt={true} size='Large' />
			<ActorList actors={actors} amt={true} size='Medium' />
			<ActorList actors={actors} role={true} size='Small' />
		</>
	)
}

export default HomePage