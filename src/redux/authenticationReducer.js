const initialState = {
    token: '',
    isLoggedIn: false,
}

export const ActionTypes = {
    USER_AUTHENTICATED: 'USER_AUTHENTICATED',
    LOGOUT: 'LOGOUT',
}

export const ActionCreators = {
    userAuthenticated: payload => ({ type: ActionTypes.USER_AUTHENTICATED, payload }),
    logout: () => ({ type: ActionTypes.LOGOUT })
}

// export const {userAuthenticated, logout} = authenticationSlice.actions;
export default function AuthenticationReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.USER_AUTHENTICATED:
            return { ...state, token: action.payload.token, isLoggedIn: true }
        case ActionTypes.LOGOUT:
            // sessionStorage.clear();
            return { ...state, token: '', isLoggedIn: false }
        default:
            return state
    }
}