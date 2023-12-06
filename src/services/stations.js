import axios from 'axios';
import { getLocations } from './locations';
import { dropdownOptions } from '../components/FilterDropdown';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Stations`,
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization= 'Bearer ' + sessionStorage.getItem('token');
    return config;
})

export const getStationNames = async () => {
    try {
        const response = await axiosInstance.get();
        return response.data;
    }
    catch {
        console.log("Error in getStationNames");
    }
}

export const getStationNamesById = async (StationId) => {
    try {
        const response = await axiosInstance.get(`/$StationId`);
        return response.data;
    }
    catch {
        console.log("Error in getStationNamesById");
    }
}

export const getStationsWithLocations = async () => {
    try {
        return new Promise(async (resolve, reject) => {
            // do not set timeouts, this is real api call
            console.log("Calling a Fetching station data func...");
            //const locations = await getLocations();
            //const stations = await getStationNames();
            //Run getLocations and getStationNames in parallel
            const [locations, stations] = await Promise.all([getLocations(), getStationNames()]);

            // the station data should be in the format:
            /* 
                'Neste': ['Gelezinio Vilko g. 37A'],
                'Circle K': ['Kedru g. 2'],
            */
            const stationData = {};
            stations.forEach(station => {
                const locationNames = locations
                    .filter(location => location.stationId === station.id).
                    map(location => location.address);
                stationData[station.name] = locationNames;
            });
            resolve(stationData);
        });
    }
    catch (error) {
        console.log("Error in getLocationNamesByStationName: ", error);
    }
};