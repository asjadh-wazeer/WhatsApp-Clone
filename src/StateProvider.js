import React, {createContext, useContext, useReducer} from "react";

//Preparing for the data layer //creating somthing call context, which is where data layer actually lives
export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => ( //children is <App /> 2:47:26
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext); //pull information from data layer