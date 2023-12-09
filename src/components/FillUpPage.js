import React, { useState, useEffect } from 'react';
import './styles/FillUpPage.css';
import BestFuelPriceFillUpModal from './BestFuelPriceFillUpModal';

const calculateAverage = (prices) => {
    if (prices.length === 0) {
        return 'N/A';
    }

    const sum = prices.reduce((acc, price) => acc + price, 0);
    return (sum / prices.length).toFixed(2);
};

const FuelType = ({ type, prices, onSelect, onHover, isSelected }) => {
    return (
        <div
            className={`fuel-type ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(type)}
            onMouseEnter={() => onHover(type)}
        // render additional information if needed
        >
            <h3>{type}</h3>
            <p>{`Average Price: ${calculateAverage(prices)}`}</p>
        </div>
    );
};

const FillUpPage = () => {
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fuelTypes = [
        {
            type: '95', prices: [2.50, 2.60, 2.70], locations: [
                { id: 1, name: "Zirmunu g. 1", price: 2.50 },
                { id: 2, name: "Pylimo g. 2", price: 2.60 },
                { id: 3, name: "Vilties g. 3", price: 2.70 }
            ]
        },
        {
            type: '98', prices: [3.50, 3.60, 3.70], locations: [
                { id: 1, name: "Zirmunu g. 1", price: 3.50 },
                { id: 2, name: "Pylimo g. 2", price: 3.60 },
                { id: 3, name: "Vilties g. 3", price: 3.70 }
            ]
        },
        {
            type: 'Diesel', prices: [4.20, 4.30, 4.40], locations: [
                { id: 1, name: "Zirmunu g. 1", price: 4.20 },
                { id: 2, name: "Pylimo g. 2", price: 4.30 },
                { id: 3, name: "Vilties g. 3", price: 4.40 }
            ]
        },
    ];

    const renderFuelTypes = () => {
        return fuelTypes.map((fuel) => (
            <div key={fuel.type} className="fuel-type">
                <FuelType
                    type={fuel.type}
                    prices={fuel.prices}
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
        // Clear any selected fuel type or reset other relevant store
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedFuelType(null);
    };

   /*  // Add logic for handling clicks outside of the fuel types container
    // to deselect the selected fuel type
    useEffect(() => {
        const handleContainerClick = (event) => {
            const fuelTypesContainer = document.querySelector('.fuel-types');
            const isInsideContainer = fuelTypesContainer && fuelTypesContainer.contains(event.target);

            if (!isInsideContainer && selectedFuelType !== null) {
                setSelectedFuelType(null);
            }
        };

        document.addEventListener('mousedown', handleContainerClick);

        return () => {
            document.removeEventListener('mousedown', handleContainerClick);
        };
    }, [selectedFuelType]); */


    return (
        <div className="fill-up-page">
            <div className="info-column">
                <p>Want to fill the gas tank? Select a fuel type.</p>
            </div>
            <div className="fuel-types">{renderFuelTypes()}</div>
            {isModalOpen && (
                <BestFuelPriceFillUpModal
                    locations={fuelTypes.find(fuel => fuel.type === selectedFuelType).locations}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default FillUpPage;
