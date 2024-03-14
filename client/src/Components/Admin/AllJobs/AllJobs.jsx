import { useState } from 'react';
import './AllJobs.css'
import AllJob from '../Helpers/AllJob/AllJob';
import CompleteJob from '../Helpers/CompleteJob/CompleteJob';
import ReplayIcon from '@mui/icons-material/Replay';

function AllJobs() {
    const [selectedTable, setSelectedTable] = useState('available')
    const [ active, setActive ] = useState('available')
    const [total, setTotal] = useState()

    const renderSelectedTable = () => {
      switch(selectedTable) {
        case 'available':
          return <AllJob setTotal={setTotal} />;
        case 'posted':
          return <CompleteJob setTotal={setTotal} />
  
  
        default: 
          return <AllJob />
      }
    }

    const handleTableItemClick = (menuItem) => {
        setActive(menuItem)
        setSelectedTable(menuItem);
      };
  
  return (
    <div className='allJobs'>
        <p className='title'>TaskPoint</p>

        <div className="table-bg">
        <div className="top">
            <div className="category">
                <span className={`${active === 'available' ? 'active' : ''}`} onClick={() => handleTableItemClick('available')}>Available</span>
                <span className={`${active === 'posted' ? 'active' : ''}`} onClick={() => handleTableItemClick('posted')}>Completed</span>
                <span>Completed</span>
                <span>Rejected</span>
            </div>

            <select onClick={(e) => handleTableItemClick(e.target.value)}>
                <option value='available'>Available</option>
                <option value='posted' >Completed</option>
                <option>Completed</option>
                <option>Rejected</option>
            </select>

            <div className="total">
                Total: {total}
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

export default AllJobs