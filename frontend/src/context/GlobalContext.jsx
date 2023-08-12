import { createContext, useReducer } from 'react';

export const GlobalStateContext = createContext();

const defaultGlobalData = {
    primaryColor: 'red'
}

function reducer(state, action) {
    switch(action.type) {
        case 'ACTION_TYPE_STRING': {
            // modify state
        }
        case 'RESET': return defaultGlobalData
    }
    throw Error ('Unknown Action: ' + action.type)
}

const GlobalStateProvider = ({ children }) => {
    const [globalData, dispatch] = useReducer(reducer, defaultGlobalData);

    return (
    <GlobalStateContext.Provider
        value={{
            globalData,
            dispatch
        }}>
        { children }
    </GlobalStateContext.Provider>
)}

export default GlobalStateProvider;