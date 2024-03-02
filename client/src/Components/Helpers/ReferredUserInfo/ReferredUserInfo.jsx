import './ReferredUserInfo.css'

function ReferredUserInfo({userRefInfo}) {
  return (
    <div>
        <h3>username</h3>
        <p>{userRefInfo?.username}</p>
        <h3>Email</h3>
        <p>{userRefInfo?.email}</p>
        <h3>Verified Account</h3>
        <p>{userRefInfo?.verified ? 'Verified' : 'Pending'}</p>
        {/**
         
        <h3>Total Transaction</h3>
        <p>{userRefInfo?.totalDepositedAmount}</p>
         */}
    </div>
  )
}

export default ReferredUserInfo