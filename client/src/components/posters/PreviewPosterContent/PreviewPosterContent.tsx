import Image from "next/image";
import bookmark from '../../../../public/icons/icons8_bookmark.png';
import wand from '../../../../public/icons/icons8_wand.png';
import star from '../../../../public/icons/icons8_star.png';
import circle from '../../../../public/icons/icons8_circle.png';
import style from './PreviewPosterContent.module.scss';

function PreviewPosterContent() {
    return (
        <div className={style.content}>
            <div className={style.content__icons}>
                <Image className={style.icon_favorite} src={bookmark} alt="icon" />
                <Image className={style.icon_similar} src={wand} alt="icon" />
                <Image className={style.icon_rate} src={star} alt="icon" />
                <Image className={style.icon_dislike} src={circle} alt="icon" />
            </div>
            <div className={style.content__info}>
                <div className={style.rating}>
                    <span className={style.rating_integer}>9</span>
                    <span className={style.rating_fraction}>,1</span>
                </div>
                <div className={style.content__text}>
                    <p>год, страна, жанр</p>
                    <p>продолжительность</p>
                </div>
            </div>
        </div>
    )
}

export default PreviewPosterContent;