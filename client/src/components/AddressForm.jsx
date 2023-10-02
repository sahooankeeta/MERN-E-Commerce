import React,{useState} from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useSelector } from 'react-redux';


const AddressForm = ({nextStep,bill,setBill}) => {
    const [form,setForm]=useState(bill.address)
    const {cart}=useSelector(state=>state.cart)
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
     e.preventDefault()
     console.log(form)
     setBill({...bill,address:form,cart})
     nextStep()
    }
  return (
    <form onSubmit={handleSubmit} className='w-2/3 mx-auto my-8 flex flex-col gap-3'>
        <div >
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Name</label>
            <div className="mt-1">
                <input 
                required 
                onChange={handleChange} 
                value={form.name} 
                type="text" 
                name="name" 
                id="name" 
                placeholder='Name' 
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
            </div>
        </div>
        <div >
            <label htmlFor="contact" className="block text-sm font-medium text-slate-700">Contact Number</label>
            <div className="mt-1">
                <input 
                required 
                onChange={handleChange} 
                value={form.contact} 
                type="text" 
                name="contact" 
                id="contact" 
                placeholder='Contact No.' 
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
            </div>
        </div>
        <div >
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
            <div className="mt-1">
                <input 
                required 
                onChange={handleChange} 
                value={form.address} 
                type="text" 
                name="address" 
                id="address" 
                placeholder='address' 
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
            </div>
        </div>
        <div >
            <label htmlFor="pincode" className="block text-sm font-medium text-slate-700">Pincode</label>
            <div className="mt-1">
                <input 
                required 
                onChange={handleChange} 
                value={form.pincode} 
                type="text" 
                name="pincode" 
                id="pincode" 
                placeholder='pincode' 
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
            </div>
        </div>
        <div className="flex gap-2">
        <div className='flex-1'>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">city</label>
            <div className="mt-1">
                <input 
                required 
                onChange={handleChange} 
                value={form.city} 
                type="text" 
                name="city" 
                id="city" 
                placeholder='city' 
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
            </div>
        </div>
        <div className='flex-1'>
            <label htmlFor="locality" className="block text-sm font-medium text-slate-700">locality</label>
            <div className="mt-1">
                <input 
                required 
                onChange={handleChange} 
                value={form.locality} 
                type="text" 
                name="locality" 
                id="locality" 
                placeholder='locality' 
                className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
            </div>
        </div>
        </div>
        
        <div className="flex gap-2">
        <div className='flex-1'>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700">state</label>
            <div className="mt-1">
            <RegionDropdown
          country={form.country}
          value={form.state}
           className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" 
          onChange={(val) => setForm({...form,state:val})} />
                
            </div>
        </div>
        <div className='flex-1'>
            <label htmlFor="country" className="block text-sm font-medium text-slate-700">country</label>
            <div className="mt-1">
            <CountryDropdown
             className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" 
          value={form.country}
          onChange={(val) => setForm({...form,country:val})} />
                
            </div>
        </div>
        </div>
        <button type='submit' className="w-full bg-cyan-600 text-white rounded-lg p-3 capitalize mt-3">save</button>
    </form>
  )
}

export default AddressForm