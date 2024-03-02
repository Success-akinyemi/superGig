import { useState } from 'react';
import AvailableTask from '../../Helpers/AvailableTask/AvailableTask';
import './TaskPoint.css'
import ReplayIcon from '@mui/icons-material/Replay';
import PostedTask from '../../Helpers/PostedTask/PostedTask';

function TaskPoint() {
  const [selectedTable, setSelectedTable] = useState('available')
  const [ active, setActive ] = useState('available')
  const renderSelectedTable = () => {
    switch(selectedTable) {
      case 'available':
        return <AvailableTask />;
      case 'posted':
        return <PostedTask />


      default: 
        return <AvailableTask />
    }
  }

  const handleTableItemClick = (menuItem) => {
    setActive(menuItem)
    setSelectedTable(menuItem);
  };

  return (
    <div className='taskPoint'>
        <p className='title'>TaskPoint</p>

        <div className="table-bg">
          <div className="top">
            <div className="category">
              <span className={`${active === 'available' ? 'active' : ''}`} onClick={() => handleTableItemClick('available')}>Available</span>
              <span className={`${active === 'posted' ? 'active' : ''}`} onClick={() => handleTableItemClick('posted')}>Posted</span>
              <span>Completed</span>
              <span>Rejected</span>
            </div>

            <div className="reload">
              <ReplayIcon className='icon'/>
            </div>
          </div>

          <div className="table-card">
            {renderSelectedTable()}
          </div>
        </div>
    </div>
  )
}

export default TaskPoint