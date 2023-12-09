// BestFuelPriceFillUpModal.js
import React, { useState } from 'react';

const BestFuelPriceFillUpModal = ({ locations, onClose }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [fillAmount, setFillAmount] = useState(0);

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    const handleFillAmountChange = (event) => {
        setFillAmount(event.target.value);
    };

    const handleFinishFillUp = () => {
        // Implement logic to handle filling up and calculate cost savings
        // ...
        onClose(); // Close the modal after the fill up is finished
    };

    return (
        <div className="best-fuel-price-fill-up-modal">
            <h2>Fuel Prices at Different Locations</h2>
            {locations && locations.map((location) => (
                <div key={location.id}>
                    <p>{`Location: ${location.name}, Price: ${location.price}`}</p>
                    <button onClick={() => handleLocationSelect(location)}>
                        Select this location
                    </button>
                </div>
            ))}

            {selectedLocation && (
                <div>
                    <h3>Selected Location: {selectedLocation.name}</h3>
                    <p>{`Price: ${selectedLocation.price}`}</p>
                    <label>
                        Fill Amount (in liters):
                        <input type="number" value={fillAmount} onChange={handleFillAmountChange} />
                    </label>
                    <button onClick={handleFinishFillUp}>Finish Fill Up</button>
                </div>
            )}
        </div>
    );
};

export default BestFuelPriceFillUpModal;