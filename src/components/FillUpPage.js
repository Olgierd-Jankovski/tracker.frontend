import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetPrices } from '../services/prices';
import './styles/FillUpPage.css';
import BestFuelPriceFillUpModalWithGrid from './BestFuelPriceFillUpModalWithGrid';

const calculateAverage = (prices) => {
    if (prices.length === 0) {
        return 'N/A';
    }

    const sum = prices.reduce((acc, price) => acc + price, 0);
    return (sum / prices.length).toFixed(2);
};

const FuelType = ({ type, typeId, averagePrice, onSelect, onHover, isSelected }) => {
    return (
        <div
            className={`fuel-type ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(type)}
            onMouseEnter={() => onHover(type)}
        // render additional information if needed
        >
            <h3>{type}</h3>
            <p>{`Average Price: ${averagePrice}`}</p>
        </div>
    );
};

const FillUpPage = () => {
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [averagePrices, setAveragePrices] = useState({}); // Store the average prices
    const [fuelTypes, setFuelTypes] = useState([]); // Store the fuel types
    const pricesData = useSelector(state => state.pricesReducer.prices);

    // Calculate the average prices when the component is mounted
    useEffect(() => {
        const calculateAveragePrices = () => {
            const prices = {};
            fuelTypes.forEach((fuel) => {
                prices[fuel.type] = calculateAverage(fuel.prices);
            });
            setAveragePrices(prices);
        };

        calculateAveragePrices();
    }, [fuelTypes]); // (memoized)Now, fuelTypes is part of the dependency array, and it won't trigger unnecessary renders


    const renderFuelTypes = () => {
        return fuelTypes.map((fuel) => (
            <div key={fuel.type} className="fuel-type">
                <FuelType
                    type={fuel.type}
                    typeId={fuel.typeId}
                    averagePrice={averagePrices[fuel.type]}
                    locations={fuel.locations}
                    // print locations
                    onSelect={handleFuelTypeSelect}
                    onHover={handleFuelTypeHover}
                    isSelected={selectedFuelType === fuel.type}
                />
            </div>
        ));
    };

    const handleFuelTypeHover = (fuelType) => {
        // Add logic for handling hover events
        console.log(`Hovering over ${fuelType}`);
    };

    const handleFuelTypeSelect = (selectedType) => {
        setSelectedFuelType(selectedType);

        // Pop up the modal
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedFuelType(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Dispatch the action to fetch the prices
                await GetPrices(dispatch);

            } catch (error) {
                console.log("Error in fetchData: ", error);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        //Extract unique fuel types from the prices Data
        const uniqueFuelTypes = [...new Set(pricesData.map(price => price.FuelType))];

        // Create a new array of fuel types with prices list
        const updatedFuelTypes = uniqueFuelTypes.map(fuelType => {
            const pricesForFuelType = pricesData.filter(price => price.FuelType === fuelType);
            const prices = pricesForFuelType.map(price => price.value);

            // we can modify this logic based on our actual data structure
            return {
                type: fuelType,
                fuelTypeId: pricesData.find(price => price.FuelType === fuelType).typeId,
                prices: prices,
                locations: pricesForFuelType.map(price => ({
                    id: price.id,
                    name: price.Location,
                    price: price.value.toFixed(2),
                })),
            };
        });

        setFuelTypes(updatedFuelTypes);
    }, [pricesData]);


    return (
        <div className="fill-up-page">
            <div className="info-column">
                <p>Want to fill the gas tank? Select a fuel type.</p>
            </div>
            <div className="fuel-types">{renderFuelTypes()}</div>
            {isModalOpen && (
                <BestFuelPriceFillUpModalWithGrid
                    locations={fuelTypes.find(fuel => fuel.type === selectedFuelType).locations}
                    onClose={handleModalClose}
                    averagePrice={averagePrices[selectedFuelType]}
                    fuelTypeId={fuelTypes.find(fuel => fuel.type === selectedFuelType).fuelTypeId}
                />
            )}
        </div>
    );
};

export default FillUpPage;
