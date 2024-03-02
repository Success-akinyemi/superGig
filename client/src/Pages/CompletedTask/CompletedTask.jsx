import { useLocation, useNavigate } from 'react-router-dom'
import './CompletedTask.css'
import { useFetch, useFetchTaskPostedByUser } from '../../hooks/fetch.hook'
import { useEffect, useState } from 'react'
import Sidebar from '../../Components/Authorize/Sidebar/Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TaskProof from '../../Components/Authorize/TaskProof/TaskProof'
import Spinner from '../../Components/Helpers/Spinner/Spinner'
import { formatDistanceToNow } from 'date-fns'
import '../../Components/Helpers/table.css'
import ReportIcon from '@mui/icons-material/Report';

function CompletedTask() {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const { apiData } = useFetch()
    const userId = apiData?._id

    const { apiTaskData, taskServerError, isLoadingTask } = useFetchTaskPostedByUser({path, userId})
    const data = apiTaskData?.data

    const [greeting, setGreeting] = useState('')
    const [selectedCard, setSelectedCard] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false);
    const [proofImage, setProofImage] = useState(null);

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

        

    const renderPopupComponent = () => {
        switch(selectedCard) {
          case 'viewProof' :
            return (
              <div>
                <TaskProof proofImage={proofImage} />
              </div>
            );
        }
    }

    const closePopup = () => {
        setSelectedCard(null);
      };
    
      const handleViewProof = (image) => {
        setProofImage(image)
            setSelectedCard('viewProof')
      }
    
        //TOGGLE SIDEBAR
        const toggle = () => {
          setMenuOpen((prev)=>!prev)
        }

        //handle Report
        const handleReport = (userId) => {
            const confirm = window.confirm('Reporting User will lead to worker marked down \n Are you sure you want to report this account')
            try {
                
            } catch (error) {
                
            }
        }

  return (
    <div className='completedTask'>
        {selectedCard && (
            <>
            <div className='popup-overlay' onClick={closePopup}></div>
            <div className={`popup active popupBig`}>
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
                <span className='greetings'>{greeting}, and Welcome back {apiData?.username}</span>
                <div className="notifications">
                    <NotificationsNoneIcon className='bell' />
                    <span>update</span>
                </div>
            </div>
            
            <div className="container">
                {
                    isLoadingTask ? (
                        <div className="spinnerCircle">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="cardInfo">
                            <div className="taskInfo">
                                <div className="head">
                                    <h1>{data?.task}</h1>
                                    <p>Completed Rate <small>{` ${data?.completedRate} / ${data?.numberOfWorkers}`}</small></p>
                                </div>
                                <div className="body">
                                    <span>Created: { data ? formatDistanceToNow(new Date(data?.createdAt)) : '' } ago</span>
                                    <span>Total: {data?.numberOfWorkers * data?.unitPrice}</span>
                                </div>
                            </div>
                            
                            <table>
                                <thead>
                                    <tr>
                                        <th>Freelancer Name</th>
                                        <th>Profile Url</th>
                                        <th>Job Proof</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data?.approvedWorkers?.map((item) => (
                                            <tr key={item?._id} className="cardContent">
                                                <td>{item?.freelancerName}</td>
                                                <td><a className='link' href={item?.freelancerUrl} target='_blank'>View Proflie</a></td>
                                                <td onClick={() => handleViewProof(item?.imageProof)} className='jobProof'>View</td>
                                                <td className='report' onClick={() => handleReport(item._freelancerId)} ><ReportIcon className='icon' /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default CompletedTask