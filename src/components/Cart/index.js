import { useState } from "react";
import CardInCart from "../CardInCart";
import EmptyPage from "../emptyPage";
import styles from "./Cart.module.scss";
function Cart({
  onClose,
  cartItems,
  onDelete,
  price,
  clearCart,
  addToOrderList,
  isCartOpen,
}) {
 
  const [isOrderComplite, setOrderComplite] = useState(false);
  const compliteOrder = () => {
    addToOrderList(cartItems);
    clearCart();
    setOrderComplite(true);
  };
  return (
    <div className={`${styles.overlay} ${isCartOpen && styles.overlayVisible}`}>
      <div className={styles.cartField}>
        <div className={styles.wrapItems}>
          <h2>
            Корзина{" "}
            <button className={styles.close} onClick={onClose}>
              <img src="img/close.svg" alt="close" />
            </button>
          </h2>
          {cartItems.length <= 0 ? (
            <EmptyPage
              title={isOrderComplite ? "Заказ оформлен!" : "Корзина пустая"}
              imageSrc={
                isOrderComplite ? "img/compOrder.jpg" : "img/emptyCart.png"
              }
              description={
                isOrderComplite
                  ? "Ваш заказ скоро будет передан курьерской доставке"
                  : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              }
              onClose={onClose}
            />
          ) : (
            <div className={styles.items}>
              <div style={{ overflow: "auto" }} className="d-flex flex-1">
                <div style={{ width: "100%" }}>
                  {cartItems.map((obj, index) => (
                    <CardInCart
                      description={obj.description}
                      imageSrc={obj.imageSrc}
                      coast={obj.coast}
                      key={index}
                      onDelete={onDelete}
                      id={obj.id}
                      index={obj.index}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.totalPrice}>
                <ul>
                  <li>
                    <span>Итого: </span>
                    <div></div>
                    <b>{price} руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%: </span>
                    <div></div>
                    <b>{(price * 0.05).toFixed(3)} руб. </b>
                  </li>
                </ul>
                <button onClick={compliteOrder} className="greenBtn arrowLeft">
                  Оформить заказ <img src="img/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cart;
