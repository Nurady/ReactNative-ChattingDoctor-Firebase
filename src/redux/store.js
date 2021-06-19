import { createStore } from 'redux';

const initialState = {
    loading: false,
    name: 'Nursyafriady',
    address: 'Taliwang',

}

const reducer = (state = initialState, action) => {
    if(action.type === 'SET_LOADING') {
        return {
            ...state, 
            loading: action.value,
        }
    }
    return state;
};

const store = createStore(reducer);
export default store;