const initialState = {
    expenseAmountPerCategory: [],
    savingAmountPerCategory: [],
}

export const ActionTypes = {
    SET_EXPENSE_AMOUNT_PER_CATEGORY: 'SET_EXPENSE_AMOUNT_PER_CATEGORY',
    SET_SAVING_AMOUNT_PER_CATEGORY: 'SET_SAVING_AMOUNT_PER_CATEGORY',
}

export const ActionCreators = {
    setExpenseAmountPerCategory: payload => ({ type: ActionTypes.SET_EXPENSE_AMOUNT_PER_CATEGORY, payload }),
    setSavingAmountPerCategory: payload => ({ type: ActionTypes.SET_SAVING_AMOUNT_PER_CATEGORY, payload }),
}

export default function statisticsReducer (state = initialState, action) {
    switch (action.type){
        case ActionTypes.SET_EXPENSE_AMOUNT_PER_CATEGORY:
            return {...state, expenseAmountPerCategory: [...action.payload]};
        case ActionTypes.SET_SAVING_AMOUNT_PER_CATEGORY:
            return {...state, savingAmountPerCategory: [...action.payload]};
        default:
            return state;
    }
}