import * as actionType from "../helpers/constants"
const initialState={
    cart:[]
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SET_CART:
        return {...state,cart:action.payload}
      case actionType.REMOVE_CART:
        return {...state,cart:state.cart.filter(c=>c._id!==action.payload)}
      case actionType.UPDATE_CART:
        return {...state,cart:
          (action.payload.quantity==0?
            state.cart.filter(c=>c._id!==action.payload.cartItemId):
            state.cart.map(c=>c._id==action.payload.cartItemId?{...c,quantity:action.payload.quantity}:c))}
      default:
        return state;
    }
  };
  
  export default cartReducer;