import * as actionType from "../helpers/constants"
const mainReducer = (state ={loading:false,error:null}, action) => {
    switch (action.type) {
        case actionType.SET_LOADING:
          return {...state,loading:action.payload}
        case actionType.SET_ERROR:
            return {...state,error:action.payload}
        default:
          return state;
      }
}
export default mainReducer