import './Signup.css'
import { useState } from 'react'
import { registerUser } from '../../../helpers/helpers'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'
import LoadingBtn from '../../Helpers/LoadingBtn/LoadingBtn';

function Signup({isActive, referredBy}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmPassword, setComfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [comfirmPasswordVisible, setComfirmPasswordVisible] = useState(false)

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/

    if(!specialChars.test(password)){
      setPassword('')
      setComfirmPassword('')
      setTimeout(() => {
          setError('')
      }, 5000)
      return setError('Password must contain at least on special character')
    }  
    if(password.length < 6){
      setPassword('')
      setComfirmPassword('')
      setTimeout(() => {
          setError('')
      }, 5000)
      return setError('Password must be 6 characters long')
    }
    if(password !== comfirmPassword){
      setPassword('')
      setComfirmPassword('')
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('Passwords do not match')
    }

    if(username.length <= 1){
      setUsername('')
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('Invalid Username')
    }

    try {
      setIsLoading(true)
      const res = await registerUser({ username, email, password, referredBy })

      if(res.data.success){
          console.log(res.data.success)
          navigate('/VerificationEmailSent', { state: {resMsg: res?.data.data}})
      } else if(!res.data.success){
          setError(res.data.data)
          setTimeout(() => {
            setError('')
          }, 5000)
      }
    } catch (error) {
      console.log('ERROR REGISTEREING USER:', error)
      setTimeout(() => {
        setError('')
      }, 3000)
      return setError('An Error occurred. please try again.')
    } finally{
      setIsLoading(false)
    }
  }

  const myRegPassword = () => {
    setPasswordVisible((prev) => !prev)
  }

  const myRegComfirmPassword = () => {
    setComfirmPasswordVisible((prev) => !prev)
  }

  return (
    <form className={`box-register ${isActive ? 'show' : 'hide'}`} id='register' onSubmit={handleRegister}>
    <div className="top-header">
      <h3>Sign Up Here</h3>
      <small>Register to Expand</small>
    </div>

    <div className="input-group">
      <div className="input-field">
        <input type="text" id="regUser" className="input-box" required value={username} onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="regUser">Username</label>
      </div>

      <div className="input-field">
        <input type="email" id="regEmail" className="input-box" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="regEmail">Email Address</label>
      </div>

      <div className="input-field">
        <input type={passwordVisible ? 'text' : 'password'} id="regPassword" className="input-box" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <label htmlFor="regPassword">Password</label>
        <div className="eye-area">
          <div className="eye-box" onClick={myRegPassword}>
          {passwordVisible ? (
          <i id='eye-slash'>
            <VisibilityOffIcon />
          </i>
        ) : (
          <i id='eye'>
            <VisibilityIcon />
          </i>
        )}
          </div>
        </div>
      </div>

      <div className="input-field">
        <input type={comfirmPasswordVisible ? 'text' : 'password'} id="regConfirmPassword" className="input-box" required value={comfirmPassword} onChange={(e) => setComfirmPassword(e.target.value)}/>
        <label htmlFor="regPassword" id='ooo'>Retype Password</label>
        <div className="eye-area">
          <div className="eye-box" onClick={myRegComfirmPassword}>
          {comfirmPasswordVisible ? (
          <i id='eye-slash'>
            <VisibilityOffIcon />
          </i>
        ) : (
          <i id='eye'>
            <VisibilityIcon />
          </i>
        )}
          </div>
        </div>
      </div>

      <div className="remember">
        <input type="checkbox" id="formCheck-2" className='check' />
        <label htmlFor="formCheck-2">Remember Me</label>
      </div>
      {error && <p className='error'>{error}</p>}
      
      <div className="input-field">
      {
              isLoading ? 
              (<LoadingBtn btnText={'Creating User...'} />)
              :
              (<input type="submit" className="input-submit" value='Submit' />)
            }
      </div>

    </div>
    </form>
  )
}

export default Signup