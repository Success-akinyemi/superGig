import { useEffect, useState } from 'react'
import Dashboard from '../../Components/Authorize/Dashboard/Dashboard'
import Sidebar from '../../Components/Authorize/Sidebar/Sidebar'
import './Home.css'
import TaskPoint from '../../Components/Authorize/TaskPoint/TaskPoint'
import Wallet from '../../Components/Authorize/Wallet/Wallet'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import AirtimeComponent from '../../Components/Helpers/AirtimeComponent/AirtimeComponent'
import DataComponent from '../../Components/Helpers/DataComponent/DataComponent'
import AccountFunding from '../../Components/Helpers/AccountFunding/AccountFunding'
import CableTvComponent from '../../Components/Helpers/CableTvComponent/CableTvComponent'
import ElectricityComponent from '../../Components/Helpers/ElectricityComponent/ElectricityComponent'
import Invite from '../../Components/Authorize/Invite/Invite'


function Home() {
  const [selectedCard, setSelectedCard] = useState(null)
  const [bill, setBill] = useState(null)
  const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
    const savedMenuItem = localStorage.getItem('selectedMenuItem');
    return savedMenuItem || 'dashboard'
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
    switch(selectedMenuItem) {
      case 'dashboard':
        return <Dashboard setSelectedCard={setSelectedCard} />;
      case 'taskPoint':
        return <TaskPoint />
      case 'wallet':
        return <Wallet />
      case 'invite':
        return <Invite />

      default: 
        return <Dashboard />
    }
  }

  //POPUP
  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'airtime' :
        return (
          <div>
            <AirtimeComponent />
          </div>
        );
      case 'data' :
        return (
          <div>
            <DataComponent />
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
            bill === 'cable' && ( <CableTvComponent />)
          }
          {
          bill === 'electric' && ( <ElectricityComponent />)
          }  
          </div>
        )
      case 'funding':
        return(
          <div>
            <AccountFunding />
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

    <div className='home'>
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
        <Sidebar 
          setSelectedMenuItem={setSelectedMenuItem} 
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

export default Home