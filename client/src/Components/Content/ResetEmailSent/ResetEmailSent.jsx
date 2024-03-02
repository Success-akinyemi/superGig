import { useLocation } from 'react-router-dom';
import './ResetEmailSent.css'

function ResetEmailSent() {
    const location = useLocation();
    const msg = location.state ? location.state.resMsg : 'your email address';

    return (
        <div className="v-registration">
          <div className="v-container">
            <div className="v-box">
              <form className={`box-verifyEmail`} >
                  <div className="top-header">
                    <h3>Reset Email Sent</h3>
                    <small>A password reset email successfully sent to you</small>
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

export default ResetEmailSent