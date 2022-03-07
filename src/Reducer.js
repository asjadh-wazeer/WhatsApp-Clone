export const initialState = {  //initialState -> How datalayer looks
    user: null, //user not be logged in
}

export const actionTypes = {
    SET_USER: "SET_USER", //push the information into the data layer//2:48:31--> When we signin, when we dispatch the action
    //go head & push into the data layer
};

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user:action.user, // keep the state, change the the user where we dispatched
            };

            default:
                return state;
    }
};

export default reducer;