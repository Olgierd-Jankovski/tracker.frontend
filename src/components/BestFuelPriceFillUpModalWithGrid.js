// BestFuelPriceFillUpModalWithGrid.js
import React, { useState, useEffect } from 'react';
import { calculateSavings, renderSavingsColor } from '../utils/fuelSavingsUtils.tsx';
import { CreateExpense } from '../services/expenses';
import { CreateSaving } from '../services/savings';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './styles/BestFuelPriceFillUpModalWithGrid.css';

const BestFuelPriceFillUpModalWithGrid = ({ locations, onClose, averagePrice, fuelTypeId }) => {
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

        if (fillAmount >= 0) {
            const expenseAmount = selectedLocation.price * fillAmount;
            const savingAmount = calculateSavings(selectedLocation, fillAmount, averagePrice);

            try {
                // TO-DO: implement logic for passing typeIds (they are absent in the current implementation)
                CreateExpense({ amount: expenseAmount, typeId: fuelTypeId });
                CreateSaving({ amount: savingAmount, typeId: fuelTypeId });
            } catch (error) {
                console.log("Error creating expense or saving: ", error);
            }
        }

        // Close the modal after the fill up is finished
        onClose();
    };

    useEffect(() => {
        // Select the first location as initial selection when the modal is opened
        if (locations && locations.length > 0) {
            setSelectedLocation(locations[0]);
        }
    }, [locations]);

    const savings = calculateSavings(selectedLocation, fillAmount, averagePrice);
    const savingsColor = renderSavingsColor(savings);

    return (
        <Modal show={true} onHide={onClose} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Fuel Prices at Different Locations</Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    {selectedLocation && (
                        <Row>
                            <Col>
                                <h3>Selected Location: {selectedLocation.name}</h3>
                                <p>{`Price: ${selectedLocation.price}`}</p>
                                <p style={{ color: savingsColor }}>{`You will save: ${savings === 'N/A' ? 'N/A' : `${savings.toFixed(2)}`}`}</p>
                            </Col>
                            <Col className='d-flex flex-column align-items-center'>
                                <label>
                                    Fill Amount (in liters):
                                    <input type="number" value={fillAmount} onChange={handleFillAmountChange} className='form-control' />
                                </label>
                                <button onClick={handleFinishFillUp} className='btn btn-primary mt-3'>Finish Fill Up</button>
                            </Col>
                        </Row>
                    )}
                    {locations && locations.map((location) => (
                        <Row
                            key={location.id}
                            className={`location-row ${selectedLocation && selectedLocation.id === location.id ? 'selected' : ''}`}
                            onClick={() => handleLocationSelect(location)}
                        >
                            <Col>
                                <p>{`Location: ${location.name}`}</p>
                            </Col>
                            <Col>
                                <p>{`Price: ${location.price}`}</p>
                                {(() => {
                                    const savings = calculateSavings(location, 1, averagePrice);
                                    const savingsColor = renderSavingsColor(savings);
                                    return (
                                        <p style={{ color: savingsColor }}>
                                            {`Profit/Loss per Liter: ${savings.toFixed(2)}`}
                                        </p>
                                    );
                                })()}
                            </Col>
                        </Row>
                    ))}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

};

export default BestFuelPriceFillUpModalWithGrid;




/* return (
        <div className="best-fuel-price-fill-up-modal-with-grid">
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
    ); */