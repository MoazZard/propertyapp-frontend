import React, { useState } from "react"

// Data is all the properties in an array, setFilteredData is a state variable from the parent component
const PropertyFilter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedPropertyType = e.target.value
        setFilter(selectedPropertyType)

        // display based on propertyType selected
        const filteredProperties = data.filter((property) =>
            property
                .propertyType
                .toLowerCase()
                .include(selectedPropertyType.toLowerCase())
        )
        setFilteredData(filteredProperties)
    }

    // Button to clear the filter
    const clearFilter = () => {
        setFilter("")
        setFilteredData(data) // filtered data is all data from database
    }

    /* for every PROPERTY in data, make a new array with PROPERTY.PROPERTYTYPE */
    // mapping, extract unique pt from data (map creates new array,new Set removes duplicates, ...turns it into array) 
    const uniquePropertyTypes = ["", ...new Set(data.map((property) => property.propertyType))] 

    return (
        <div className="input-group mb-3">

            <span className="input-group-text" id="property-type-filter">
                Filter properties by type
            </span>

            <select className="form-select" value={filter} onChange={handleSelectChange}>
                <option value={""}> Select a property type to filter.. </option>
                {uniquePropertyTypes.map((propertyType, index) => (
                    <option key={index} value={propertyType}>
                        {propertyType}
                    </option>
                ))}
            </select>

            <button className="btn btn-hotel" type="button" onClick={clearFilter}>Clear Filter</button>
        </div> // type="button", not submit or reset and performs no default action.
    )
}

export default PropertyFilter;