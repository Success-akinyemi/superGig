import './TaskProof.css'

function TaskProof({proofImage}) {
  return (
    <div className='taskProof'>
        Screenshoot Proof 
        <img src={proofImage} alt="" className="image" />
    </div>
  )
}

export default TaskProof