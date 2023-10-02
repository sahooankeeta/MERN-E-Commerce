
import React,{useState,useRef} from 'react'
import { useSelector } from 'react-redux'
import ReactSlider from 'react-slider'
const RangeFilter = ({title,handleAddFilter}) => {
  let upscale=10
  let defaultValue=useSelector(state=>state?.filter?.filter[title]?.map(el => 
    el/upscale
  )) || [0,100]
  const inputStyle = {
    width: "300px",
    
  }
  return (
   <div className="my-6 mr-3">
    <div className='mb-2 capitalize'>{title}</div>
    <ReactSlider
    className="h-[5px] px-1 rounded-lg bg-gray-200"
    thumbClassName="px-2 h-[22px] top-1/2 -translate-y-1/2 outline-none bg-cyan-600 cursor-grab flex items-center justify-center rounded-full text-white text-xs"
    trackClassName={`h-[5px] rounded-lg slider-track`}
    value={defaultValue}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div  {...props}>{state.valueNow*upscale}</div>}
    onChange={(state)=>handleAddFilter({name:title, value:state.map(el => 
      el*upscale
    )})}
    pearling
/>

   </div>
  )
}

export default RangeFilter