import * as actionType from "../helpers/constants"
const initialState={
  viewMenu:true,
    screenSize:null,
    loading:false,
    error:null
}
const mainReducer = (state =initialState, action) => {
    switch (action.type) {
      case actionType.SET_VIEW_MENU:
            return {...state,viewMenu:action.payload}
      case actionType.SET_SCREEN_SIZE:
            return {...state,screenSize:action.payload}
        case actionType.SET_LOADING:
          return {...state,loading:action.payload}
        case actionType.SET_ERROR:
            return {...state,error:action.payload}
        default:
          return state;
      }
}
export default mainReducer