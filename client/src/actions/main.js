import * as actionType from "../helpers/constants"
export const setScreenSize=(value)=>(dispatch)=>{
    dispatch({type:actionType.SET_SCREEN_SIZE,payload:value})
}
export const setViewMenu=(value)=>(dispatch)=>{
    dispatch({type:actionType.SET_VIEW_MENU,payload:value})
}