import { useLocation } from 'react-router-dom';
import './VerificationEmailSent.css'

function VerificationEmailSent() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg : 'Please Check your Email to verify Email';
  
    return (
        <div className="v-registration">
          <div className="v-container">
            <div className="v-box">
              <form className={`box-verifyEmail`} >
                  <div className="top-header">
                    <h3>Account Creeated Successfully</h3>
                    <small>Your account has been successfully created</small>
                  </div>
    
                  <div className="input-group">
                        <p>{msg}</p>
                  </div>
              </form>
            </div>
          </div>
        </div>
      )
}

export default VerificationEmailSent