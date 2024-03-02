import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/app/hooks';
import { setCurentPage } from '../../redux/store/productSlice';

export default function PageNumbersSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { curentPage, total_pages } = useAppSelector((state) => state.product);

  const items: JSX.Element[] = [];

  if (total_pages === 1) {
    items.push(
      <li key="1" data-page={1} className="btn-active">
        1
      </li>
    );
  }

  if (total_pages > 1) {
    if (curentPage > 1) {
      items.push(
        <li
          key="prev"
          className="page-prev"
          onClick={() => {
            dispatch(setCurentPage(curentPage - 1));
            navigate(`/${curentPage - 1}`);
          }}
        >
          &laquo;
        </li>
      );
    }

    items.push(
      <li
        key="1"
        className={1 === curentPage ? 'btn-active' : 'btn'}
        onClick={() => {
          dispatch(setCurentPage(1));
          navigate('/1');
        }}
      >
        1
      </li>
    );
  }

  if (total_pages > 1 && total_pages <= 7) {
    for (let page = 2; page <= total_pages - 1; page++) {
      items.push(
        <li
          key={page}
          data-page={page}
          className={page === curentPage ? 'btn-active' : 'btn'}
          onClick={() => {
            dispatch(setCurentPage(page));
            navigate(`/${page}`);
          }}
        >
          {page}
        </li>
      );
    }
  }

  if (total_pages >= 8) {
    if (curentPage <= 2) {
      for (let page = 2; page <= 3; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
              navigate(`/${page}`);
            }}
          >
            {page}
          </li>
        );
      }
      items.push(
        <li key="ind-1" className="ellipsis-item">
          ...
        </li>
      );
    }

    if (curentPage >= 3 && curentPage <= 4) {
      for (let page = 2; page <= curentPage + 1; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
              navigate(`/${page}`);
            }}
          >
            {page}
          </li>
        );
      }
      items.push(
        <li key="ind-2" className="ellipsis-item">
          ...
        </li>
      );
    }

    if (curentPage >= 5 && curentPage <= total_pages - 4) {
      items.push(
        <li key="ind-3" className="ellipsis-item">
          ...
        </li>
      );
      for (let page = curentPage - 1; page <= curentPage + 1; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
              navigate(`/${page}`);
            }}
          >
            {page}
          </li>
        );
      }
      items.push(
        <li key="ind-4" className="ellipsis-item">
          ...
        </li>
      );
    }

    if (curentPage <= total_pages - 2 && curentPage >= total_pages - 3) {
      items.push(
        <li key="ind-5" className="ellipsis-item">
          ...
        </li>
      );
      for (let page = curentPage - 1; page <= total_pages - 1; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
              navigate(`/${page}`);
            }}
          >
            {page}
          </li>
        );
      }
    }

    if (curentPage >= total_pages - 1) {
      items.push(
        <li key="ind-6" className="ellipsis-item">
          ...
        </li>
      );
      for (let page = total_pages - 2; page <= total_pages - 1; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
              navigate(`/${page}`);
            }}
          >
            {page}
          </li>
        );
      }
    }
  }

  if (total_pages > 1) {
    items.push(
      <li
        key={total_pages}
        data-page={total_pages}
        className={total_pages === curentPage ? 'btn-active' : 'btn'}
        onClick={() => {
          dispatch(setCurentPage(total_pages));
          navigate(`/${total_pages}`);
        }}
      >
        {total_pages}
      </li>
    );
  }

  if (curentPage < total_pages) {
    items.push(
      <li
        key="next"
        className="page-next"
        onClick={() => {
          dispatch(setCurentPage(curentPage + 1));
          navigate(`/${curentPage + 1}`);
        }}
      >
        &raquo;
      </li>
    );
  }

  if (total_pages > 0) {
    return <ul className="pagination">{items}</ul>;
  } else <></>;
}
