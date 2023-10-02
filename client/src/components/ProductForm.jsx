import React,{useState,useRef} from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {TiDelete} from "react-icons/ti"
import {addProduct,editProduct} from "../actions/product"
import { useDispatch } from 'react-redux'
const ProductForm = ({item,setViewProductForm,setEditItem}) => {
    const dispatch=useDispatch()
    const imageInput=useRef()
    const [images,setImages]=useState([])
    const [form,setForm] = useState({
        name:item?.name || "",
        price:item?.price || 0,
        description:item?.description || "",
        stock:item?.stock || 0,
        imageUrls:item?.images
      })
      const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
      }
      const handleSubmit=(e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append("name",form.name)
        formData.append("price",form.price)
        formData.append("description",form.description)
        formData.append("stock",form.stock)
        for(let i=0;i<images.length;i++)
        formData.append("image",images[i])

        if(item)
        {
            formData.append("imageUrls",JSON.stringify(form.imageUrls))
            dispatch(editProduct(formData,item._id))
        }
        else
        dispatch(addProduct(formData))
        setViewProductForm(false)
        setEditItem(null)
      }
      const addImages=(e)=>{
        const files=e.target.files
            setImages([...images,...files])
        
      }
      const deleteImage=(id,type)=>{
        if(type==='file')
        {images.splice(id,1)
        setImages([...images])}
        else
        setForm({...form,imageUrls:form.imageUrls.filter(i=>i.imgId!=id)})
      }
  return (
    <div id="defaultModal" className="fixed top-0 left-0 right-0 z-50  w-full  md:inset-0  h-full">
    <div className='absolute w-full h-full bg-slate-800  opacity-50'>
    
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                    Add new Product
                </h3>
                <button onClick={()=>setViewProductForm(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <AiOutlineClose/>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-6">
                <div className="mt-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Product name</label>
                <div className="mt-1">
                    <input required onChange={handleChange} value={form.name} type="text" name="name" id="name" placeholder='Product Name' className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
                </div>
                </div>
                <div className="mt-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Product description</label>
                <div className="mt-1">
                    <textarea rows={5} required onChange={handleChange} value={form.description} type="text" name="description" id="description" placeholder='Product description' className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
                </div>
                </div>
                <div className="mt-2 flex gap-2">
                <div className="flex-1">
                <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price</label>
                <div className="mt-1">
                    <input required onChange={handleChange} value={form.price} type="number" name="price" id="price" placeholder='Product price' className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
                </div>
                </div> 
                <div className="flex-1">
                <label htmlFor="stock" className="block text-sm font-medium text-slate-700">Stock quantity</label>
                <div className="mt-1">
                    <input required onChange={handleChange} max={1000} value={form.stock} type="number" name="stock" id="stock" placeholder='Product price' className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
                </div>
                </div>
                </div>
                <div className="capitalize">images</div>
                <div className="mt-2 flex flex-wrap gap-2">
                    <input ref={imageInput} onChange={addImages} type="file" accept='image/*' multiple className='hidden'/>
                    <div
                    onClick={()=>imageInput.current.click()}
                    className="w-10 h-10 bg-slate-200 cursor-pointer flex justify-center items-center">+</div>
                    {images.map((image,index)=>
                        <div key={`img-${index}`} className="w-10 h-10 bg-slate-200 cursor-pointer relative">
                            <button onClick={()=>deleteImage(index,'file')} className="absolute -top-2 -right-2 text-red-600">
                                <TiDelete/>
                            </button>
                            <img className='w-full h-full object-cover' src={URL.createObjectURL(image)} alt=""/>
                        </div>)}
                        {item && form.imageUrls.map((image,index)=>
                        <div key={`img-${image.imgId}`} className="w-10 h-10 bg-slate-200 cursor-pointer relative">
                            <button onClick={()=>deleteImage(image.imgId,'url')} className="absolute -top-2 -right-2 text-red-600">
                                <TiDelete/>
                            </button>
                            <img className='w-full h-full object-cover' src={image.imgUrl} alt=""/>
                        </div>)}
                </div>
                <div className="my-2 flex items-center gap-3 justify-center">
                <button 
                type="submit" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                <button
                onClick={()=>setViewProductForm(false)} 
                type="button" 
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
            </form>
            
        </div>
    </div>
</div>
  )
}

export default ProductForm