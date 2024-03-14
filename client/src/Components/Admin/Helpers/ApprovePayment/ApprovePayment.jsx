import toast from "react-hot-toast"
import { useFetchAPaymentOrder } from "../../../../hooks/fetch.hook"
import { confirmPayment } from "../../../../helpers/helpers"


function ApprovePayment({paymentOrderId}) {
    const {apiData, isLoading} = useFetchAPaymentOrder(paymentOrderId)
    const data = apiData?.data

    const handleConfirmPayment = async (id) => {
        const confirm =  window.confirm('Are you sure you want to approve this payment?')
        if(confirm){
            try {
                if(!id){
                    toast.error('Payment Id required')
                    return
                }
                const res = await confirmPayment({id})
            } catch (error) {
                console.log('Could no approve payment', error)
            }
        }
    }  
  return (
    <div className="approvePayment">
        <h2>Name: {data?.accountName}</h2>
        <h2>Bank Name: {data?.bankName}</h2>
        <h2>Account Number: {data?.accountNumber}</h2>
        <h2>Account: {data?.amount}</h2>
        <h2>Status: {data?.status}</h2>

        <button onClick={() => handleConfirmPayment(data?._id)}>Approve Payment</button>
    </div>
  )
}

export default ApprovePayment