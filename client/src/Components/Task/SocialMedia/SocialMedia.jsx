import { useEffect, useState } from "react";
import { FaceBookTask, InstagramTask, TelegramTask, ThreadsTask, TiktokTask, TwitterTask, YoutubeTask, selectAccountPlatform } from "../../../data/createTask";
import "./SocialMedia.css";
import { useFetch } from "../../../hooks/fetch.hook";
import { createTask } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SocialMedia() {
  const navigate = useNavigate()
  const { apiData } = useFetch()
  const [ loadingTask, setLoadingTask ] = useState(false)
  const [platform, setPlatform] = useState("");
  const [platformCode, setPlatformCode] = useState("");

  const [ task, setTask ] = useState('')
  const [ taskId, setTaskId ] = useState('')
  const [ unitPrice, setUnitPrice ] = useState()
  const [ pricePerFreelancer, setPricePerFreelancer ] = useState()
  const [ numberOfWorkers, setNumberOfWorkers ] = useState()
  const [ minWorkers, setMinWorkers ] = useState()
  const [ taskUrl, setTaskUrl ] = useState('')

  const [ taskPreview, setTaskPreview ] = useState(false)
  const handletakPreview = (e) => {
    e.preventDefault()
    if(platform !='' || task !='' || taskUrl !='' || numberOfWorkers !='' ){
      setTaskPreview((prev) => !prev)
    }
  }

  const handleAccount = (e) => {
    const selectedOption = selectAccountPlatform.find(item => item.code === e.target.value)
    
    if(selectedOption){
      setPlatformCode(selectedOption.code)
      setPlatform(selectedOption.platform)
    }
  }

  const handleTask = (e, taskOption) => {
    const selectedTask = taskOption.find(item => item.taskId === e.target.value);

    if(selectedTask){
      setTask(selectedTask.task)
      setTaskId(selectedTask.taskId)
      setUnitPrice(selectedTask.unitPrice)
      setPricePerFreelancer(selectedTask.pricePerFreelancer)
      setMinWorkers(selectedTask.minWorkers)
    }
  };

  const handleTaskUrl = (e) => {
    setTaskUrl(e.target.value)
  }
  useEffect(() => {
    console.log('PLATFORM', platform)
    console.log('PLATFROM CODE', platformCode)
    console.log('TASK', task)
    console.log('TASK ID', taskId)
    console.log('UNIT PRICE', unitPrice)
    console.log('PRICE PER FREELANCER', pricePerFreelancer)
    console.log('TASK URL', taskUrl)
    console.log('NUMBER OF FREELANCER', numberOfWorkers)
  }, [platform, platformCode, task, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers])


  const handleSetNewTask = async (e) => {
    e.preventDefault()
    const createdBy = apiData?._id
    try {
      setLoadingTask(true)
      console.log(platform, platformCode, task, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers, createdBy)
      
      const res = await createTask({ platform, platformCode, task, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers, createdBy })
      if(res?.data.success){
        navigate('/home')
      }
    } catch (error) {
      toast.error('Failed to create Task')
    } finally {
      setLoadingTask(false)
    }
  }
  const getTaskOptions = () => {
    switch(platformCode) {
      case '01':
        return InstagramTask;
      case '02':
        return FaceBookTask
      case '03':
        return TwitterTask
      case '04':
        return ThreadsTask
      case '05':
        return TiktokTask
      case '06':
        return YoutubeTask
      case '07':
          return TelegramTask
      default:
        return []
    }
  }

  return (
    <div className="socialMedia">
      <div className="inputGroup">
        <label htmlFor="">Select Type of Account</label>
        <select onChange={handleAccount}>
          <option value="">-- SELECT ACCOUNT --</option>
          {selectAccountPlatform.map((item, idx) => (
            <option key={idx} value={item.code}>
              {item.platform}
            </option>
          ))}
        </select>
      </div>

      {platformCode && (
        <div className="inputGroup">
          <label htmlFor="">Select Type of Task</label>
          <select onChange={(e) => handleTask(e, getTaskOptions(platformCode))}>
            <option value="">-- SELECT TASK --</option>
            {getTaskOptions(platformCode).map((item, idx) => (
              <option key={idx} value={item.taskId}>
                {item.task}
              </option>
            ))}
          </select>
        </div>
      )}

      {task && (
        <div className="inputGroup">
          <label htmlFor="">Provide Task Url Link</label>
          <input type="text" className="inputField" onChange={handleTaskUrl} />
        </div>
      )}

      {taskUrl && (
        <div className="inputGroup">
          <label htmlFor="">Number of workers needed</label>
          <input type="number" className="inputField" onChange={(e) => setNumberOfWorkers(e.target.value)} />
          { numberOfWorkers < minWorkers && <small className="error">Minimium workers required {minWorkers} </small> }
        </div>
      )}

      {numberOfWorkers && (
        <button className="socialMediaBtn" onClick={handletakPreview}>Done</button>
      )}

      { taskPreview && (
        <div className="inputGroup">
          <div className="head">Task Overview</div>

          <div className="body">
            <p> <h3 className="title">Account:</h3> <span className="item">{platform}</span></p>
            <p> <h3 className="title">Task:</h3> <span className="item">{task}</span></p>
            <p> <h3 className="title">Number of workers Needed:</h3> <span className="item">{numberOfWorkers}</span></p>
            <br />
            <hr />
            <p> <h3 className="title">Total:</h3> <span className="item">{numberOfWorkers * unitPrice}</span></p>
          </div>

          <button onClick={handleSetNewTask} disabled={loadingTask} className="comfirmBtn">{loadingTask ? 'Creating' : 'Comfirm and Cheeckout'}</button>
        </div>
      )}

    </div>
  );
}

export default SocialMedia;

