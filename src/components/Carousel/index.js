import styles from "./Carousel.module.scss";
import { Children, cloneElement, useEffect, useState } from "react";

const PAGE_WIDTH = 960;

function SneakersCarousel({ children }) {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);
  const handleClickArrowRight = () => {
    setOffset((prev) => {
      return Math.max(prev - PAGE_WIDTH, -PAGE_WIDTH);
    });
    console.log(offset);
  };
  const handleClickArrowLeft = () => {
    setOffset((prev) => {
      return Math.min(prev + PAGE_WIDTH, PAGE_WIDTH);
    });
    console.log(offset);
  };
  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: "100%",
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`,
            borderRadius: "20px",
          },
        });
      })
    );
  }, []);
  return (
    <div className={styles.mainContent}>
      <button
        onClick={handleClickArrowLeft}
        className={`${styles.leftBtn} ${
          offset == PAGE_WIDTH && styles.inVisible
        }`}>
        <img src="img/arrowRight.svg" alt="arrowLeft" />
      </button>
      <div className={styles.window}>
        <h2>
          <span>Stan Smith</span>
          , <br /> Forever!
        </h2>

        <div
          className={styles.pages}
          style={{ transform: `translateX(${offset}px)` }}>
          {pages}
        </div>
      </div>
      <button
        onClick={handleClickArrowRight}
        className={`${styles.rightBtn} ${
          offset == -PAGE_WIDTH && styles.inVisible
        }`}>
        <img src="img/arrowRight.svg" alt="arrowRight" />
      </button>
    </div>
  );
}
export default SneakersCarousel;
