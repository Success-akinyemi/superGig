import { useFetchAllPaymentOrder } from "../../../../hooks/fetch.hook"

function PendingPayment() {
    const query = 'Pending'
    const { apiData, isLoading } = useFetchAllPaymentOrder(query)
    //console.log('DTA', apiData?.data)
    const data = apiData?.data
  return (
    <div className="paymentCard">
        <div className="headTitle">
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Status</h2>
        </div>
        <div className="bodyInfo">
        {
                data?.length <= 0 ? (
                    <p className='noItem'>No Payment torder</p>
                ) : (
                    data?.map((item) => (
                        <>
                        <p>{item?.bankName}</p>
                        <p>{item?.amount}</p>
                        <p>{item?.status}</p>
                        </>
                    ))
                )
            }
        </div>
    </div>
  )
}

export default PendingPayment