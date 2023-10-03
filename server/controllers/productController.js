const User=require("../models/user")
const Product=require("../models/product")
const cloudinary=require("../utils/cloudinary")
const path=require('path')
const fs = require("fs")
module.exports.allProducts=async (req,res)=>{
    try{
        const {page=1,limit=10,price=""}=req.query
        
        let priceRange=price.split(",")
        let whereClause=[]
        if(priceRange.length==2)
          whereClause.push({ "price":{$gte:priceRange[0],$lte:priceRange[1]}})
        const user=await User.findById(req.userId)
        let allProducts=[],total=0
        if(user?.userType=='buyer')
     {
        whereClause.push({stock:{$gt:0}})
        total=await Product.find({$and:whereClause}).count()
        allProducts = await Product.find({$and:whereClause}).populate("user","company").sort("-createdAt").limit(limit).skip(limit*(page-1))
     }
    else if(user?.userType=='seller')
    {
        total=await Product.find({user:user._id}).count()
        allProducts = await Product.find({user:user._id}).populate("user","company").sort("-createdAt").limit(limit).skip(limit*(page-1))
    }
     res.status(200).json({success:true,data:allProducts,page,totalPages:Math.ceil(total/limit)})
    }catch(e){
        console.log(e)
        res.status(500).json({success:false,message:e.message})   
    }
}
module.exports.getProduct=async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate("user","company")
        
        res.status(200).json({success:true,data:product})
    }catch(e){
        console.log(e)
        res.status(500).json({success:false,message:e.message})  
    }
}
module.exports.addProduct =async (req,res)=>{
    try{
     const {name,price,description,stock}=req.body
     //console.log("add",req.files,req.body)
     let urls = [];
     if(req.files)
    for (const file of req.files) {
      let response = await cloudinary.uploader.upload(file.path);
      urls.push({ imgId: response.public_id, imgUrl: response.secure_url });
      fs.unlinkSync(file.path);
    }
     const newProduct=await Product.create({
        name,
        description,
        price,
        stock,
        user: req.userId,
        images: urls
     })
     res.status(200).json({success:true,data:newProduct,message:'New Product added successfully'})
    }catch(e){
        console.log(e.message)
        res.status(500).json({success:false,message:e.message})
    }
}
module.exports.editProduct =async (req,res)=>{
    try{
     const productData=req.body
    // console.log("dataa",productData)
     const productId=req.params.id
     const imageUrls=JSON.parse(productData.imageUrls)
     const newProduct=await Product.findById(productId)
     if(!newProduct)
      return res.status(401).json({success:false,message:'Product not found'})
    let urls=[]
    let urlIds=imageUrls.map(i=>i.imgId)
    for(let i=0;i<newProduct.images.length;i++){
         if(urlIds.indexOf(newProduct.images[i].imgId)==-1)
          {
            console.log("not needed")
            await cloudinary.uploader.destroy(newProduct.images[i].imgId);
        }
         else
          {console.log("needed");urls.push(newProduct.images[i])}
    }
    console.log(urls)
    for (const file of req.files) {
        let response = await cloudinary.uploader.upload(file.path);
        urls.push({ imgId: response.public_id, imgUrl: response.secure_url });
        fs.unlinkSync(file.path);
      }
    

    const updatedProduct=await Product.findByIdAndUpdate(productId,{...productData,images:urls},{ new: true })
   // console.log("updated",updatedProduct);
    res.status(200).json({success:true,data:updatedProduct,message:'New Product added successfully'})
    }catch(e){
        console.log(e)
        res.status(500).json({success:false,message:e.message})
    }
}
module.exports.deleteProduct =async (req,res)=>{
    try{
     const productId=req.params.id
     const product=await Product.findById(productId)
     if(!product)
      return res.status(401).json({success:false,message:'Product not found'})
    //console.log(product)
    for(let i=0;i<product.images.length;i++)
     {
        await cloudinary.uploader.destroy(product.images[i].imgId);
     }
    await Product.findByIdAndDelete(productId)
    res.status(200).json({success:true,message:'Product deleted successfully'})
    }catch(e){
        console.log(e)
        res.status(500).json({success:false,message:e.message})
    }
}