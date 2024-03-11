//get all social media accounts of user to actiavate or deactivate options: Pending and Verified
//get all payment order Pending and Paid
//update payment order when payment is made to user
//get all task: completed, not completed

import PaymentOrderModel from "../models/PaymentOrder.js"
import UserModel from "../models/User.js"


//make admin
export async function makeAdmin(req, res){
    const { email } = req.body
    try {
        if(!email){
            return res.status(404).json({ success: false, data: 'PROVIDE AN EMAIL'})
        }
        const userExist = await UserModel.findOne({ email: email})
        if(!userExist){
            return res.status(404).json({ success: false, data: 'Inalid User'})
        }
        userExist.isAdmin = true
        await userExist.save()
        res.status(201).json({ success: true, data: 'User Updated  to admin' })
    } catch (error) {
        console.log('UNABLE TO AMKE ADMIN', error)
        res.status(500).json({ success: false, data: 'Failed to make admin'})
    }
}

//get all payment orders
export async function getAllPaymentOrder(req, res){
    const { query } = req.params
    console.log('HELLO', query)
    try {
        let paymentData
        if (query.toLowerCase() === 'Paid'){
            console.log('ME PAID')
            paymentData = await PaymentOrderModel.find({ status: 'Paid' })
            return res.status(200).json({ success: true, data: paymentData})
        }
        if(query.toLowerCase() === 'Pending'){
            console.log('ME PENDING')
            paymentData = await PaymentOrderModel.find({ status: 'Pending'})
            return res.status(200).json({ success: true, data: paymentData})
        } else{
            console.log('ME ALL')
            paymentData = await PaymentOrderModel.find()

        }
        
        res.status(200).json({ success: true, data: paymentData})
    } catch (error) {
        console.log('ERROR GETTING ALL PAYMENT ORDERS', error)
        res.status(500).json({ success: false, data: 'Failed to get all payment order data'})
    }
}

//get a payment orders
export async function getAPaymentOrder(req, res){
    const { id } = req.params
    console.log('HELLO', id)
    try {
        const paymentData = await PaymentOrderModel.findById({ _id: id })
        if(!paymentData){
            return res.status(404).json({ success: false, data: 'Data not found'})
        }
        
        res.status(200).json({ success: true, data: paymentData})
    } catch (error) {
        console.log('ERROR GETTING A PAYMENT ORDERS', error)
        res.status(500).json({ success: false, data: 'Failed to get a payment order data'})
    }
}

//confirm payment to freelancer
export async function confirmPayment(req, res){
    const { id } = req.body
    try {
        const paymentOrder = await PaymentOrderModel.findById({ _id: id })

        if(!paymentOrder){
            return res.status(404).json({ success: false, data: 'Payment not found'})
        }

        if(paymentOrder.status === 'Paid'){
            return res.status(304).json({ success: true, data: 'Payment has previously been confirmed'})
        }

        paymentOrder.status === 'Paid'
        await paymentOrder.save()

        res.status(201).json({ success: true, data: 'Payment has been confimed'})
    } catch (error) {
        console.log('UNABLE TO CONFIRM PAYMENT', error)
        res.status(500).json({ success: false, data: 'Unable to confirm Payment' })
    }
}