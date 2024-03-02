import { useNavigate, useParams } from 'react-router-dom';
import './VerifyUser.css'
import { useEffect } from 'react';
import { verifyUser } from '../../../helpers/helpers';
import Spinner from '../../Helpers/Spinner/Spinner';

function VerifyUser() {
    const navigate = useNavigate()
    const { id, token } = useParams();
    
    useEffect(() => {
        console.log('ID', id, 'TOKEN', token)
        const verify = async () => {
            try {
                const res = await verifyUser({ id, token})

                if(res.data.success){
                    navigate('/register')
                }
            } catch (error) {
                
            }    
        }

        verify();
    }, [id, token])
    return (
        <div className="verify-registration">
          <div className="verify-container">
            <div className="verify-box">
              <form className={`box-verifyUser`} >
                  <div className="top-header">
                    <h3>Verifying User</h3>
                  </div>
    
                  <div className="input-group">
                        <Spinner />
                  </div>
              </form>
            </div>
          </div>
        </div>
      )
}

export default VerifyUser