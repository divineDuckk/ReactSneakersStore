import styles from "./emptyPage.module.scss";
import { Link } from "react-router-dom";
function EmptyPage(props) {
  return (
    <div className={styles.emptyCart}>
      <img src={props.imageSrc} alt="empty" />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <Link to="/">
        <button onClick={props.onClose} className="greenBtn arrowRight">
          <img src="img/arrow.svg" alt="arrow" /> Вернуться назад
        </button>
      </Link>
    </div>
  );
}
export default EmptyPage;
