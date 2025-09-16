
export const Pagination = ({currentPage, setCurrentPage,  pageNumbers, totalPages}) => {

    return (
<div style={{ padding: '20px' }}>
  <div style={{ 
    marginTop: '20px', 
    display: 'flex', 
    gap: '10px', 
    alignItems: 'center', 
    justifyContent: 'center',
    flexWrap: 'wrap' 
  }}>
    
    {/* Кнопка Previous */}
    <button
      className='btn btn-outline-secondary'

    onClick={()=> setCurrentPage(1)}
    disabled={currentPage===1}
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-start" viewBox="0 0 16 16">
  <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0zm7.5.633L5.696 8l5.804 3.367z"/>
</svg>
    </button>
    <button
      className='btn btn-outline-secondary'

    onClick={()=> setCurrentPage(prev => Math.max(prev-1, 1))}
    disabled={currentPage===1}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
</svg>
    </button>

    {/* Цифры страниц*/}
    <div style={{ display: 'flex', gap: '5px' }}>
      {pageNumbers.slice(currentPage - 1, currentPage + 1).map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`btn ${currentPage === number ? 'btn-success' : 'btn-outline-secondary'}`}
        >
          {number}
        </button>
      ))}
    </div> 

    {/* Кнопка Next */}
  <button
      className='btn btn-outline-secondary'
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
</svg></button>
  
    <button
      className='btn btn-outline-secondary'
      onClick={() => setCurrentPage(totalPages)}
      disabled={currentPage === totalPages}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-end" viewBox="0 0 16 16">
  <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0zM5 4.633 10.804 8 5 11.367z"/>
</svg>
  </button>
  </div>
  
  {/* Информация о странице */}
  <div style={{ 
    marginTop: '15px', 
    textAlign: 'center', 
    color: '#6c757d',
    fontSize: '14px'
  }}>
    Page {currentPage} de {totalPages}
  </div>
  </div>

    );
} 