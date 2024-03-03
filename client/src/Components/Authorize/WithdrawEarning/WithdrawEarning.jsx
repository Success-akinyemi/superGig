import { useState, useEffect } from 'react'
import './WithdrawEarning.css'
import { withdrawEarning } from '../../../helpers/helpers'
import toast from 'react-hot-toast'

function WithdrawEarning({apiData}) {
  const [ earningAmount, setEarningAmount ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [transactionFee, setTransactionFee] = useState(0)


  useEffect(() => {
    if(earningAmount){
      const fee = (3 * parseFloat(earningAmount)) / 100
      setTransactionFee((parseFloat(earningAmount) + fee).toFixed(2))
    }
  },[earningAmount])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(apiData?.earningWallet < transactionFee){
        toast.error('Insuffient Balance')
      }
      if(apiData?.earningWallet < transactionFee){
        toast.error('Insuffient Balance')
      }
      setLoading(true)
      const res = await withdrawEarning({earningAmount, userId: apiData?._id})
    } catch (error) {
      console.log('COULD NOT PROCESS WITHDRAWAL', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='withdrawEarning'>
        <h2 className='title'>Withdraw Earning</h2>
        <span>Balance: {apiData?.earningWallet}</span>
        <form className="bonusForm" onSubmit={handleSubmit}>
          <input type="number" value={earningAmount} onChange={(e) => setEarningAmount(e.target.value)} placeholder='Enter Amount to withdraw'/>
          <button>
            {
              earningAmount >= 500 ?
              'Withdraw' :
              loading ? 
              'Processing' :
              'Minimuin amount is 500'
            }
          </button>
          <p className='fee'>Transaction fee (3%): {transactionFee && (<span>{transactionFee}</span>)}</p>
        </form>
    </div>
  )
}

export default WithdrawEarning