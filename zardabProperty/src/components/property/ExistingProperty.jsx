import React, { useEffect, useState } from "react";
import { getAllProperties, deleteProperty } from "../utils/ApiFunctions"
import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';
import PropertyFilter from "../common/PropertyFilter";
import PropertyPaginator from "../common/PropertyPaginator";
import { FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom";



const ExistingProperty = () => {
    const [properties, setProperties] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filteredProperties, setFilteredProperty] = useState([])
    const [selectedPropertyType, setSelectedPropertyType] = useState("")

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1)
    const [propsPerPage] = useState(8) // Not updating this

    /* Success and error messages */
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    /* Functions */
    const fetchProperties = async () => {
        setIsLoading(true);
        try {
            const result = await getAllProperties();
            setProperties(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    /* UseEffect (Manages what properties are to be displayed) */
    useEffect(() => { // effect that acquires all of the properties using api
        fetchProperties();
    }, []); // Only run once on component mount (no dependencies here)

    // A separate effect for filtering based on selectedPropertyType
    useEffect(() => {
        if (selectedPropertyType === "") {
            setFilteredProperty(properties);
        } else {
            const filtered = properties.filter(
                (property) => property.propertyType === selectedPropertyType
            );
            setFilteredProperty(filtered);
        }
        setCurrentPage(1);
    }, [selectedPropertyType, properties]); // only runs when either selectedPropertyType or properties change 


    /* Managing all pages */
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = (filteredProperties, propsPerPage, properties) => {
        const totalProperties = filteredProperties.length > 0 ? filteredProperties.length : properties.length
        const totalPageAmount = Math.ceil(totalProperties / propsPerPage)
        return totalPageAmount
    }

    const indexOfLastProperty = currentPage * propsPerPage
    const indexOfFirstProperty = indexOfLastProperty - propsPerPage
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty) // examples first = 10, last = 20 then current = 10-19

    const handleDelete = async (e) => {
        let propertyId = e.target.getAttribute("propertyid")
        try {
            const success = await deleteProperty(propertyId)
            if (success !== undefined) {
                setSuccessMessage(`Successfully deleted property with id: ${propertyId}`)
                fetchProperties();
            }
        } catch (error) {
            setErrorMessage(`Error deleting property: ${propertyId}`)
        }
        setTimeout(() => {
            setErrorMessage("")
            setSuccessMessage("")
        }, 3000);
    }


    return (
        <>
            {isLoading ? (<Spinner animation="border" variant="primary" />) :
                <>

                    <section className="mt-5 mb-5 container">
                        <div className="d-flex flex-column justify-content-center mb-3 mt-5"> {/* Default flex direction is row, changed to column */}
                            <h2>Existing Properties</h2>

                            {/* Alerts */}
                            {successMessage && <div className="alert alert-success fade show"> {successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                            <Col md={6} className="mb-3 mb-md-0">
                                <PropertyFilter data={properties} setFilteredData={setFilteredProperty} />
                            </Col>

                            {/* Render the table only if there are properties */}
                            {currentProperties.length > 0 ? (
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr className="text-center">
                                            <th>ID</th>
                                            <th>Property Type</th>
                                            <th>Property Price</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentProperties.map((property) => (
                                            <tr key={property.id} className="text-center">
                                                <td>{property.id}</td>
                                                <td>{property.propertyType}</td>
                                                <td>{property.propertyPrice}</td>
                                                <td>
                                                    <Link to={`/edit-property/${property.id}`}>View / Edit</Link> {/* Makes a UI visible for editing the property for update */}
                                                    <button className="btn btn-danger btn-sm" onClick={handleDelete} propertyid={property.id}>
                                                        <FaTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No properties found.</p> // Show a message if no properties are available
                            )}

                            <PropertyPaginator
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                totalPages={totalPages(filteredProperties, propsPerPage, properties)}
                            />
                        </div>
                    </section>

                </>
            }
        </>
    )
}

export default ExistingProperty;