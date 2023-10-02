import * as API from "../api"
import * as actionType from "../helpers/constants"
import notify from "../helpers/notify";
export const login = (formData) => async (dispatch) => {
    try {
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message } = await API.signIn(formData);
      if(success)
    {
        dispatch({ type: actionType.AUTH, payload:data });
        notify("success",message)
        
    }else{
        notify("error",message)
    }
    } catch (error) {
      console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
  };
  
  export const signup = (formData) => async (dispatch) => {
    try {
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message } = await API.signUp(formData);
     if(success)
     {
      notify("success",message)
      dispatch({ type: actionType.AUTH, payload:data });
     }else{
      notify("error",message)
     }
      
  
    } catch (error) {
      console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
  };
  export const resetPassword = (formData) => async (dispatch) => {
    try {
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message } = await API.resetPassword(formData);
     if(success)
     {
      notify("success",message)
      dispatch({ type: actionType.AUTH, payload:data });
     }else{
      notify("error",message)
     }
      
  
    } catch (error) {
      console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
  };