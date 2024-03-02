import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useFetch } from '../../../hooks/fetch.hook';

function Sidebar({ setSelectedMenuItem, onCloseClick, homeMenu }) {  
  const navigate = useNavigate()
  const [sidebarMenuItem, setSidebarMenuItem] = useState(() => {
    const savedMenuItem = localStorage.getItem('selectedMenuItem');
    return savedMenuItem || 'dashboard'
  })

  const { apiData, isLoading, serverError } = useFetch();

  const handleLogout = () => {
    localStorage.clear('authToken')
    navigate('/')
  }

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setSidebarMenuItem(menuItem)
    onCloseClick()

    localStorage.setItem('selectedMenuItem', menuItem)
  };

  return (
    <div className='sidebar'>
      <CloseIcon className='closeBtn' onClick={onCloseClick} />
        <div className="top">
            <h4>
              {
                apiData?.firstName || apiData?.middleName || apiData?.lastName 
                  ? (
                    <>
                      {`${apiData?.firstName ? `${apiData?.firstName}` : ''} ${apiData?.middleName ? `${apiData?.middleName}` : ''} ${apiData?.lastName ? `${apiData?.lastName}` : ''}`}
                    </>
                  ) : (
                    apiData?.username
                  )
              }
            </h4>
            <span>{apiData?.username}</span>
        </div>

        <div className="menu">
          {
            homeMenu ? (
              <>
              <Link className={`link ${ sidebarMenuItem === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuItemClick('dashboard')}><SpaceDashboardIcon /> Dashboard</Link>
              <Link className={`link ${ sidebarMenuItem === 'taskPoint' ? 'active' : ''}`} onClick={() => handleMenuItemClick('taskPoint')}><ContentPasteIcon /> Task Point</Link>
              <Link className={`link ${ sidebarMenuItem === 'wallet' ? 'active' : ''}`} onClick={() => handleMenuItemClick('wallet')}><AccountBalanceWalletIcon /> Wallet</Link>
              <Link className={`link ${ sidebarMenuItem === 'invite' ? 'active' : ''}`} onClick={() => handleMenuItemClick('invite')}><PeopleAltOutlinedIcon /> Invite</Link>
              <Link className={`link ${ sidebarMenuItem === 'ticket' ? 'active' : ''}`} onClick={() => handleMenuItemClick('ticket')}><LiveHelpIcon /> Support Ticket</Link>
              </>
            ) : (
              <>
                <Link className='link' to='/home' ><SpaceDashboardIcon /> Dashboard</Link>
              </>
            )
          }
        </div>

        <div className="create-task">
            <Link to='/createTask' className='link'>Create Task</Link>
        </div>

        <div className="bottom">
            <span>
              <Link to='/profile' className='link' style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                <AccountCircleOutlinedIcon /> Account
              </Link>
              </span>
            <span onClick={handleLogout}><LogoutIcon /> Logout</span>
        </div>
    </div>
  )
}

export default Sidebar