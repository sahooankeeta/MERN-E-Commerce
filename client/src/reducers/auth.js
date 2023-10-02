import * as actionType from "../helpers/constants"
const initialState={
    authData:localStorage.getItem('profile')?JSON.parse(localStorage.getItem('profile'))?.user:null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.AUTH:
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
  
        return { ...state, authData: action.payload.user };
      case actionType.LOGOUT:
        localStorage.clear();
        return { ...state, authData: null};
      default:
        return state;
    }
  };
  
  export default authReducer;