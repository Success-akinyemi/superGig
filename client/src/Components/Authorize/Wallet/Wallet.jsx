import { useEffect, useState } from 'react';
import './Wallet.css'
import { useFetch, useFetchPaymentOrder } from '../../../hooks/fetch.hook';
import WithdrawBonus from '../WithdrawBonus/WithdrawBonus';
import WithdrawEarning from '../WithdrawEarning/WithdrawEarning';
import { formatDistanceToNow } from 'date-fns'

function Wallet() {
  const { apiData, isLoading } = useFetch()
  const userId = apiData?._id
  const { isLoadingPayment, paymentData } = useFetchPaymentOrder()
  console.log('first', paymentData)
  const data = paymentData?.data
  const [selectedCard, setSelectedCard] = useState(null)

  const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

        //POPUP
        const renderPopupComponent = () => {
          switch(selectedCard) {
            case 'withdrwBonus' :
              return (
                <div>
                  <WithdrawBonus apiData={apiData} />
                </div>
              );
            case 'withdrawEarning' :
              return (
                <div>
                  <WithdrawEarning apiData={apiData} />
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

  return (
    <div className='wallet'>
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
          <div className="card">
            <h1>Bounus Balance:</h1>
            <p>NGN {apiData?.totalReferralEarnings}</p>
          </div>
          <div className="card">
            <h1>Wallet Balance:</h1>
            <p>NGN {apiData?.earningWallet}</p>
          </div>
        </div>

        <div className="actions">
          <span onClick={() => setSelectedCard('withdrwBonus')}>
            Withdraw Bonus
          </span>
          <span onClick={() => setSelectedCard('withdrawEarning')}>
            Withdraw
          </span>
        </div>

        <div className="body">
          <h3>Withdrawal History</h3>
          <div className="card">
            {
              sortedData?.map((item) => (
                <div className="infoCard">
                  <div>
                    <small className='id'>{item?._id}</small>
                    <p className="bankName">{item?.bankName}</p>
                  </div>
                  <div>
                    <p className="amount">{item?.amount}</p>
                    <p className="status">{item?.status}</p>
                    <p className="date">{formatDistanceToNow(new Date(item?.createdAt))} ago</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Wallet