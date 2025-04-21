import { Category, CategoryEnum } from "@/types";
import historyImg from "@/assets/images/history.jpg";
import geographyImg from "@/assets/images/geography.jpg";
import generalImg from "@/assets/images/general.webp";
import mediaImg from "@/assets/images/media.jpg";
import scienceImg from "@/assets/images/science.webp";
import sportImg from "@/assets/images/sport.jpg";
import placehodlerImg from "@/assets/images/placeholderQuiz.webp";

function getCategoryImage(category: Category): string {
    let path: string = "";

    switch (category.name.toLowerCase()) {
        case CategoryEnum.HISTORY.toLowerCase():
            path = historyImg;
            break;
        case CategoryEnum.GEOGRAPHY.toLowerCase():
            path = geographyImg;
            break;
        case CategoryEnum.GENERAL.toLowerCase():
            path = generalImg;
            break;
        case CategoryEnum.MEDIA.toLowerCase():
            path = mediaImg;
            break;
        case CategoryEnum.SCIENCE.toLowerCase():
            path = scienceImg;
            break;
        case CategoryEnum.SPORT.toLowerCase():
            path = sportImg;
            break;
        default:
            path = placehodlerImg;
            break;
    }

    return path;
}

export { getCategoryImage };
