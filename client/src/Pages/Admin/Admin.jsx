import { useEffect, useState } from 'react'
import './Admin.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import AdminSidebar from '../../Components/Authorize/AdminSidebar/AdminSidebar';
import PaymentOrder from '../../Components/Admin/PaymentOrder/PaymentOrder';
import ApprovePayment from '../../Components/Admin/Helpers/ApprovePayment/ApprovePayment';

function Admin() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [bill, setBill] = useState(null)
  const [paymentOrderId, setPaymentOrderId] = useState()
  const [adminMenuItem, setAdminMenuItem] = useState(() => {
    const savedAdminMenuItem = localStorage.getItem('adminMenuItem');
    return savedAdminMenuItem || 'dashboard'
  })
  const [menuOpen, setMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('')

  //Greetings
  useEffect(() => {
      const today =  new Date();
      const currentHour = today.getHours();

      let newGreeting = '';
      if(currentHour >= 5 && currentHour > 12){
          newGreeting = 'Good Morning'
      } else if( currentHour >= 12 && currentHour < 18){
          newGreeting = 'Good Afternoon'
      } else {
          newGreeting = 'Good Evening'
      }

      setGreeting(newGreeting)
  }, [])

  const renderSelectedComponent = () => {
    switch(adminMenuItem) {
      case 'dashboard':
        return (<div>HELLO</div>);
      case 'taskPoint':
        return <PaymentOrder setSelectedCard={setSelectedCard} setPaymentOrderId={setPaymentOrderId} />
      case 'wallet':
        return (<div>HELLO</div>)
      case 'invite':
        return (<div>HELLO</div>)
      case 'support':
        return (<div>HELLO</div>)

      default: 
        return (<div>HELLO</div>)
    }
  }

  //POPUP
  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'approvePayment' :
        return (
          <div>
            <ApprovePayment paymentOrderId={paymentOrderId} />
          </div>
        );
      case 'data' :
        return (
          <div>
            data
          </div>
        )
      case 'payBills' :
        return (
          <div>
           {
              <div className='paybills-options'>  
                <span onClick={() => setBill('cable')}>Pay Cable Tv Bills</span>
                <span onClick={() => setBill('electric')}>Pay Electricity Bills</span>
              </div>
           }

          {
            bill === 'cable' && (<div>cable</div>)
          }
          {
          bill === 'electric' && (<div>Electric</div>)
          }  
          </div>
        )
      case 'funding':
        return(
          <div>
            account
          </div>
        )
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

  //TOGGLE SIDEBAR
  const toggle = () => {
    setMenuOpen((prev)=>!prev)
  }
  
  return(

    <div className='admin'>
      {selectedCard && (
        <>
          <div className='popup-overlay' onClick={closePopup}></div>
          <div className={`popup active`}>
              <span className='popup-close' onClick={closePopup}>
                Close
              </span>
            <div className='popup-content'>
                {renderPopupComponent()}
            </div>
          </div>
        </>
      )}

      <div className={`left ${menuOpen ? 'menu-open' : ''}`}>
        <AdminSidebar 
          setAdminMenuItem={setAdminMenuItem} 
          onCloseClick={toggle}
          homeMenu={true}
          />
      </div>

      <div className="right">
        <div className='menuBtn' onClick={toggle}>
            <MenuIcon className='menuIcon' />
        </div>
        <div className="top">
            <span className='greetings'>{greeting}, and Welcome back</span>
            <div className="notifications">
                <NotificationsNoneIcon className='bell' />
                <span>update</span>
            </div>
        </div>
        <div className="container">
          {renderSelectedComponent()}
        </div>
      </div>
    </div>
  )
}

export default Admin