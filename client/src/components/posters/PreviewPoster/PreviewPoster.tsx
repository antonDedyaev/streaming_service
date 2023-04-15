import AgeBadge from "@/components/UI/badges/AgeBadge";
import PriceBadge from "@/components/UI/badges/PriceBadge";
import PreviewPosterProperties from "../PreviewPosterProperties/PreviewPosterProperties";
import Image from "next/image";
import Link from "next/link";
import style from './PreviewPoster.module.scss';

function PreviewPoster() {
    return (
        <div className={style.previewPoster}>
            <Link href="/">
                <div className={style.block_image}>
                    <div className={style.imageWrapper}>
                        <Image
                            className={style.previewPoster__image} 
                            src="" 
                            alt="" />
                    </div>
                    <PreviewPosterProperties />
                    <AgeBadge value="18" />
                </div>

                <div className={style.block_text}>
                    <p className={style.previewPoster__title}>Название фильма</p>
                    <PriceBadge priceType="purchase" />
                </div>
            </Link>
        </div>
    )
}

export default PreviewPoster;