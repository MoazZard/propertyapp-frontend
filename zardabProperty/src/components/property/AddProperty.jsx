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
    // Error/Success messages managers
    const [successMessage, setSuccessMessage] = useState("")
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
        setImagePreview(URL.createObjectURL(selectedImage)) //imagePreview becomes the image URL
    }

    // handles submit event and calls addProperty function from ApiFunctions
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addProperty(newProperty.photo, newProperty.propertyType, newProperty.propertyPrice)
            if (success !== undefined) {
                setSuccessMessage("A new property has been added to the database.")
                setNewProperty({
                    photo: null,
                    propertyType: "",
                    propertyPrice: ""
                })
                setImagePreview("")
                setErrorMessage("")
            }
            else {
                setErrorMessage("Error adding property to database")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    // UI
    return (
        <>
            <section className="container, mt-5 mb-5">
                <div className="row justify-content-centre">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Property</h2>


                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="propertyType" className="form-label">
                                    Property Type
                                </label>
                                <div></div> 
                            </div>

                            <div className="mb-3">
                                <label htmlFor="propertyPrice" className="form-label">
                                    Property Price
                                </label>
                                <input className="form-control" required id="propertyPrice" type="number"
                                    name="propertyPrice" value={newProperty.propertyPrice} onChange={handlePropertyInputChange} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Property Photo
                                </label>
                                <input id="photo" name="photo" type="file"
                                    className="form-control" onChange={handleImageChange} />

                                {/* if imagepreview isnt null, present the image */}
                                {imagePreview && (<img src={imagePreview} alt="Property Preview Photo" //imageprev changed in handleImageChange
                                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    className="mb-3" />)}
                            </div>

                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">Save Property</button>
                            </div>
                        </form>


                    </div>
                </div>
            </section>
        </>
    );
}

export default AddProperty;