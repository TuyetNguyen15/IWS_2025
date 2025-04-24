import React from "react";

const Pagination = ({ totalPages, currentPage, paginate }) => {
  const generatePages = () => {
    const pages = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination-wrapper d-flex justify-content-center mt-4">
      <ul className="pagination-ui">
        <li
          className="pagination-btn"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        >
          &lt;
        </li>

        {generatePages().map((page, idx) => (
          <li
            key={idx}
            className={`pagination-item ${
              page === currentPage ? "active" : ""
            } ${page === "..." ? "dots" : ""}`}
            onClick={() => page !== "..." && paginate(page)}
          >
            {page}
          </li>
        ))}

        <li
          className="pagination-btn"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        >
          &gt;
        </li>
      </ul>
    </div>
  );
};

export default Pagination;