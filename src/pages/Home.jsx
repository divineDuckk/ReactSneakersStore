import Card from "../components/Card";
function Home(props) {
  const renderItems = () => {
    return (
      props.isLoading
        ? [...Array(10)]
        : props.sneakersList.filter((item) => {
            return item.description
              .toLowerCase()
              .includes(props.searchVal.toLowerCase());
          })
    ).map((item, index) => {
      return (
        <Card
          key={index}
          added={props.cartList.some((cartItem) => {
            return cartItem.id == item.id;
          })}
          favorited={props.favoriteList.some((favItem) => {
            return favItem.id == item.id;
          })}
          onAdd={props.addToCart}
          onLike={props.addToFav}
          isFavOpen={props.isFavOpen}
          isLoading={props.isLoading}
          index={index}
          {...item}
        />
      );
    });
  };
  return (
    <div className="content">
      <div className="d-flex align-center justify-between">
        <h1>
          {props.searchVal
            ? `Поиск по запросу: '${props.searchVal}'`
            : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <img src="img/search.svg" alt="search" />
          <input
            onChange={props.onSearchValChange}
            value={props.searchVal}
            type="text"
            placeholder="Поиск..."
            maxLength={38}
          />
        </div>
      </div>
      <div className="cards">{renderItems()}</div>
    </div>
  );
}
export default Home;
