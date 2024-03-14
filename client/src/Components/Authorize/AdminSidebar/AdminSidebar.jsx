import { Link, useNavigate } from 'react-router-dom'
import './AdminSidebar.css'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useFetch } from '../../../hooks/fetch.hook';
import AssignmentIcon from '@mui/icons-material/Assignment';

function AdminSidebar({ setAdminMenuItem, onCloseClick, homeMenu }) {  
  const navigate = useNavigate()
  const [sidebarMenuItem, setSidebarMenuItem] = useState(() => {
    const savedAdminMenuItem = localStorage.getItem('adminMenuItem');
    return savedAdminMenuItem || 'dashboard'
  })

  const { apiData, isLoading, serverError } = useFetch();

  const handleLogout = async () => {
    await localStorage.removeItem('authToken')
    navigate('/')
    window.location.reload()
  }

  const handleMenuItemClick = (menuItem) => {
    setAdminMenuItem(menuItem);
    setSidebarMenuItem(menuItem)
    onCloseClick()

    localStorage.setItem('adminMenuItem', menuItem)
  };

  return (
    <div className='adminSidebar'>
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
              <Link className={`link ${ sidebarMenuItem === 'taskPoint' ? 'active' : ''}`} onClick={() => handleMenuItemClick('taskPoint')}><ContentPasteIcon /> Payment order</Link>
              <Link className={`link ${ sidebarMenuItem === 'wallet' ? 'active' : ''}`} onClick={() => handleMenuItemClick('wallet')}><AssignmentIcon /> All Jobs</Link>
              <Link className={`link ${ sidebarMenuItem === 'invite' ? 'active' : ''}`} onClick={() => handleMenuItemClick('invite')}><PeopleAltOutlinedIcon /> Invite</Link>
              <Link className={`link ${ sidebarMenuItem === 'support' ? 'active' : ''}`} onClick={() => handleMenuItemClick('support')}><LiveHelpIcon /> Support Ticket</Link>
              </>
            ) : (
              <>
                <Link className='link' to='/supegig-a' ><SpaceDashboardIcon /> Dashboard</Link>
              </>
            )
          }
        </div>

        <div className="create-task">
            <Link to='/createTask' className='link'>Create Task</Link>
        </div>

        <div className="bottom">
            <span>
              <Link to='/home' className='link' style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                <AccountCircleOutlinedIcon /> Home
              </Link>
              </span>
            <span onClick={handleLogout}><LogoutIcon /> Logout</span>
        </div>
    </div>
  )
}

export default AdminSidebar