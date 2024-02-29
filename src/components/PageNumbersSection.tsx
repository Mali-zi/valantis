import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { limit } from '../utils/const';
import { setCurentPage } from '../redux/store/productSlice';

export default function PageNumbersSection() {
  const dispatch = useAppDispatch();
  const { ids, curentPage } = useAppSelector((state) => state.product);

  const total = ids.length;
  const pageAmount = ids.length > 0 ? Math.ceil(total / limit) : 0;

  const items: JSX.Element[] = [];

  if (pageAmount === 1) {
    items.push(
      <li key="1" data-page={1} className="btn-active">
        1
      </li>
    );
  }

  if (pageAmount > 1) {
    if (curentPage > 1) {
      items.push(
        <li
          key="prev"
          className="page-prev"
          onClick={() => {
            dispatch(setCurentPage(curentPage - 1));
          }}
        >
          <Link to={`/${curentPage - 1}`}>&laquo;</Link>
        </li>
      );
    }

    items.push(
      <li
        key="1"
        className={1 === curentPage ? 'btn btn-active' : 'btn'}
        onClick={() => {
          dispatch(setCurentPage(1));
        }}
      >
        <Link to="/1">1</Link>
      </li>
    );
  }

  if (pageAmount > 1 && pageAmount <= 7) {
    for (let page = 2; page <= pageAmount - 1; page++) {
      items.push(
        <li
          key={page}
          data-page={page}
          className={page === curentPage ? 'btn btn-active' : 'btn'}
          onClick={() => {
            dispatch(setCurentPage(page));
          }}
        >
          <Link to={`/${page}`}>{page}</Link>
        </li>
      );
    }
  }

  if (pageAmount >= 8) {
    if (curentPage <= 2) {
      for (let page = 2; page <= 3; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
            }}
          >
            <Link to={`/${page}`}>{page}</Link>
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
            className={page === curentPage ? 'btn btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
            }}
          >
            <Link to={`/${page}`}>{page}</Link>
          </li>
        );
      }
      items.push(
        <li key="ind-2" className="ellipsis-item">
          ...
        </li>
      );
    }

    if (curentPage >= 5 && curentPage <= pageAmount - 4) {
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
            className={page === curentPage ? 'btn btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
            }}
          >
            <Link to={`/${page}`}>{page}</Link>
          </li>
        );
      }
      items.push(
        <li key="ind-4" className="ellipsis-item">
          ...
        </li>
      );
    }

    if (curentPage <= pageAmount - 2 && curentPage >= pageAmount - 3) {
      items.push(
        <li key="ind-5" className="ellipsis-item">
          ...
        </li>
      );
      for (let page = curentPage - 1; page <= pageAmount - 1; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
            }}
          >
            <Link to={`/${page}`}>{page}</Link>
          </li>
        );
      }
    }

    if (curentPage >= pageAmount - 1) {
      items.push(
        <li key="ind-6" className="ellipsis-item">
          ...
        </li>
      );
      for (let page = pageAmount - 2; page <= pageAmount - 1; page++) {
        items.push(
          <li
            key={page}
            data-page={page}
            className={page === curentPage ? 'btn btn-active' : 'btn'}
            onClick={() => {
              dispatch(setCurentPage(page));
            }}
          >
            <Link to={`/${page}`}>{page}</Link>
          </li>
        );
      }
    }
  }

  if (pageAmount > 1) {
    items.push(
      <li
        key={pageAmount}
        data-page={pageAmount}
        className={pageAmount === curentPage ? 'btn btn-active' : 'btn'}
        onClick={() => {
          dispatch(setCurentPage(pageAmount));
        }}
      >
        <Link to={`/${pageAmount}`}>{pageAmount}</Link>
      </li>
    );
  }

  if (curentPage < pageAmount) {
    items.push(
      <li
        key="next"
        className="page-next"
        onClick={() => {
          dispatch(setCurentPage(curentPage + 1));
        }}
      >
        <Link to={`/${curentPage + 1}`}>&raquo;</Link>
      </li>
    );
  }

  if (pageAmount > 0) {
    return <ul className="pagination">{items}</ul>;
  } else <></>;
}
