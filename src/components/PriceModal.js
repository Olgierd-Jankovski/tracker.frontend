import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import { EditPrice, NewPrice } from '../services/prices';



export const NewPriceModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className='btn btn-success'>New Price</Button>
        <PriceModal price={null} handleFormSubmit={NewPrice} show={show} handleClose={handleClose} />
    </div>
}

export const EditPriceModal = ({ price }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <div>
        <Button onClick={handleShow} className='btn btn-warning'>Edit</Button>
        <PriceModal price={price} handleFormSubmit={(dispatch, newValue) => EditPrice(dispatch, price, newValue)} show={show} handleClose={handleClose} />
    </div>
}

const PriceModal = ({ price, handleFormSubmit, show, handleClose }) => {
    const [modalPrice, setModalPrice] = useState('');
    const [isValidPrice, setIsValidPrice] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (price && price.value)
            setModalPrice(price.value);
    }, [price]);

    const validatePrice = (value) => {
        const pricePattern = /^\d\.\d{3}$/; // regex pattern for price validation // sample: 1.000
        setIsValidPrice(pricePattern.test(value));
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Form onSubmit={event => {
                event.preventDefault();
                if(isValidPrice) {
                    handleFormSubmit(dispatch, modalPrice);
                    handleClose();
                }
                else {
                    alert('Invalid price format! Please enter a price in the format "1.000".');
                }
            }}>
                <Modal.Body> 
                    <InputGroup>
                        <FormControl value={modalPrice === null ? '' : modalPrice}
                            onChange={event => {
                                setModalPrice(event.target.value);
                                validatePrice(event.target.value);
                                }} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}