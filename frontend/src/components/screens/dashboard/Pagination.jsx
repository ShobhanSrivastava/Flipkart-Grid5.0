import React from 'react';

const Pagination = ({ transactionsPerPage, totalTransactions, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, pageNumbers.length);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }
    
  return (
      <ul className="flex items-center justify-center gap-x-5 p-4">
        {/* Left Arrow */}
        {
          <li>
            <button
              onClick={() => {
                if(currentPage > 1)
                    paginate(currentPage - 1)
                }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            </button>
          </li>
        }

        {/* Visible Page Numbers */}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          (
            <li key={number}>
              <div className={`${
                    number === currentPage ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white' : 'text-gray-700'} rounded-sm hover:cursor-pointer focus:outline-none text-sm p-[2px]`}>
                <button onClick={() => paginate(number)} className={`${number === currentPage ? 'bg-[#1c1c24]' : 'bg-transparent'} rounded-sm`} >
                  <span className='p-2'>{number}</span>
                </button>
              </div>
            </li>
          )
        ))}

        {/* Right Arrow */}
        {
          <li>
            <button
              onClick={() => {
                if(currentPage < pageNumbers.length)
                    paginate(currentPage + 1)
              }}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            </button>
          </li>
        }
      </ul>
  );
};

export default Pagination;
