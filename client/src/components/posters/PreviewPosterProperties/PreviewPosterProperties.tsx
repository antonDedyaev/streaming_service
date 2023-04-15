import Image from "next/image";
import bookmark from '../../../../public/icons/icons8_bookmark.png';
import wand from '../../../../public/icons/icons8_wand.png';
import star from '../../../../public/icons/icons8_star.png';
import circle from '../../../../public/icons/icons8_circle.png';
import style from './PreviewPosterProperties.module.scss';

function PreviewPosterProperties() {
    return (
        <div className={style.properties}>
            <div className={style.properties__icons}>
                <Image className={style.icon_favorite} src={bookmark} alt="icon" />
                <Image className={style.icon_similar} src={wand} alt="icon" />
                <Image className={style.icon_rate} src={star} alt="icon" />
                <Image className={style.icon_dislike} src={circle} alt="icon" />
            </div>
            <div className={style.properties__info}>
                <div className={style.rating__row}>
                    <div className={style.rating__value}>
                        <span className={style.rating__value_integer}>9</span>
                        <span className={style.rating__value_fraction}>,1</span>
                    </div>
                    <div className="rating__graph">бар 5шт</div>
                </div>
                <div className={style.rating__column}>
                    <div className="rating__name">высокий рейтинг:</div>
                    <div className="rating__graph">прогресс-бар</div>
                </div>
                <div className={style.properties__text}>
                    <p>год, страна, жанр</p>
                    <p>продолжительность</p>
                </div>
            </div>
        </div>
    )
}

export default PreviewPosterProperties;