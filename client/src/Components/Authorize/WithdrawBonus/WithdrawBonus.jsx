import { useState } from 'react'
import './WithdrawBonus.css'
import toast from 'react-hot-toast'
import { withdrawBonusEarning } from '../../../helpers/helpers'

function WithdrawBonus({apiData}) {
  const [ bonusAmount, setBonusAmount ] = useState()
  const [ loading, setLoading ] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(apiData?.totalReferralEarnings < 500){
        toast.error('Insuffient Bonus Balance')
      }
      if(apiData?.totalReferralEarnings < bonusAmount){
        toast.error('Insuffient Balance')
      }
      setLoading(true)
      const res = await withdrawBonusEarning({bonusAmount, userId: apiData?._id})
    } catch (error) {
      console.log('COULD NOT PROCESS BONUS WITHDRAWAL', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='withdrawBonus'>
        <h2 className='title'>Withdraw Referral Bonus</h2>
        <span>Balance: {apiData?.totalReferralEarnings}</span>
        <form className="bonusForm" onSubmit={handleSubmit}>
          <input type="number" value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} placeholder='Enter Amount to withdraw'/>
          <button>
            {
              bonusAmount >= 500 ?
              'Withdraw' :
              loading ? 
              'Processing' :
              'Minimuin amount is 500'
            }
          </button>
        </form>
    </div>
  )
}

export default WithdrawBonus