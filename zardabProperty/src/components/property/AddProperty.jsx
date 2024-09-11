import React, { useState } from "react"


const AddProperty = () => {
    // State variables
    const [newProperty, setNewProperty] = useState({
        photo: null,
        propertyType: "",
        propertyPrice: ""
    })

    // Image preview 
    const [imagePreview, setImagePreview] = useState("")
    // Error messages managers
    const [successMessage, setSuccesMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    // Event handler for dynamically updating input
    const handlePropertyInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value

        if (name === "propertyPrice") { // checks if the input field is "propertyPrice"
            if (!isNaN(value)) {
                value.parseInt(value) // if value is number, attempt to convert it into integer from string
            }
            else {
                value = "" // if value isnt number, set it to an empty string
            }
        }
        setNewProperty({
            ...newProperty,
            [name]: value // Update the specific field (name refers to the input name, and value is what user entered)
        })
    }


    return (
        <div>

        </div>
    );
}

export default AddProperty;