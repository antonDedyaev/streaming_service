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
        </>
    )
}

export default HomePage