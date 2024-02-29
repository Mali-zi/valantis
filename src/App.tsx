import { Routes, Route, useNavigate } from 'react-router-dom';
import Page404 from './pages/Page404';
import Products from './pages/Products';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import { fetchIds, fetchItems } from './redux/store/productSlice';
import { md5 } from 'js-md5';
import { limit, password } from './utils/const';

function App() {
  const timeStamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const hash = md5(`${password}_${timeStamp}`);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ids, curentPage } = useAppSelector((state) => state.product);

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
    const curentIds = ids.slice((curentPage - 1) * limit, curentPage * limit);
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

    if (ids.length > 0) {
      dispatch(fetchItems(options));
    }
  }, [curentPage, dispatch, hash, ids]);

  return (
    <Routes>
      <Route path="/:page" element={<Products />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
