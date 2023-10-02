import * as API from "../api"
import * as actionType from "../helpers/constants"
import notify from "../helpers/notify";
export const createOrder=({orderData,user,setBill,bill,setInProgess,nextStep})=>async(dispatch)=>{
  try{
    console.log(orderData)
  const {success,data,message}=await API.createOrder(orderData)
  console.log("order data",data)
  if(success)
   {
    const { amount, id: order_id, currency } = data;

    const options = {
        key: import.meta.env.VITE_RAZOR_PAY_TEST_ID, // Enter the Key ID generated from the Dashboard
        amount:(amount).toString(),
        currency: currency,
        name: user.name,
        description: `order ${(new Date()).toLocaleDateString} for ${user.name}`,
        //image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            dispatch(verifyOrder({orderData:data,setBill,bill,setInProgess,nextStep}));
            
            //alert(result.data.msg);
        },
        prefill: {
            name: user.name,
            email: user.email,
            
        },
        notes: {
            address: bill.address,
        },
        theme: {
            color: "#528FF0",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
   }
  else
   {
    notify("error",message)
    setInProgess(false)
}
  }catch(e){
    setInProgess(false)
    console.log(e);
    notify("error",e.message)
  }
}
export const verifyOrder=({orderData,setBill,bill,setInProgess,nextStep})=>async(dispatch)=>{
  try{
    const {success,data,message}=await API.verifyOrder({orderData,bill})
    if(success)
     {
        console.log("verify",data);
            setInProgess(false)
            dispatch({type:actionType.SET_ORDER,payload:data})
            dispatch({type:actionType.SET_CART,payload:[]})
            nextStep()
     }
    else
     {
        setInProgess(false)
        notify("error",message)
     }
  }catch(e){
    setInProgess(false)
    console.log(e);
    notify("error",e.message)
  }
}
export const getAllOrders = ()=>async(dispatch)=>{
  try{
    dispatch({type:actionType.SET_LOADING,payload:true})
    const { success,data,message } = await API.getAllOrders();
    if(success)
    {
      dispatch({type:actionType.SET_ALL_ORDERS,payload:data})
    }else
    notify("error",message)
  }catch(e){
    console.log(e);
    notify("error",e.message)
  }
  dispatch({type:actionType.SET_LOADING,payload:false})
}
export const getOrder = (id)=>async(dispatch)=>{
  dispatch({type:actionType.SET_LOADING,payload:true})
  try{
    
    const { success,data,message } = await API.getOrder(id);
    if(success)
    {
      dispatch({type:actionType.SET_ORDER,payload:data})
    }else
    notify("error",message)
  }catch(e){
    console.log(e);
    notify("error",e.message)
  }
  dispatch({type:actionType.SET_LOADING,payload:false})
}