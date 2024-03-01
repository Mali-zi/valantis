import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import FavoriteSvg from '../assets/icons/favorite.svg';
import PageNumbersSection from '../components/PageNumbersSection';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import { fetchItems } from '../redux/store/productSlice';
import { hash } from '../utils/const';

// interface IOver {
//   over: boolean;
//   id: null | number;
// }

const Products = () => {
  const dispatch = useAppDispatch();
  const { items, status, curentIds } = useAppSelector((state) => state.product);

  useEffect(() => {
    console.log('curentIds', curentIds);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth': hash,
      },
      body: JSON.stringify({
        action: 'get_items',
        params: { ids: curentIds },
      }),
    };

    if (curentIds.length > 0) {
      dispatch(fetchItems(options));
    }
  }, [curentIds]);

  // const favouriteUsers = useAppSelector(
  //   (state) => state.favouriteUsers.favouriteUsers
  // );
  // const [isMouseOver, setMouseOver] = useState<IOver>({
  //   over: false,
  //   id: null,
  // });

  const handleClick = (id: string) => {
    // const isfavourite = favouriteUsers.find(
    //   (favouriteUser) => user.id === favouriteUser.id
    // );
    // if (isfavourite) {
    //   dispatch(setRemoveFavorite(user));
    // } else {
    //   dispatch(setAddFavorite(user));
    // }

    console.log('id', id);
  };

  const productList = items?.map((item) => {
    // const isfavourite = favouriteUsers.find(
    //   (favouriteUser) => user.id === favouriteUser.id
    // );

    return (
      <li key={item.id} className="card">
        <h2 className="text-center mt-4">{item.product}</h2>
        <div className="heart-holder">
          <button
            type="button"
            className="favorite-btn"
            onClick={() => handleClick(item.id)}
            // onMouseOver={() =>
            //   setMouseOver({
            //     over: true,
            //     id: product.id,
            //   })
            // }
            // onMouseOut={() =>
            //   setMouseOver({
            //     over: false,
            //     id: null,
            //   })
            // }
          >
            {/* {isfavourite || (isMouseOver.over && isMouseOver.id === user.id) ? ( */}
            <img src={FavoriteSvg} alt="Favorite SVG" />
            {/* ) : (
              <img src={FavoriteBorderSvg} alt="Favorite Border SVG" />
            )} */}
          </button>
        </div>
      </li>
    );
  });

  if (status === 'pending') {
    return <Loader />;
  } else {
    if (items.length > 0) {
      return (
        <div className="product-container">
          <PageNumbersSection />
          <ul className="cardList">{productList}</ul>
        </div>
      );
    } else {
      return (
        <div>
          Извините, ничего не найдено. Проверьте правильность запроса или
          введите другой.
        </div>
      );
    }
  }
};

export default Products;
