import { ToStart, PrevIcon, NextIcon, ToEnd } from '../SvgIcons/SvgIcons.tsx'
import './css/Pagination.css'

export const Pagination = ({currentPage, setCurrentPage,  pageNumbers, totalPages}) => {

    return (
      <div className='pagination-wrap' >
        <div className='pagination-block'>

          {/*to Start button*/}
          <button
            className='btn btn-outline-secondary'
            onClick={()=> setCurrentPage(1)}
            disabled={currentPage===1}
          >
            <ToStart />
          </button>

          {/*Prev button*/}
          <button
            className='btn btn-outline-secondary'
            onClick={()=> setCurrentPage(prev => Math.max(prev-1, 1))}
            disabled={currentPage===1}
          >
            <PrevIcon />
          </button>
        
          {/*Affichage du numéro*/}
          <div className='pagination-digit'>
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

          {/*Next Button*/}
            <button
                className='btn btn-outline-secondary'
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
              <NextIcon />
            </button>
          {/*to End Button*/}
            <button
              className='btn btn-outline-secondary'
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ToEnd />
            </button>

        </div> {/*fin de pagination-block*/}
        
          {/*Affichage des de la page actuelle sur le total des pages*/}
          <div className='pagination-info'>
            <span>Page {currentPage} de {totalPages}</span>
          </div> {/*fin de pagination-info*/}

      </div> //fin de pagination-wrap
    );
} 