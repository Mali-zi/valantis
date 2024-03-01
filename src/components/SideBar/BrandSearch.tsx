import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrandSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isValid, setIsValid] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = value.trim();
    if (query) {
      setSearchQuery(query);
      setIsValid(true);
      navigate('/1');
    } else {
      setIsValid(false);
    }
  }

  return (
    <div className="mb-3 mt-20">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor="search-form"
          className="form-label d-flex flex-column justify-content-start align-items-start fs-5"
        >
          <h2 className="text-2xl">Поиск по бренду</h2>
          <div className="container-fluid d-flex p-0 align-items-stretch mt-2">
            <input
              id="search-form"
              type="text"
              className="form-control w-100 border-4 border-primary"
              placeholder="Piaget"
              autoFocus
              value={value}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="submit"
              className="btn btn-primary ms-2 flex-shrink-1"
              value="Search"
            />
          </div>
        </label>
      </form>
      {isValid ? <></> : <p className="text-danger fs-5">Невалидный запрос.</p>}
    </div>
  );
}
