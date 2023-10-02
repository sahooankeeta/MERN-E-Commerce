const Cart=require("../models/cart")
const Product = require("../models/product")
module.exports.getCart=async(req,res)=>{
    try{
        const userId=req.userId
       const userCart=await Cart.findOne({user:userId})
       .populate({
        path:'items.product',
        select:'name price user images stock',
        populate:({
            path:'user',
            select:'company'
        })
       })
       res.status(200).json({success:true,data:userCart})
    }catch(e){
        console.log(e)
        res.status(500).json({success:false,message:e.message})  
    }
}
module.exports.addToCart=async(req,res)=>{
    try {
        const userId=req.userId
        const cartData=req.body
        let userCart=await Cart.findOne({user:userId})
        let cartItem;
        let bill=userCart?.bill || 0
        const product=await Product.findById(cartData.productId,{"price":1})
        cartItem={product:product._id,quantity:cartData.quantity}
        bill+=product.price * cartData.quantity
        
        if(userCart)
        { 
          userCart.items.push(cartItem)
          userCart.bill=bill
          userCart.save()   
          userCart=await userCart.populate({
            path:'items.product',
            select:'price'
        })
          
        }else{
            userCart = await Cart.create({
                user:userId,
                items: [cartItem],
                bill: bill
            });
            
        }
        userCart=await userCart.populate({
            path:'items.product',
            select:'name price user images stock',
            populate:({
                path:'user',
                select:'company'
            })
           })
        res.status(200).json({success:true, data:userCart,message: 'item added successfully'})
    } catch (e) {
        console.log(e.message)
        res.status(500).json({success:false,message:e.message}) 
    }
}
module.exports.removeFromCart=async(req,res)=>{
    try {
        const cartItemId=req.params.id
        const userId=req.userId
        const userCart=await Cart.findOne({user:userId}).populate({
            path:'items.product',
            select:'name price user images stock',
            populate:({
                path:'user',
                select:'company'
            })
           })
        if(userCart)
        {
           const cartItem=userCart.items.find(item=>item._id==cartItemId)
           if(cartItem)
           {
            userCart.items=userCart.items.filter(item=>item._id!=cartItemId)
            userCart.bill-=cartItem.quantity*cartItem.product.price
            userCart.save()
           }
           res.status(200).json({success:true,data:userCart})
        }else{
            return res.status(500).json({success:false,message:'User cart not found'})
        }
    }
 catch (e) {
    console.log(e.message)
    res.status(500).json({success:false,message:e.message}) 
}
}
module.exports.updateCartQuantity=async(req,res)=>{
    try{
    const {cartItemId,quantity}=req.body
    const userId=req.userId
    let userCart=await Cart.findOne({user:userId}).populate({
        path:'items.product',
        select:'name price user images stock',
        populate:({
            path:'user',
            select:'company'
        })
       })
    if(userCart)
    {
        const cartItem=userCart.items.find(c=>c._id==cartItemId)
        if(cartItem){
            let prevTotal=cartItem.quantity*cartItem.product.price
            let newTotal=quantity*cartItem.product.price
            userCart.bill+=-prevTotal+newTotal
            //console.log(userCart.items)
            if(quantity==0)
            {
               userCart.items=userCart.items.filter(i=>i._id==cartItemId)
            }else{
               userCart.items=userCart.items.map(i=>i._id==cartItemId?{...i,quantity}:i)
            }
            userCart.save()
            return res.status(200).json({success:true,data:userCart,message:"cart item updated"})
        }else
        return res.status(500).json({success:false,message:"cart item not found"})
       
    }else
      return res.status(500).json({success:false,message:"cart not found"})
    }catch(e){
        console.log(e)
        res.status(500).json({success:false,message:e.message})  
    }
}