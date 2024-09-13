import React, { useEffect, useState } from 'react'

// Select component, populated with all propertyTypes from database. If new propertyType needs to be added,
// you will be given the option
const PropertyTypeSelector = () => {
    const[PropertyTypes, setPropertyTypes] = useState([])
    const[showNewPropertyTypeInput, setShowNewPropertyTypeInput] = useState(false) // hidden by default
    const[newPropertyType, setNewPropertyType] = useState("")

    useEffect(() => {
        
    })

    return (
        <div>

        </div>
    )
}

export default PropertyTypeSelector