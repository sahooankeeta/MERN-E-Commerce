import React from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
const Pagination = ({pageCount,currentPage}) => {
    const navigate=useNavigate()
    const handlePageChange=(e)=>{
        //setPage(e.selected+1)
       navigate(`/products?page=${e.selected+1}`)
    }
  return (
    <ReactPaginate
        forcePage={currentPage}
        previousLabel="<"
        nextLabel=">"
        pageClassName="xx"
        pageLinkClassName="p-3"
        previousClassName=""
        previousLinkClassName="p-3"
        nextClassName="yy"
        nextLinkClassName="p-3"
        breakLabel="..."
        breakClassName="uu"
        breakLinkClassName="p-3"
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center gap-1 my-5"
        activeClassName="bg-cyan-500 text-white rounded-lg"
        disabledClassName="opacity-50"
      />
  )
}

export default Pagination