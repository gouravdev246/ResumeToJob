import razorpay from 'razorpay'
import {PremiumPrice} from '../models/premiumacc.model.js'
import mongoose from 'mongoose'
import crypto from 'crypto'


const CreateRazorpayInstance = () => {
    return new razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY
    })
}


export const createOrder = async (req, res) => {
    const razorPayInstance = CreateRazorpayInstance();
    const { premiumtype } = req.body

    let premiumData = await PremiumPrice.findOne({ acctype: premiumtype })

    // Auto-seed data for smooth local development
    if (!premiumData) {
        let price = premiumtype === 'pro' ? 1 : 1.5;
        premiumData = await PremiumPrice.create({ acctype: premiumtype, price: price });
    }

    const options = {
        amount: Math.round(premiumData.price * 100),  // Amount is in currency subunits. 
        currency: "INR",
        receipt: `rcpt_${Date.now()}`
    };


    try{
        razorPayInstance.orders.create(options , (err , order) =>{
            if(err){
                console.error("Razorpay order creation error:", err);
                return res.status(500).json({
                    success : false ,
                    message : "Something went wrong "
                }) ;
            }
            return res.status(200).json(order)
        })


    }catch(err){
        console.error("Error occures in Create ORder Section" , err)
        return res.status(500).json({
            success : false ,
            message : "Something went wrong",
            error: err.message
        })
    }
}


export const verifyPayments = async (req , res) =>{
    const {order_id , payment_id , signature, premiumtype } = req.body 
    const secret = process.env.RAZORPAY_SECRET_KEY 

    const hmac = crypto.createHmac("sha256" , secret);

    hmac.update(order_id + "|" + payment_id);
    const generateSignature = hmac.digest("hex")

    if(generateSignature === signature){
        try {
            // Update the user's account type
            if (req.user) {
                req.user.acctype = premiumtype;
                await req.user.save();
            }

            return res.status(200).json({
                success : true ,
                message : "Payment Verified and Account Upgraded"
            });
        } catch (error) {
            console.log("Error updating user account", error);
            return res.status(500).json({
                success : false ,
                message : "Payment verified but failed to upgrade account"
            });
        }
    }else{
        return res.status(400).json({
            success : false ,
            message : "Payment not verified"
        });

    }
}


