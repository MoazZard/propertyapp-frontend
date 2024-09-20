import React, { useEffect, useState } from 'react'
import { getPropertyTypes } from '../utils/ApiFunctions'

// Select component, populated with all propertyTypes from database. If new propertyType needs to be added,
// you will be given the option
const PropertyTypeSelector = ({ handlePropertyInputChange, newProperty }) => {
    const [propertyTypes, setPropertyTypes] = useState([""])
    const [showNewPropertyTypeInput, setShowNewPropertyTypeInput] = useState(false) // hidden by default
    const [newPropertyType, setNewPropertyType] = useState("")

    {/* INITIALIZES PROPERTYTYPES ARRAY WITH TYPES FROM BACKEND */ }
    useEffect(() => { //reacthook runs after component renders since array dependency is empty
        getPropertyTypes().then((data) => { //.then() arrow function runs after a promise is fulfilled from getPropTypes
            setPropertyTypes(data)
        })
    }, []) //array dependency 

    const handleNewPropTypeInputChange = (e) => {
        setNewPropertyType(e.target.value)
    }

    // adds new propertyType
    const handleAddNewPropertyType = () => {
        if (newPropertyType !== "") {
            // newPropertyType is added to propertyTypes state array
            setPropertyTypes([
                ...propertyTypes,
                newPropertyType
            ])
            setNewPropertyType("")
            setShowNewPropertyTypeInput(false)
        }
    }

    return (
        <>
            {propertyTypes.length > 0 && ( // IF THERE ARE PROPERTY TYPES, SHOW THEM
                <div>
                    <select required className='form-select' name='propertyType'
                        value={newProperty.propertyType} onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewPropertyTypeInput(true) // if you're adding a new propertytype
                            } else {
                                handlePropertyInputChange(e) // changing propertytype
                            }
                        }}>
                        <option value={""}>select a property type</option>
                        <option value={"Add New"}>Add New</option>
                        {propertyTypes.map((type, index) => ( // shows all of the propertyTypes from data
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>


                    {showNewPropertyTypeInput && (
                        <div className='mt-2'>
                            {/* Input group with form-control makes input have nice design */}
                            <div className='input-group'>
                                <input className='form-control' type='text' value={newPropertyType} // was an unregistered error
                                    placeholder='Enter a new property type' onChange={handleNewPropTypeInputChange} />
                                <button className='btn btn-hotel' type='button' onClick={handleAddNewPropertyType}>Add</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default PropertyTypeSelector

// NewPropertyType is updated whenever input changes, when you submit/click the handleAddNewPropertyType handler adds newPropertyType
// as a propertyType