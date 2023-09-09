import Card from "../components/Card";
import { Link } from "react-router-dom";
import EmptyPage from "../components/emptyPage";
function Orders({ orderList, addToCart, addToFav }) {
  return (
    <div className="orders">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <button className="back">
            <img src="img/back.svg" alt="back" />
          </button>
        </Link>
        <h2>Мои заказы</h2>
      </div>
      {orderList.length <= 0 ? (
        <EmptyPage
          title="У вас нет заказов"
          description="Вы нищеброд? Оформите хотя бы один заказ."
          imageSrc="img/sadSmile.png"
          onClose={null}
        />
      ) : (
        <div className="cards">
          {orderList.map((item, index) => {
            return (
              <Card
                description={item.description}
                coast={item.coast}
                imageSrc={item.imageSrc}
                key={index}
                id={item.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Orders;
