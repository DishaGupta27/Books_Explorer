const Pagination = ({ totalItems, itemsPerPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            {pages.map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)}>
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;