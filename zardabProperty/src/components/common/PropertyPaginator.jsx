import React from "react";
import PropertyFilter from "./PropertyFilter";

const PropertyPaginator = ({ currentPage, totalPages, onPageChange }) => {

    // generate page numbers based on length of result from backend
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    /*
    The second parameter of Array.from() is a mapping function that receives two arguments: 
    the current value (which is _ because it's not used) and the index (i).
    This function returns the page number (i + 1), which transforms the array of indices
    into actual page numbers starting from 1.
    */

    return (
        <>
            <nav>
                <ul className="pagination justify-content-center">

                    {pageNumbers.map((pageNumber) => (
                        /* className is dynamically set based on current page using Template Literals (embeds expressions into String literals) */
                        <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                            <button className="page-link" onClick={() => onPageChange(pageNumber)}> {pageNumber} </button>
                        </li>
                    ))}

                </ul>
            </nav>
        </>
    )
}

export default PropertyPaginator;