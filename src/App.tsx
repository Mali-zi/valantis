import { Routes, Route, useNavigate } from 'react-router-dom';
import Page404 from './pages/Page404';
import Products from './pages/Products';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/app/hooks';
import { fetchIds } from './redux/store/productSlice';
import MainPage from './pages/MainPage';
import { hash } from './utils/const';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.product);

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

  useEffect(() => {
    if (errors?.errMessage === '') navigate('/');
  }, [errors]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/:page" element={<Products />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
