import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeletePrice, GetPrices } from '../services/prices';
import { EditPriceModal } from './PriceModal';
import { ConfirmationModal } from './ConfirmationModal';
import { formatTimeAgo } from '../utils/dateTimeUtils';
import { getStationsWithLocations } from '../services/stations';


export const PricesTable = ({ selectedStation, selectedFuelType }) => {
    const prices = useSelector(state => state.pricesReducer.prices);
    const isLoading = useSelector(state => state.pricesReducer.isLoading);
    const dispatch = useDispatch();
    const [stationData, setStationData] = useState(null);
    const [initialFetchComplete, setInitialFetchComplete] = useState(false);


    // the reason we are using renderFormattedDate function is to keep the rendering logic  seperated from the utility function
    const renderFormattedDate = (timestamp) => {
        const formattedDate = formatTimeAgo(timestamp);
        return <span>{formattedDate}</span>
    };

    // This is a dummy function that simulates a call to the backend
    // it has been created to test the filtering functionality, taking into account async, await and promises (and correctly design the render logic)
    const fooGetStationData = async () => {
        console.log("Getting station data...");
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const stationData = {
                    'Neste': ['Gelezinio Vilko g. 37A'],
                    'Circle K': ['Kedru g. 2'],
                };
                resolve(stationData);
                console.log("Station data retrieved successfully");
            }, 3000);
        });
    }


    const fooFilterByLocation = (price) => {
        if (!initialFetchComplete) {
            // Skip filtering initially
            return true;
        }

        if (selectedStation === 'All' || selectedStation === '' || selectedStation === undefined) {
            console.log("no station selected");
            return true;
        }

        //const stationData = fooGetStationData();
        const locationsForSelectedStation = stationData[selectedStation];

        if (locationsForSelectedStation) {
            // Check if the price's location is among the extracted location names
            if (locationsForSelectedStation.includes(price.Location))
                console.log("location found: ", price.Location);
            return locationsForSelectedStation.includes(price.Location);
        } else {
            console.log("Unknown station:", selectedStation);
            return false;
        }

    }

    const filteredPrices = prices.filter((p) => {
        // log selectedStation
        return (
            ((selectedStation === 'All' || selectedStation === '') || fooFilterByLocation(p)) &&
            (selectedFuelType === 'All' || p.FuelType === selectedFuelType || selectedFuelType === '')
            //filterByLocation(p)
        );
    });

    // this is a side effect that will be executed only once after the component is mounted
    // it is seperated from the main useEffect hook because we don't want to re-fetch the data. only initially
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const data = await fooGetStationData();
                const data = await getStationsWithLocations();
                setStationData(data);
                setInitialFetchComplete(true);
            }
            catch (error) {
                console.log("Error in fetchData: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        GetPrices(dispatch);
    }, [dispatch]);

    return <table className='table table-dark'>
        <tbody>
            {isLoading ? (
                <tr>
                    <td>Loading...</td>
                </tr>
            ) : filteredPrices.length === 0 ? (
                <tr>
                    <td colSpan="6">No Matching priced found</td>
                </tr>

            ) : (

                filteredPrices.map((p) => (
                    <tr key={p.id}>
                        <td style={{ width: '3rem' }}>
                            <EditPriceModal price={p} />
                        </td>
                        <td style={{ width: '3rem' }}>
                            <ConfirmationModal price={p} />
                        </td>
                        <td style={{ textAlign: 'left' }}>{p.value}</td>
                        <td style={{ textAlign: 'left' }}>{p.FuelType}</td>
                        <td style={{ textAlign: 'left' }}>{p.Location}</td>
                        <td style={{ textAlign: 'left' }}>{renderFormattedDate(p.date)}</td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
}