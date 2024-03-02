import { useNavigate } from 'react-router-dom';
import { hash } from '../../utils/const';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchIds } from '../../redux/store/productSlice';

export default function FilterClean() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filterClean = () => {
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
  };

  return (
    <div className="md:mt-8 mt-2 mx-auto">
      <button type="button" className="btn" onClick={filterClean}>
        Сбросить фильтр
      </button>
    </div>
  );
}
