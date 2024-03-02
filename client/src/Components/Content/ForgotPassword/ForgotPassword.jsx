import { useState } from 'react'
import LoadingBtn from '../../Helpers/LoadingBtn/LoadingBtn'
import './ForgotPassword.css'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../../helpers/helpers'

function ForgotPassword() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('')
  const [ error, setError ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if(!email){
        setEmail('')
        setTimeout(() => {
          setError('')
        }, 3000)
        return setError('Email required')
      } else if(email.includes(" ")){
        setEmail('')
        setTimeout(() => {
          setError('')
        }, 3000)
        return setError('Invalid Email')
      } 

      try {
        setIsLoading(true)
        const res = await resetPassword({ email })

        console.log('rES from client', res)
        if(res.data.success){
          navigate('/resetEmailSent', { state: {resMsg: res?.data.data}})
        }
        
      } catch (errorMsg) {
        console.log('ERROR SENDING LINK USER:', errorMsg)
        const errorM = errorMsg.response?.data?.data || 'An error occurred during the request.';
        console.log('ER', errorM)
        setError(errorM)
        setTimeout(() => {
          setError('')
        }, 5000)
    } finally {
        setIsLoading(false)
      }
}
  return (
    <div className="f-registration">
      <div className="f-container">
        <div className="f-box">
          <form className={`box-forgotPassword`} id='login' onSubmit={handleForgotPassword}>
              <div className="top-header">
                <h3>Forgot Password</h3>
                <small>Enter registered email to get reset link</small>
              </div>

              <div className="input-group">
                <div className="input-field">
                  <input type="email" id="logEmail" className="input-box" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <label htmlFor="logEmail">Email Address</label>
                </div>


                {error && <p className='error'>{error}</p>}
                
                <div className="input-field">
                  {
                    isLoading ? 
                    (<LoadingBtn btnText={'Checking...'} />)
                    :
                    (<input type="submit" className="input-submit" value='Submit' />)
                  }
                </div>
                <div className="forgot">
                  <Link className='link' to='/register'>Remeber Password</Link>
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword