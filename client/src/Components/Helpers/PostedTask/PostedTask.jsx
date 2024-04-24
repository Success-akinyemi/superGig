import './PostedTask.css'
import '../table.css'
import IGImg from '../../../assets/IG.png'
import FBImg from '../../../assets/FB.png'
import TWImg from '../../../assets/TW.png'
import THRImg from '../../../assets/THR.png'
import TKImg from '../../../assets/TK.png'
import YTImg from '../../../assets/YT.png'
import TGImg from '../../../assets/TG.png'
import { topTask } from '../../../data/topTask'
import { useFetchTaskPostedByUser } from '../../../hooks/fetch.hook'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
function PostedTask() {
    const { apiTaskData, taskServerError, isLoadingTask } = useFetchTaskPostedByUser()
    const data = apiTaskData?.data
    //console.log('DATA POSTED', data)
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
   
    return (
    <table className='postedTask'>
    <thead>
        <tr>
            <th></th>
            <th>Amount</th>
            <th>Job Description</th>
            <th>Completion</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
        {
            isLoadingTask ? (
                <tr>

                        <Spinner />
                    
                </tr>
            ) : (

                sortedData?.map((item, idx) => (
                    <tr key={idx}>
                        <td className='t-1'>
                            <Link className='link' to={`/postedTask/${item._id}`}>
                            { item.platformCode === '01' ? <img src={IGImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '02' ? <img src={FBImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '03' ? <img src={TWImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '05' ? <img src={TKImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '06' ? <img src={YTImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '07' ? <img src={TGImg} alt={item.platform} className='socialMedia-icon' /> : <img src={THRImg} alt={item.platform} className='socialMedia-icon'/> }
                                {item.platform}
                            </Link>                                        
                        </td>
                        <td>{item.unitPrice*item.numberOfWorkers}</td>
                        <td>{item.task}</td>
                        <td>{item.completedRate}/{item.numberOfWorkers}</td>
                        <td>{formatDistanceToNow(new Date(item.createdAt))} ago</td>
                    </tr>
                ))
            ) 
        }
    </tbody>
</table>
  )
}

export default PostedTask