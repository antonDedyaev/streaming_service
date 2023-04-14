import { useEffect, useState } from "react"
import styles from './MoviesSlider.module.scss'
import { useWindowSize } from "@/hooks/useWindowResize/useWindowSize"
import ArrowButton from "../../UI/ArrowButton/ArrowButtonUI"
import { useMoviesCount } from "@/hooks/useMoviesCount/useMoviesCount"

interface MoviesSliderProps {
    list: {
        id: number
    }[]
}

function MoviesSlider({ list }: MoviesSliderProps) {
    const windowWidth = useWindowSize()
    const [position, setPosition] = useState<number>(0)
    const moviesCount = useMoviesCount(windowWidth)

    const minPosition = 0
    const maxPosition = -100 / moviesCount * list.length + 100

    const leftHandler = () => {
        const newPosition = position + (100 / moviesCount * (moviesCount - 1))

        if (newPosition > minPosition) {
            setPosition(minPosition)
        } else {
            setPosition(newPosition)
        }
    }

    const rightHandler = () => {
        const newPosition = position - (100 / moviesCount * (moviesCount - 1))

        if (newPosition < maxPosition) {
            setPosition(maxPosition)
        } else {
            setPosition(newPosition)
        }
    }

    useEffect(() => {
        setPosition(minPosition)
    }, [moviesCount])

    return (
        <div className="container">
            <div className={styles.container}>
                {position < minPosition &&
                    <ArrowButton 
                        className={[styles.container__button, styles.container__button_left].join(' ')}
                        diarection="left"
                        iconSize="large"
                        onClick={leftHandler}
                    />
                }

                <div className={[styles.container__contentContainer].join(' ')}>
                    <div className={[styles.container__content, 'content'].join(' ')}>
                        {list.map(item => (
                            <div key={item.id} className={styles.container__item}>{item.id}</div>
                        ))}
                    </div>
                </div>

                {position > maxPosition &&
                    <ArrowButton 
                        className={[styles.container__button, styles.container__button_right].join(' ')}
                        diarection="right"
                        iconSize="large"
                        onClick={rightHandler}
                    />
                }
            </div>

            <style jsx>
                {`
                    .content {
                        left: calc(0% + ${position}%);
                    }
                `}
            </style>
        </div>
    )
}

export default MoviesSlider