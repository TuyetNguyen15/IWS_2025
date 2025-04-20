import React from "react";

const Pagination = ({ totalPages, currentPage, paginate }) => {
    return (
        <div className="d-flex justify-content-center align-items-center my-4 gap-2">
            {[...Array(totalPages).keys()].map(number => (
                <span
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    style={{
                        cursor: 'pointer',
                        fontSize: '36px',
                        color: currentPage === number + 1 ? '#794b31' : '#ccc',
                        margin: '0 5px',
                    }}
                >
                    &bull;
                </span>
            ))}
        </div>
    );
};

export default Pagination;
