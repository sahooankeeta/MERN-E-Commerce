import * as API from "../api"
import * as actionType from "../helpers/constants"
import notify from "../helpers/notify";

export const getProducts=({page=1,limit=12,filter={}})=>async (dispatch)=>{
  dispatch({type:actionType.PRODUCT_LOADING})
    try {
      let filterQuery=""
      for(const key in filter)
       if(key?.length>0)
       filterQuery +=`&${key}=${filter[key]}`
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message,totalPages } = await API.getProducts({page,limit,filterQuery});
      if(success)
      {
        dispatch({type:actionType.SET_PRODUCTS,payload:data})
        dispatch({type:actionType.SET_PAGES,payload:totalPages})
      }
    } catch (error) {
      //console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}
export const getProduct=(id)=>async (dispatch)=>{
  try {
    dispatch({type:actionType.PRODUCT_LOADING})
    const { success,data,message } = await API.getProduct(id);
    if(success)
    {
      dispatch({type:actionType.SET_PRODUCT,payload:data})
    }else
    notify("error",message)
  } catch (error) {
    //console.log(error);
    notify("error",error.message)
  }
  dispatch({type:actionType.SET_LOADING,payload:false})
}
export const addProduct=(formData)=>async (dispatch)=>{
    try {
      notify("info","please wait...")
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message } = await API.addProduct(formData);
      if(success) 
       dispatch({type:actionType.ADD_PRODUCT,payload:data})
       notify(success?'success':'error',message)
    } catch (error) {
      //console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}
export const editProduct=(formData,id)=>async (dispatch)=>{
    try {
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message } = await API.editProduct(formData,id);
      if(success)
        dispatch({type:actionType.EDIT_PRODUCT,payload:data})
      notify(success?'success':'error',message)
    } catch (error) {
      //console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}
export const deleteProduct=(id)=>async (dispatch)=>{
    try {
      console.log(id)
      dispatch({type:actionType.SET_LOADING,payload:true})
      const { success,data,message } = await API.removeProduct(id);
      if(success)
        dispatch({type:actionType.DELETE_PRODUCT,payload:id})
      notify(success?'success':'error',message)
    } catch (error) {
      //console.log(error);
      notify("error",error.message)
    }
    dispatch({type:actionType.SET_LOADING,payload:false})
}
export const addFilter=(value)=>(dispatch)=>{
  dispatch({type:actionType.SET_FILTER,payload:value})
}
export const clearFilter=()=>(dispatch)=>{
  dispatch({type:actionType.CLEAR_FILTER,payload:{}})
}