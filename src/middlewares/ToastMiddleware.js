//import { newPrice, editPrice, deletePrice } from '../redux/pricesReducer.js';
import { ActionTypes } from '../redux/pricesReducer.js';
import { toast } from 'react-toastify';
import store from '../redux/store.js';

const ToastMiddleware = () => next => action => {
    switch (action.type) {
        case ActionTypes.SET_PRICES:
            toast.success('Prices loaded successfully');
            break;
        case ActionTypes.DELETE_PRICE:
            toast.success('New Price added successfully');
            break;
        case ActionTypes.NEW_PRICE:
            toast.success('Selected Price edited successfully');
            break;
        case ActionTypes.EDIT_PRICE:
            toast.success('Selected Price deleted successfully');
            break;
        default:
            break;
    }

    return next(action);
}

export default ToastMiddleware;