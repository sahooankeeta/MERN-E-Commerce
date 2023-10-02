import React,{useState,useRef,useEffect} from 'react'

const Sort = () => {
  const [view,setView]=useState(false)
  const ref=useRef(null)
   const options=[
    {label:'sort asc',value:'sort asc'},
    {label:'sort desc',value:'sort desc'}
   ]
   const handleClose=()=>{
    setView(p=>!p)
   }
   const handleSort=(value)=>{
    console.log(value)
    handleClose()
   }
   const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setView(false);
    }
};
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
}, []);
  return (
    <div className='relative' ref={ref}>
      <button 
      className='className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"' 
      onClick={handleClose}>sort</button>
      {view &&<ul 
      className={`absolute right-0 z-10 mt-2 w-56 origin-top-right 
      rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
        
        {options.map(op=>
        <li 
        key={`op-${op.value}`}
        onClick={()=>handleSort(op.value)} 
        className='cursor-pointer block rounded-md px-4 py-2 text-sm hover:bg-gray-100'>{op.label}</li>
          )}
      </ul>}
    </div>
        
  )
}

export default Sort