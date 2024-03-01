import { useNavigate } from 'react-router-dom';

export default function FilterClean() {
  const navigate = useNavigate();

  const filterClean = () => {
    navigate('/1');
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary ms-2 flex-shrink-1"
        onClick={filterClean}
      >
        Очистить фильтры
      </button>
    </div>
  );
}
