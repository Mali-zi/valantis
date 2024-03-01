import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/app/hooks';
import { hash } from '../../utils/const';
import { fetchIds } from '../../redux/store/productSlice';

export default function ProductSearch() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();

    if (query) {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-auth': hash,
        },
        body: JSON.stringify({
          action: 'filter',
          params: { product: query },
        }),
      };

      dispatch(fetchIds(options));
      setIsValid(true);
      setValue('');
      navigate('/1');
    } else {
      setIsValid(false);
    }
  }

  return (
    <div className="mt-24 w-full">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="product-search" className="">
          <h2 className="text-xl">Поиск по названию</h2>
          <div className="flex flex-row mt-2">
            <input
              id="product-search"
              type="text"
              className="inp"
              placeholder="Введите название"
              autoFocus
              autoComplete="off"
              value={value}
              onChange={(e) => handleChange(e)}
            />
            <input type="submit" className="btn ml-2" value="Поиск" />
          </div>
        </label>
      </form>
      {isValid ? (
        <></>
      ) : (
        <p className="text-red-500 text-sm">Невалидный запрос.</p>
      )}
    </div>
  );
}
