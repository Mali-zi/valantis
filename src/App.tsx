import { Routes, Route, useNavigate } from 'react-router-dom';
import Page404 from './pages/Page404';
import Products from './pages/Products';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import {
  fetchIds,
  fetchItems,
  setCurentPage,
} from './redux/store/productSlice';
import { md5 } from 'js-md5';
import { password } from './utils/const';

function App() {
  const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const hash = md5(`${password}_${timeStamp}`);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ids, curentPage, curentIds } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth': hash,
      },
      body: JSON.stringify({
        action: 'get_ids',
        params: {},
      }),
    };

    dispatch(fetchIds(options));
    navigate('/1');
  }, []);

  // useEffect(() => {
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'x-auth': hash,
  //     },
  //     body: JSON.stringify({
  //       action: 'get_ids',
  //       params: {},
  //     }),
  //   };

  //   dispatch(fetchIds(options));
  //   navigate(`/${curentPage}`);
  // }, [curentPage, dispatch, hash, navigate]);

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

  return (
    <Routes>
      <Route path="/:page" element={<Products />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
