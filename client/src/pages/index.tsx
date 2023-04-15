import MoviesSlider from "@/components/sliders/MoviesSlider/MoviesSlider"
import ButtonUI from "@/components/UI/Button/ButtonUI"
import PreviewPoster from "@/components/posters/PreviewPoster/PreviewPoster"
import styles from '@/styles/pages/HomePage.module.scss'

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
            <PreviewPoster />

            <MoviesSlider
                list={[
                    {id: 1},
                    {id: 2},
                    {id: 3},
                    {id: 4},
                    {id: 5},
                    {id: 6},
                    {id: 7},
                    {id: 8},
                    {id: 9},
                    {id: 10},
                    {id: 11},
                    {id: 12},
                    {id: 13},
                    {id: 14},
                ]}
            />
        </>
    )
}

export default HomePage