import { ActionCreators } from '../redux/pricesReducer'
import { getLocationNameById } from './locations';
import { getTypeNameById } from './types';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Prices`,
})

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization= 'Bearer ' + sessionStorage.getItem('token');
    return config;
})

export const GetPrices = async (dispatch) => {
    try {
        // api call
        dispatch(ActionCreators.fetchPrices());

        axiosInstance.get()
            .then(async response => {
                const formattedPrices = await formatPrices(response.data);
                //console.log(formattedPrices);
                dispatch(ActionCreators.setPrices(formattedPrices));
            })
            .catch(error => {
                console.log(error);
            })
    }
    catch {
        console.log("Error in GetPrices");
    }
}

const formatPrices = async (prices) => {

    const formattedPrices = await Promise.all(
        prices.map(async ({ id, value, typeId, locationId, date }) => {
            try {
                const fuelType = await getTypeNameById(typeId);
                const location = await getLocationNameById(locationId);

                return {
                    id,
                    value,
                    FuelType: fuelType,
                    Location: location,
                    date,
                };
            }
            catch (error) {
                console.log('Error in formatPrices: ', error);
                return {
                    id,
                    value,
                    FuelType: 'Unknown',
                    Location: 'Unknown',
                    date,
                }
            }
        })
    );

    return formattedPrices;
}

export const DeletePrice = async (dispatch, priceId) => {
    try {
        // api call
        console.log("body: "+ priceId); // no need to delete from db
        dispatch(ActionCreators.deletePrice(priceId));
    }
    catch {
        console.log("Error in DeletePrice");
    }
}

export const NewPrice = async (dispatch, price) => {
    try {
        // api call
        const response = { value: price, id: 1 }
        dispatch(ActionCreators.newPrice(response));
    }
    catch {
        console.log("Error in NewPrice");
    }
}

export const EditPrice = async (dispatch, price, newValue) => {
    try {
        // api call
        //console.log(price);
        //const response = { value: newValue, id: 2, }
        //dispatch(ActionCreators.editPrice(response));

        //create on put request object

        const putRequest = {
            id: price.id,
            value: newValue,
            locationId: 0,
            typeId: 0,
            date: new Date().toISOString(),
            location: { id: 0, stationId: 0, address: "string", station: { id: 0, name: "string" } },
            type: { id: 0, name: "string" }
        };

        console.log(putRequest);

        await axiosInstance.put('', putRequest);

        dispatch(ActionCreators.editPrice(putRequest));
    }
    catch {
        console.log("Error in EditPrice");
    }
}