import * as actionType from "../helpers/constants"
const initialState={
    order:null,
    allOrders:null
}
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SET_ORDER:
        return {...state,order:action.payload}
      case actionType.SET_ALL_ORDERS:
        return {...state,allOrders:action.payload}
      default:
        return state;
    }
  };
  
  export default orderReducer;