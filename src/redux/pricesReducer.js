import { getTypeNameById } from '../services/types.js';
import { getLocationNameById } from '../services/locations.js';

const initialState = {
    prices: [],
    isLoading: false
}

export const ActionTypes = {
    SET_PRICES: 'SET_PRICES',
    DELETE_PRICE: 'DELETE_PRICE',
    NEW_PRICE: 'NEW_PRICE',
    EDIT_PRICE: 'EDIT_PRICE',
    FETCH_PRICES: 'FETCH_PRICES',
}

export const ActionCreators = {
    setPrices: payload => ({ type: ActionTypes.SET_PRICES, payload }),
    deletePrice: payload => ({ type: ActionTypes.DELETE_PRICE, payload }),
    newPrice: payload => ({ type: ActionTypes.NEW_PRICE, payload }),
    editPrice: payload => ({ type: ActionTypes.EDIT_PRICE, payload }),
    fetchPrices: () => ({ type: ActionTypes.FETCH_PRICES })
}

export default function PricesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_PRICES:
            return { ...state, prices: [...action.payload], isLoading: false }
        case ActionTypes.DELETE_PRICE:
            return { ...state, prices: [...state.prices.filter(p => p.id !== action.payload)] }
        case ActionTypes.NEW_PRICE:
            return { ...state, prices: [...state.prices, action.payload] }
        case ActionTypes.EDIT_PRICE:
            return {
                ...state,
                prices: state.prices.map(price =>
                    price.id === action.payload.id ?
                        { ...price, value: action.payload.value } :
                        price
                )
            };
        case ActionTypes.FETCH_PRICES:
            return { ...state, isLoading: true }
        default:
            return state

    }
}