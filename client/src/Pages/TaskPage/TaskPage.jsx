import { useEffect, useState } from 'react'
import { useFetch, useFetchTask } from '../../hooks/fetch.hook'
import './TaskPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Logo from '../../Components/Helpers/Logo/Logo';
import SubmitTaskForm from '../../Components/Authorize/SubmitTaskForm/SubmitTaskForm';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../Components/Authorize/Sidebar/Sidebar';
import toast from 'react-hot-toast';
import Spinner from '../../Components/Helpers/Spinner/Spinner';

function TaskPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const { apiData } = useFetch()
    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask(path)
    const task = apiTaskData?.data

    let userHasAccount

    const platformCode = task?.platformCode
    if(platformCode === '01'){
      userHasAccount = apiData.instagramAccount
      if(!userHasAccount){
        toast.error('Update Your Account to Perform task')
        navigate('/profile')
      }
    }
    if(platformCode === '02'){
      userHasAccount = apiData.facebookAccount
      if(!userHasAccount){
        toast.error('Update Your Account to Perform task')
        navigate('/profile')
      }
    }
    if(platformCode === '03'){
      userHasAccount = apiData.twitterAccount
      if(!userHasAccount){
        toast.error('Update Your Account to Perform task')
        navigate('/profile')
      }
    }
    if(platformCode === '04'){
      userHasAccount = apiData.threadsAccount
      if(!userHasAccount){
        toast.error('Update Your Account to Perform task')
        navigate('/profile')
      }
    }
    if(platformCode === '05'){
      userHasAccount = apiData.tiktokAccount
      if(!userHasAccount){
        toast.error('Update Your Account to Perform task')
        navigate('/profile')
      }
    }

    const [greeting, setGreeting] = useState('')
    const [ taskClicked, setTaskClicked ] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false);


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

      //POPUP
  const renderPopupComponent = () => {
    switch(selectedCard) {
      case 'submitTaskForm' :
        return (
          <div>
            <SubmitTaskForm  userProfile={userHasAccount} taskId={path} userId={apiData?._id}/>
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

  const handleSubmitTask = () => {
    if(setTaskClicked){
        setSelectedCard('submitTaskForm')
    }
  }

    //TOGGLE SIDEBAR
    const toggle = () => {
      setMenuOpen((prev)=>!prev)
    }

    return (
    <div className='taskPage'>
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

        <div className={`left ${menuOpen ? 'menu-open' : ''}`}>
          <div className="card">
            <div className="top">
              <Sidebar 
                onCloseClick={toggle}
                homeMenu={false}
              />
            </div>
          </div>
        </div>

        <div className="right">
        <div className='menuBtn' onClick={toggle}>
            <MenuIcon className='menuIcon' />
        </div>

        <div className="top">
            <span className='greetings'>Welcome back {apiData?.username}</span>
            <div className="notifications">
                <NotificationsNoneIcon className='bell' />
                <span>update</span>
            </div>
          </div>
            <div className="container">
              {
                isLoadingTask ? (
                  <Spinner />
                ) : (
                  <div className="card">
                      <span>Platform: <p>{task?.platform}</p></span>
                      <span>Task: <p>{task?.task}</p></span>
                      <span>Platform: <p>{task?.platform}</p></span>
                      <span>Complete rate: <p>{task?.completedRate}/{task?.numberOfWorkers}</p></span>
                      <span>Status: <p>{task?.completedRate <= task?.numberOfWorkers ? 'Active' : 'Completed'}</p></span>
                  </div>
                )
              }

                <div className="error warning">
                    All jobs must be done properly before submitting <br />
                    failure to complete jobs can lead to permanent ban of account
                </div>

                <div className="startJob">
                    <button onClick={() => setTaskClicked(true)}><a className='link' target='_blank' href={`${task?.taskUrl}`}>Start Job</a></button>
                </div>
            </div>
            <div className="submitBtn">
                <button disabled={taskClicked === false} onClick={handleSubmitTask}>Submit proof of work</button>
            </div>
        </div>
    </div>
  )
}

export default TaskPage