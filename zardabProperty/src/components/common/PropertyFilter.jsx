import React, { useState } from "react"

const PropertyFilter = ({data, setFilteredData}) => {
    const[filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedPropertyType = e.target.value
        setFilter(selectedPropertyType)
        const filteredProperties = data.filter((property) => property.propertyType.toLowerCase().include) // display based on propertyType selected
    }   

    return (
        <div>

        </div>
    )
}

export default PropertyFilter;