/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'

import { usePagination, DOTS } from './usePagination';

type Props = {
  onPageChange: Function,
  totalCount: number,
  currentPage: number,
  pageSize: number,
  className?: string,
  siblingCount?: number,
}

export const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,

  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={clsx('pagination-container')}
    >
      <li
        className={clsx('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((element: string | number, key: number) => {
        if (element === DOTS) {
          return <li key={key} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            key={`pagination-item-${key}`}
            className={clsx('pagination-item', {
              selected: element === currentPage,
              "text-muted": element !== currentPage
            })}
            onClick={() => onPageChange(element)}
          >
            {element}
          </li>
        );
      })}
      <li
        className={clsx('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right text-gray-700" />
      </li>
    </ul>
  );
};

