import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setCurentPage } from '../redux/store/productSlice';

export default function PageNumbersSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { total_pages, total, curentPage } = useAppSelector(
    (state) => state.users
  );

  const pageArray: number[] = [];

  if (total_pages) {
    for (let i = 0; i < total_pages; i++) {
      pageArray.push(i + 1);
    }
  }

  const pageNumbers = pageArray.map((item, index) => {
    return (
      <li key={index}>
        <input
          type="radio"
          className="invisible"
          name={`btnradio-${item}`}
          id={`btnradio-${item}`}
          value={item}
          checked={curentPage === item}
          onChange={() => {
            dispatch(setCurentPage(item));
            navigate(`/${item}`);
          }}
        />
        <label
          className={curentPage === item ? 'btn-active' : 'btn'}
          htmlFor={`btnradio-${item}`}
        >
          {item}
        </label>
      </li>
    );
  });

  if (total) {
    return (
      <ul
        role="form"
        aria-label="page-numbers"
        className="flex flex-row gap-2 justify-end mb-8"
      >
        {pageNumbers}
      </ul>
    );
  } else {
    return <></>;
  }
}
