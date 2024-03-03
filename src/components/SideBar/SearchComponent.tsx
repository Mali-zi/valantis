import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/app/hooks';
import { hash } from '../../utils/const';
import { fetchIds } from '../../redux/store/productSlice';
import SearchIcon from '../../assets/icons/SearchIcon';

interface ISearchComponentfield {
  name: string;
  title: string;
  text: string;
}

export default function SearchComponent({
  name,
  title,
  text,
}: ISearchComponentfield) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);

    if (e.target.value.trim() === '') {
      setIsValid(true);
    }

    if (name === 'price' && isNaN(Number(e.target.value))) {
      setIsValid(false);
    }

    if (name === 'price' && !isNaN(Number(e.target.value))) {
      setIsValid(true);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();
    const priceQuery = Number(query);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth': hash,
      },
    };
    let body = '';

    if (!query) {
      setIsValid(false);
      return;
    }
    if (query && name === 'price' && isNaN(priceQuery)) {
      setIsValid(false);
      return;
    }
    if (query) {
      if (name === 'price' && !isNaN(priceQuery)) {
        body = JSON.stringify({
          action: 'filter',
          params: { price: priceQuery },
        });
      }
      if (name === 'product' || name === 'brand') {
        body = JSON.stringify({
          action: 'filter',
          params: { [name]: query },
        });
      }

      dispatch(fetchIds({ ...options, body: body }));
      setIsValid(true);
      setValue('');
      navigate('/1');
    }
  }

  return (
    <>
      <h2 className="text-xl">Поиск по {title}</h2>
      <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor={`${name}-search`}>
          <div className="flex flex-row p-1">
            <input
              id={`${name}-search`}
              type="text"
              className="inp"
              placeholder={`Введите ${text}`}
              autoFocus
              autoComplete="off"
              value={value}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" title="search button" className="search-btn">
              <SearchIcon />
            </button>
          </div>
        </label>
      </form>
      {isValid ? (
        <></>
      ) : (
        <p className="text-red-500 text-sm mt-1">Невалидный запрос.</p>
      )}
    </>
  );
}
