import { Routes, Route, useNavigate } from 'react-router-dom';
import Page404 from './pages/Page404';
import Products from './pages/Products';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import { fetchIds, fetchItems } from './redux/store/productSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ids, curentPage } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchIds(curentPage));
    navigate(`/${curentPage}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curentPage]);

  useEffect(() => {
    if (ids.length > 0) {
      dispatch(fetchItems(ids));
    }
  }, [dispatch, ids]);

  return (
    <Routes>
      <Route path="/:page" element={<Products />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
