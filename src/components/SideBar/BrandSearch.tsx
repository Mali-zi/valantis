import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/app/hooks';
import { hash } from '../../utils/const';
import { fetchIds } from '../../redux/store/productSlice';

export default function BrandSearch() {
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
          params: { brand: query },
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
    <div className="mt-12 w-full h-24">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="brand-search" className="">
          <h2 className="text-xl">Поиск по бренду</h2>
          <div className="flex flex-row mt-2">
            <input
              id="brand-search"
              type="text"
              className="inp"
              placeholder="Введите бренд"
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
        <p className="text-red-500 text-sm mt-1">Невалидный запрос.</p>
      )}
    </div>
  );
}
