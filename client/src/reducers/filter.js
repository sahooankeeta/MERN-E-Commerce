import * as actionType from "../helpers/constants"
const initialState={
    filter:{}
}
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_FILTER:
            console.log(action.payload)
            return {...state,filter:{...state.filter,[action.payload.name]:action.payload.value}}
        case actionType.CLEAR_FILTER:
            return {...state,filter:{}}
      default:
        return state;
    }
  };
  
  export default filterReducer;