import * as actionType from "../helpers/constants"
const initialState={
    loading:false,
    allProducts:[],
    product:null,
    currentPage:1,
    totalPages:0
}
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PRODUCT_LOADING:
            return {...state,product:null,allProducts:[],loading:true}
        case actionType.SET_PAGES:
            return {...state,totalPages:action.payload}
        case actionType.SET_PRODUCTS:
            return {...state,allProducts:action.payload,loading:false}
        case actionType.SET_PRODUCT:
            return {...state,product:action.payload,loading:false}
        case actionType.ADD_PRODUCT:
            return {...state,allProducts:[action.payload,...state.allProducts]}
        case actionType.DELETE_PRODUCT:
            return {...state,allProducts:state.allProducts.filter(item=>item._id!==action.payload)}
        case actionType.EDIT_PRODUCT:
            console.log(action.payload._id,state.allProducts[0]._id)
            return {...state,allProducts:state.allProducts.map(item=>item._id==action.payload._id?action.payload:item)}
        default:
          return state;
      }
}
export default productReducer