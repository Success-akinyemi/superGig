import mongoose from "mongoose";

const bankAccountDetailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supergigUsers'
    },
    bankName: {
        type: String
    },
    accountName: {
        type: String
    },
    accountNumber: {
        type: Number
    }
},
{timestamps: true}
)

const BankAccountDetailModel = mongoose.model('BankAccountDetail', bankAccountDetailSchema)
export default BankAccountDetailModel