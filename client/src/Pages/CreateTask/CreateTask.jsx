import { useEffect } from 'react'
import { useState } from 'react'
import { FaceBookTask, InstagramTask, ThreadsTask, TiktokTask, TwitterTask, selectAccountPlatform, selectCategory, selectMobilePlatform } from '../../data/createTask'
import './CreateTask.css'
import { Link } from 'react-router-dom'
import Logo from '../../Components/Helpers/Logo/Logo'
import SocialMedia from '../../Components/Task/SocialMedia/SocialMedia'
import Mobile from '../../Components/Task/Mobile/Mobile'

function CreateTask() {
    const [ category, setCategory] = useState('')

    const [ value, setValue] = useState()
    const [ task, setTask] = useState('') 




  return (
    <div className='createTask'>
        <Link to={'/home'} className="link c-logo">
            <Logo />
        </Link>
        <form className='createTaskForm'>
            <div className="inputGroup">
                <label htmlFor="">Select Platform</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">--- CATEGORY ---</option>
                    {
                        selectCategory.map((item, idx) => (
                            <option value={item.code} key={idx}>{item.category}</option>
                        ))
                    }
                </select>
            </div>

            {
                category === '1' && (
                    <div className="inputGroup">
                        <SocialMedia />
                    </div>
                )
            }

            {
                category === '2' && (
                    <div className="inputGroup">
                        <Mobile />
                    </div>
                )
            }

        </form>
    </div>
  )
}

export default CreateTask