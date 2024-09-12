import React, { useState } from "react"
import { addProperty } from "../utils/ApiFunctions" // Submit event handler uses this


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


    // Event handler for dynamically updates the state of the form fields in real time as the user enters data.
    const handlePropertyInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value // e is an object, and target it the element that triggered the event

        if (name === "propertyPrice") { // checks if the input field is "propertyPrice"
            if (!isNaN(value)) {
                value.parseInt(value) // if value is number, attempt to convert it into integer from string
            }
            else {
                value = "" // if value isnt number, set it to an empty string
            }
        }
        setNewProperty({
            ...newProperty, // ... is the spread operator to copy fields from newProperty state
            [name]: value // Update the specific field (name refers to the input name, and value is what user entered)
        })
    }


    // image preview and selected function event handler
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewProperty({
            ...newProperty,
            photo: selectedImage
        })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    // handles submit event and calls addProperty function from ApiFunctions
    const handleSubmit = async(e) => { 
        e.preventDefault()
        try{
            const success = await addProperty(newProperty.photo, newProperty.propertyType, newProperty.propertyPrice)
        }catch(error){
            setErrorMessage(error.message)
        }
    }


    return (
        <div>

        </div>
    );
}

export default AddProperty;