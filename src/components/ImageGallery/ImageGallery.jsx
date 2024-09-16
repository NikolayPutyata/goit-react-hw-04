import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ galleryList }) => {
  return (
    <>
      <ul className={s.galleryList}>
        {galleryList.map(
          ({ id, likes, alt_description, urls: { regular, small } }) => (
            <li key={id} className={s.galleryCard}>
              <ImageCard
                likes={likes}
                smallImg={small}
                largeImg={regular}
                alt={alt_description}
              />
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default ImageGallery;
