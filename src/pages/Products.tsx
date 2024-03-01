import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import FavoriteSvg from '../assets/icons/favorite.svg';
import FavoriteBorderSvg from '../assets/icons/favorite_border.svg';
import PageNumbersSection from '../components/PageNumbersSection';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { fetchItems } from '../redux/store/productSlice';
import { hash } from '../utils/const';
import {
  setAddFavorite,
  setRemoveFavorite,
} from '../redux/store/favouriteProductSlice';
import { IItem } from '../utils/models';

interface IOver {
  over: boolean;
  id: string;
}

const Products = () => {
  const dispatch = useAppDispatch();
  const { items, status, curentIds } = useAppSelector((state) => state.product);
  const { favouriteProducts } = useAppSelector(
    (state) => state.favouriteProduct
  );

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

  const [isMouseOver, setMouseOver] = useState<IOver>({
    over: false,
    id: '',
  });

  const handleClick = (item: IItem) => {
    const isfavourite = favouriteProducts.find(
      (favouriteProduct) => item.id === favouriteProduct.id
    );
    if (isfavourite) {
      dispatch(setRemoveFavorite(item));
    } else {
      dispatch(setAddFavorite(item));
    }

    console.log('item', item);
  };

  const productList = items?.map((item) => {
    const isfavourite = favouriteProducts.find(
      (favouriteProduct) => item.id === favouriteProduct.id
    );

    return (
      <li key={item.id} className="card">
        <div className="inner-card">
          <div className="flex flex-col gap-4 h-[180px] overflow-hidden">
            <div className="text-3xl text-left font-semibold">
              {new Intl.NumberFormat('ru-RU').format(item.price)} ₽
            </div>
            {item.brand ? (
              <div className="text-3xl text-left">{item.brand}</div>
            ) : (
              <></>
            )}
            <div className="text-2xl leading-8 text-left">{item.product}</div>
          </div>

          <div className="heart-holder">
            <button
              type="button"
              className="favorite-btn"
              onClick={() => handleClick(item)}
              onMouseOver={() =>
                setMouseOver({
                  over: true,
                  id: item.id,
                })
              }
              onMouseOut={() =>
                setMouseOver({
                  over: false,
                  id: '',
                })
              }
            >
              {isfavourite ||
              (isMouseOver.over && isMouseOver.id === item.id) ? (
                <img src={FavoriteSvg} alt="Favorite SVG" />
              ) : (
                <img src={FavoriteBorderSvg} alt="Favorite Border SVG" />
              )}
            </button>
          </div>
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
          <ul className="card-list">{productList}</ul>
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
