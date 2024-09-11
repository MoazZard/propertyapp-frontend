import axios from "axios";

//Base url for application
export const api = axios.create({
    baseURL: "http://localhost:8080"
})


// function to add a new property into the database
export async function addProperty(photo, propertyType, propertyPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("propertyType", propertyType);
    formData.append("propertyPrice", propertyPrice);

    const response = await api.post("/properties/add/new-property", formData) // send this data to backend (endpoint in backend)
    // append the formdata to the backend

    if (response.status === 201) {
        return true;
    }
    else {
        return false;
    }
}



// function to return all roomtypes from the database
export async function getPropertyTypes() {
    try {
        const response = await api.get("/properties/property-types");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching property types");
    }
}