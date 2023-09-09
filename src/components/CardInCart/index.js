import styles from "./CardInCart.module.scss";
function CardInCart(props) {
  
  return (
    <div className={styles.cartItem}>
      <img src={props.imageSrc} alt="sneakers_2" />
      <div>
        <p>{props.description}</p>
        <span>{props.coast} руб.</span>
      </div>
      <button
        onClick={() => props.onDelete(props.index, props.id)}
        className={styles.close}>
        <img src="img/close.svg" alt="close" />
      </button>
    </div>
  );
}
export default CardInCart;
