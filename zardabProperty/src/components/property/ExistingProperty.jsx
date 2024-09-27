import React, { useEffect, useState } from "react";
import { getAllProperties } from "../utils/ApiFunctions"


const ExistingProperty = () => {
    const[properties, setProperties] = useState([])
    const[isLoading, setIsLoading] = useState(false)
    const[filteredProperties, setFilteredProperty] = useState([])
    const[selectedPropertyType, setSelectedPropertyType] = useState("")

    /* Pagination */
    const[currentPage, setCurrentPage] = useState(1)
    const[propsPerPage] = useState(8) // Not updating this
    
    /* Success and error messages */
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    /* Functions */
    const fetchProperties = async() =>{
        setIsLoading(true)
        try {
            const result = await getAllProperties()
            setProperties(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = (filteredProperties, propsPerPage, properties) => {
        const totalProperties = filteredProperties.length > 0 ? filteredProperties.length : properties.length
        const totalPageAmount = Math.ceil(totalProperties / propsPerPage)
    }

    const indexOfLastProperty = currentPage * propsPerPage // examples first = 10, last = 20 then current = 10-19
    const indexOfFirstProperty = indexOfLastProperty - propsPerPage
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)


    /* UseEffect (Manages what properties are displayed) */
    useEffect(() => {
        fetchProperties()
        if(selectedPropertyType === ""){ // if no selectedPropertyType, all properties are displayed 
            setFilteredProperty(properties)
        }else{ // creating new array with properties that match filter
            const filtered = properties.filter((property) => property.propertyType === selectedPropertyType)
            setFilteredProperty(filtered)
        }
        setCurrentPage(1)
    }, [properties, selectedPropertyType]) // Useeffect only called when these dependencies are changed

    
    return (
        <>
        {isLoading ? (<p>Loading Existing Properties..</p>) : <p>Existing Properties</p>}
        </>
    )
}

export default ExistingProperty;