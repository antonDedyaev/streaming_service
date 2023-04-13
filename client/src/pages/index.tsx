import ButtonUI from "@/components/UI/Button/ButtonUI"
import styles from '@/styles/pages/HomePage.module.scss'
import searchIcon from '@/../public/icons/search.svg'

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
        </>
    )
}

export default HomePage