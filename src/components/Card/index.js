import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
function Card({
  imageSrc,
  description,
  coast,
  onAdd,
  id,
  onLike,
  isFavOpen,
  added,
  isLoading = false,
  index,
  favorited,
}) {
  const onClickAdd = () => {
    onAdd({ index, id, description, coast, imageSrc });
  };
  const onClickLike = () => {
    onLike({ index, id, description, coast, imageSrc });
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={235}
          viewBox="0 0 210 210"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="110" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="129" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="170" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="165" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onLike && (
            <button onClick={onClickLike} className="likeBtn">
              <img
                src={
                  favorited || isFavOpen ? "img/red-like.svg" : "img/like.png"
                }
                alt="like"
              />
            </button>
          )}
          <img width="133" src={imageSrc}></img>
          <p>{description}</p>
          <div className={styles.price}>
            <p>
              ЦЕНА:
              <br /> <span>{coast} руб.</span>
            </p>
            {onAdd && (
              <button onClick={onClickAdd}>
                <img
                  src={added ? "img/checked.svg" : "img/plus.svg"}
                  alt="add"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Card;
