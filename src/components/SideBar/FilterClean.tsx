import { useNavigate } from 'react-router-dom';

export default function FilterClean() {
  const navigate = useNavigate();

  const filterClean = () => {
    navigate('/1');
  };

  return (
    <div className="mt-16 mx-auto">
      <button type="button" className="btn" onClick={filterClean}>
        Очистить фильтры
      </button>
    </div>
  );
}
