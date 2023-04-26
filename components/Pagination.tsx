import { FC } from "react";
import { IUsePagination } from "@/utils/interfaces";
import { usePagination } from "../utils/actions/usePagination";
import classNames from "classnames";
import { DOTS } from "@/utils/constants";

interface IPagination extends IUsePagination {
  onPageChange: (val: number | string) => void;
  className: string;
}

export const Pagination: FC<IPagination> = (props: IPagination) => {
  const { onPageChange, results, siblingCount = 1, page, pageNum } = props;

  const paginationRange = usePagination({
    page,
    results,
    siblingCount,
    pageNum,
  });

  if (page === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(Number(page) + 1);
  };

  const onPrevious = () => {
    onPageChange(Number(page) - 1);
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];
  const currentNews = Number(page) * pageNum;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div>
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{currentNews - pageNum + 1}</span> to{" "}
          <span className="font-medium">{currentNews}</span> of{" "}
          <span className="font-medium">{results}</span> results
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <span
            className={classNames(
              "pagination-item relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0",
              {
                "pointer-events-none": page === 1,
              }
            )}
            onClick={onPrevious}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {paginationRange.map((pageNumber, i) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return (
                <span
                  key={i}
                  className="pointer-events-none pagination-item relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
                >
                  &#8230;
                </span>
              );
            }
            // Render Page numbers
            return (
              <span
                key={i}
                className={classNames(
                  "pagination-item relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0 cursor-pointer",
                  {
                    "bg-gray-400 text-white hover:bg-gray-300":
                      pageNumber === page,
                  }
                )}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </span>
            );
          })}
          {/*  Right Navigation arrow */}
          <span
            className={classNames(
              "pagination-item relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0",
              {
                "pointer-events-none": page === lastPage,
              }
            )}
            onClick={onNext}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </nav>
      </div>
    </div>
  );
};
