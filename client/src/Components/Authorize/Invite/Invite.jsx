import toast from 'react-hot-toast';
import { useFetch, useFetchReferres } from '../../../hooks/fetch.hook';
import './Invite.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import ReferredUserInfo from '../../Helpers/ReferredUserInfo/ReferredUserInfo';

function Invite() {
    const { apiData, isLoading, serverError } = useFetch();
    const { apiReferresData, isLoadingReferres, referresServerError} = useFetchReferres()
    const refLink = apiData?.referralLink
    const refUsers = apiReferresData?.data  
    //console.log('Link', apiReferresData?.data)
    const [selectedCard, setSelectedCard] = useState(null)
    const [ userRefInfo, setRefUserInfo ] = useState({})

    const clicked = () => {
        toast.success('Copied')
    }

            //POPUP
            const renderPopupComponent = () => {
                switch(selectedCard) {
                  case 'moreInfo' :
                    return (
                      <div>
                        <ReferredUserInfo userRefInfo={userRefInfo}  />
                      </div>
                    );
                }
              }
            
              useEffect(() => {
                const handleClickOutside = (event) => {
                  if (event.target.classList.contains('popup-overlay')) {
                    setSelectedCard(null);
                  }
                };
            
                document.addEventListener('click', handleClickOutside);
            
                return () => {
                  document.removeEventListener('click', handleClickOutside);
                };
              }, []);
            
              const closePopup = () => {
                setSelectedCard(null);
              };

              const handleReferredUser = (item) => {
                setRefUserInfo(item)
                setSelectedCard('moreInfo')
              }

  return (
    <div className='invite'>
        {selectedCard && (
            <>
            <div className='popup-overlay' onClick={closePopup}></div>
            <div className={`popup active`}>
                <span className='popup-close' onClick={closePopup}>
                    Close
                </span>
                <div className='popup-content'>
                <div className="inner">
                    {renderPopupComponent()}
                </div>
                </div>
            </div>
            </>
        )}
        <div className="top">
            <p>
                Earn as mush as 10% on every deposit made by everyone you invite to <b>SuperGig</b> <br />
                Earn more by reffering others
            </p>

            <div className="linkCard">
                <label>Your Ref Link:</label>
                <input type="text" value={refLink} disabled />
                <CopyToClipboard text={refLink} onCopy={clicked} >
                    <span>Copy</span>
                </CopyToClipboard>
            </div>
        </div>

        <div className="body">
            <div className="infoTop">
                <h2>Total Invites</h2>
                <span>total: {refUsers?.length}</span>
            </div>

            <div className="content">
                <ol>
                    <li className='heading'>
                        <span className="groupOne title">
                            <p className="username">username</p>
                            <p className="email">email</p>
                        </span>
                        <span className="grouptwo title">
                            View
                        </span>
                    </li>
                    {
                        refUsers?.map((item) => (
                            <li key={item?._id}>
                                <span className="groupOne">
                                    <p className="username">{item?.username}</p>
                                    <p className="email">{item?.email}</p>
                                </span>
                                <span className="groupTwo" onClick={() => handleReferredUser(item)}>
                                    <MoreVertIcon className='icon' />
                                </span>
                            </li>
                        ))
                    }
                </ol>
            </div>

        </div>
    </div>
  )
}

export default Invite