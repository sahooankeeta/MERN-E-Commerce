import * as API from "../api"
import * as actionType from "../helpers/constants"
import notify from "../helpers/notify";

export const getCart=()=>async(dispatch)=>{
    dispatch({type:actionType.SET_LOADING,payload:true})
    try{
        const { success,data,message } = await API.getCart();
        if(success)
        {
           dispatch({type:actionType.SET_CART,payload:data})
        }else{
            notify("error",message)
        }
    }catch(e){
        console.log(e);
      notify("error",e.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}

export const addToCart=(item)=>async(dispatch)=>{
   // dispatch({type:actionType.SET_LOADING,payload:true})
    try{
        const { success,data,message } = await API.addToCart(item);
        if(success)
        dispatch({type:actionType.SET_CART,payload:data})
      else
        notify(success?'success':'error',message)
    }catch(e){
        console.log(e);
      notify("error",e.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}

export const removeFromCart=(id)=>async(dispatch)=>{
  //  dispatch({type:actionType.SET_LOADING,payload:true})
    try{
       const {success,data,message}=await API.removeFromCart(id)
       if(success)
       dispatch({type:actionType.SET_CART,payload:data})
      else
       notify(success?'success':'error',message)
    }catch(e){
        console.log(e);
      notify("error",e.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}
export const updateCart=(item)=>async(dispatch)=>{
   // dispatch({type:actionType.SET_LOADING,payload:true})
    try{
       const {success,data,message}=await API.updateCart(item)
       //dispatch({type:actionType.UPDATE_CART,payload:item})
       if(success)
       dispatch({type:actionType.SET_CART,payload:data})
       else
       notify(success?'success':'error',message)
    }catch(e){
        console.log(e);
      notify("error",e.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}