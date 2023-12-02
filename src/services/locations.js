import axios from 'axios';

const axiosInstance = axios.create({
    // here is my example call: https://localhost:7242/Locations/2
    baseURL: 'https://localhost:7242/Locations',
})

export const getLocationNameById = async (LocationId) => {
    try
    {
        const response = await axiosInstance.get(`/${LocationId}`);
        return response.data.address;

    } catch{
        // check is the LocationId is null or undefined
        if (LocationId === null || LocationId === undefined) {
            console.log("LocationId is null or undefined");
        }
        else
        {
            console.log("LocationId is VALID: " + LocationId);
        }
        
        console.log("Error in getLocationNameById");
    }

}

//get all locations
export const getLocations = async () => {
    try {
        const response = await axiosInstance.get();
        return response.data;
    }
    catch {
        console.log("Error in getLocations");
    }
}