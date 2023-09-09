import Card from "../components/Card";
import { Link } from "react-router-dom";
import EmptyPage from "../components/emptyPage";
function Favorite(props) {
   return (
    <div className="favorite">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <button className="back">
            <img src="img/back.svg" alt="back" />
          </button>
        </Link>
        <h2>Мои закладки</h2>
      </div>
      {props.favoriteList.length <= 0 ? (
        <EmptyPage
          title="Закладок нет :("
          description="Вы ничего не добавляли в закладки"
          imageSrc="img/emptyFav.png"
          onClose={null}
        />
      ) : (
        <div className="cards">
          {props.favoriteList.map((item, index) => {
            return (
              <Card
                description={item.description}
                coast={item.coast}
                imageSrc={item.imageSrc}
                key={index}
                id={item.id}
                onAdd={props.addToCart}
                onLike={props.addToFav}
                isFavOpen={props.isFavOpen}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Favorite;
