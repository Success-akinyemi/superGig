import './AccountFunding.css'
import '../styling.css'
import { useState } from 'react';
import { useFetch } from '../../../hooks/fetch.hook';
import { paysavings } from '../../../helpers/helpers';
import toast from 'react-hot-toast';

function AccountFunding() {
    const [amountValue, setAmountValue] = useState('');
    const [isLoadingAnimation, setIsLoadingAnimation] = useState(false);

    const { apiData, isLoading, serverError } = useFetch()
    const email = apiData?.email

      //for paystack
  const handlePaystack = async (e) => {
    e.preventDefault()
    const amount = amountValue
    if(amountValue < 1000){
      toast.error('Minimuim ammount is 1000')
      return;
    }
    if(!email){
      toast.success('Email is required')
      return;
    }
    try {
      setIsLoadingAnimation(true)
      const payment = await paysavings({email, amount})
      console.log(payment)
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoadingAnimation(false)
    }
  }



  return (
    <div>
        <form onSubmit={handlePaystack} className='fundForm'>
            {/*<label>Email:</label>
            <input type='email' className='amount_input'></input>*/}
            <label>{email}</label>
            <label>Amount:</label>
            <input type='number' className='amount_input' value={amountValue} onChange={(e) => setAmountValue(e.target.value)} placeholder='Amount' />
            <h2 className='errorMsg'>{amountValue < 1000 ? 'Minimium Amount is NGN 1000' : ''}</h2>
            <button type='submit' className='submitBtn' disabled={amountValue < 1000 || isLoadingAnimation} >
            {isLoadingAnimation ? 'Please Wait' : 'Pay'}
            </button>
          </form>
    </div>
  )
}

export default AccountFunding