const Razorpay=require('razorpay')
const crypto = require('crypto');
const User=require("../models/user")
const Product=require("../models/product")
const Order=require("../models/order")
const Cart=require("../models/cart")
module.exports.order= async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZOR_PAY_TEST_ID,
            key_secret: process.env.RAZOR_PAY_TEST_SECRET,
        });

        const options = {
            amount: req.body.amount, // amount in smallest currency unit
            currency: "INR",
            receipt: req.userId+"_"+Date.now(),
        };
       
        const order = await instance.orders.create(options);
        
        if (!order) return res.status(500).json({success:false,message:"Some error occured"});
        
        res.status(200).json({success:true,message:"order created successfully",data:order});
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false,message:error.message || error?.error?.description});
    }
};

module.exports.verify= async (req, res) => {
    try {
         // getting the details back from our font-end
         const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body.orderData;
        const {address,cart}=req.body.bill
        //console.log(items)
        const shasum = crypto.createHmac("sha256", process.env.RAZOR_PAY_TEST_SECRET);
        
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        
        const digest = shasum.digest("hex");
        if (digest !== razorpaySignature)
            return res.status(500).json({ success:false, message:"Transaction not legit!"});
        
        let itemCount=0
        let orderItems=[]
        for(let i=0;i<cart.items.length;i++){
            itemCount+=cart.items[i].quantity
            await Product.findByIdAndUpdate(cart.items[i].product._id,{$inc:{stock:-cart.items[i].quantity}})
            orderItems.push({
            productId:cart.items[i].product._id,
            product_name:cart.items[i].product.name,
            product_price:cart.items[i].product.price,
            product_image:cart.items[i].product.images[0].imgUrl,
            company_name:cart.items[i].product.user.company,
            quantity:cart.items[i].quantity
        })
        }
        
        
        
        const newOrder=await Order.create({
            user:req.userId,
            razorpayOrderId,
            razorpayPaymentId,
            items:orderItems,
            bill:cart.bill,
            itemCount,
            address:address
        })
        for(let i=0;i<cart.items.length;i++){
            const user=await User.findById(cart.items[i].product.user._id)
            user.productOrders.push(newOrder._id)
            user.save()
        }
        
        await Cart.findByIdAndDelete(cart._id)
        res.json({
            success:true,data:newOrder
            
        });
    } catch (error) {
        console.log(error.message)
        res.status(200).json({success:false,message:error.message});
    }
};
module.exports.getAllOrders=async(req,res)=>{
    try{
        const user=await User.findById(req.userId)
        let orders=[]
        if(user?.userType=='buyer')
      orders=await Order.find({user:req.userId}).sort("-createdAt")
       else if(user?.userType=='seller')
       {
        for(let i=0;i<user.productOrders?.length;i++)
       {
        let porder=await Order.findById(user.productOrders[i])
           let company_bill=0,itemCount=0;
           if(porder?.items?.length>0)
           porder.items=porder.items.filter(item=>{
            if(item.company_name==user.company)
            {
                itemCount+=item.quantity
                company_bill+=item.quantity*item.product_price
                return true
            }
            return false
        })
        porder.bill=company_bill
        porder.itemCount=itemCount
        console.log(itemCount)
          orders.unshift(porder)
       }
    }
      res.status(200).json({success:true,data:orders})
    }catch(e){
        console.log(e)
        res.status(500).send({success:false,message:e.message}); 
    }
}
module.exports.getOrder=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findById(req.userId)
        if(id){

            let order =await Order.findById(id)
            if(user?.userType ==='seller'){
                let company_bill=0
                order.items=order.items.filter(item=>{
                    if(item.company_name==user.company)
                    {
                        company_bill+=item.quantity*item.product_price
                        return true
                    }
                    return false
                })
                order.bill=company_bill
               }
            return res.status(200).json({success:true,data:order})
        }else
         return res.status(500).send({success:false,message:'Order id not found'}); 
    
    }catch(e){
        console.log(e)
        res.status(500).send({success:false,message:e.message}); 
    }
}