import React,{useState} from 'react'
import { AddressForm, Payment,OrderConfirmation } from '../components'
import {BsFillCheckCircleFill} from "react-icons/bs"
const initialForm={
  name:"",
  contact:"",
  pincode:"",
  address:"",
  locality:"",
  city:"",
  state:"",
  country:""
}
const Checkout = () => {
    const stepList=['address','payment','confirmation']
    const [bill,setBill]=useState({address:initialForm})
    const [activeStep,setActiveStep]=useState(0)
    const nextStep=()=>{setActiveStep(p=>p+1)}
    const prevStep=()=>{setActiveStep(p=>p-1)}
    //
  return (
    <div className='w-2/4 mx-auto my-6'>
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base capitalize">
    
    {stepList.map((item,index)=><li key={`item-${index}`} className={`flex items-center } ${index<=activeStep && 'text-blue-600 dark:text-blue-500'} ${index<stepList.length-1 && `md:w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 after:border-${index<activeStep?'cyan':'grey'}-800 `}`}>
         <span>{item}</span>
    </li>)}
    
</ol>
{activeStep==0 && <AddressForm setBill={setBill} bill={bill} nextStep={nextStep}/>}
{activeStep==1 && <Payment setBill={setBill} bill={bill} nextStep={nextStep} prevStep={prevStep}/>}
{activeStep==2 && <OrderConfirmation/>}
    </div>
  )
}

export default Checkout