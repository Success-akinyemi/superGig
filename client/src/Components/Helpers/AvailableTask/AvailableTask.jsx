import './AvailableTask.css'
import '../table.css'
import { topTask } from '../../../data/topTask'
import IGImg from '../../../assets/IG.png'
import FBImg from '../../../assets/FB.png'
import TWImg from '../../../assets/TW.png'
import THRImg from '../../../assets/THR.png'
import TKImg from '../../../assets/TK.png'
import { Link } from 'react-router-dom'
import { useFetchTask } from '../../../hooks/fetch.hook'
import { formatDistanceToNow } from 'date-fns'
import Spinner from '../Spinner/Spinner'

function AvailableTask() {
    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask()
    //console.log('DATA>', apiTaskData?.data)
    const allTask = apiTaskData?.data
    const sortedData = allTask?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    return (
    <table className='availableTask'>
    <thead>
        <tr>
            <th></th>
            <th>Earning</th>
            <th>Job Description</th>
            <th>Completion</th>
            <th></th>
        </tr>
    </thead>

    <tbody>
        {
            isLoadingTask ? (
                <tr style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <Spinner />
                </tr>
            ) : (
                sortedData?.map((item, idx) => (
                    <tr key={idx}>
                         <td className='t-1'>                                        
                            <Link className='link' to={`/task/${item._id}`}>
                            { item.platformCode === '01' ? <img src={IGImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '02' ? <img src={FBImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '03' ? <img src={TWImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '05' ? <img src={TKImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '03' ? <img src={TWImg} alt={item.platform} className='socialMedia-icon' /> : item.platformCode === '05' ? <img src={TKImg} alt={item.platform} className='socialMedia-icon' /> : <img src={THRImg} alt={item.platform} className='socialMedia-icon'/> }
                            {item.platform}
                            </Link>
                        </td>
                            <td>{item.pricePerFreelancer}</td>
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

export default AvailableTask