import './Dashboard.css'
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PaymentsIcon from '@mui/icons-material/Payments';
import AddCardIcon from '@mui/icons-material/AddCard';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { recentTranscation } from '../../../data/recentTransction';
import { Link } from 'react-router-dom';
import IGImg from '../../../assets/IG.png'
import FBImg from '../../../assets/FB.png'
import TWImg from '../../../assets/TW.png'
import THRImg from '../../../assets/THR.png'
import { topTask } from '../../../data/topTask';
import { useFetch, useFetchTask, useFetchTransaction } from '../../../hooks/fetch.hook';
import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react';


function Dashboard({setSelectedCard}) {
    const { apiData, isLoading, serverError } = useFetch();
    const userId = apiData?._id
    const { isLoadingTransaction, transactionData } = useFetchTransaction(userId);
    const data = transactionData?.data

    const { isLoadingTask, apiTaskData, taskServerError } = useFetchTask()
    //console.log('DATA>', apiTaskData?.data)
    const allTask = apiTaskData?.data
    const recentTask = allTask?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);

    //if(isLoading) return <h1>IsLoading</h1>
    //if(serverError) return <h1>{serverError.message}</h1>
    const sortedData = data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    
    return (
    <div className='dashboard'>


        <div className="middle">
            <div className="cards">
                <div className="card">
                    <h2>Completed Task:</h2>
                    <span>{apiData?.completedTask}</span>
                </div>

                <div className="card">
                    <h2>Total Earnings:</h2>
                    <span>{apiData?.earningWallet}</span>
                </div>
                <div className="card">
                    <h2>Fund Balance:</h2>
                    <span>{apiData?.fundWallet}</span>
                </div>
                <div className="card">
                    <h2>Total Balance:</h2>
                    <span>{apiData?.earningWallet + apiData?.fundWallet}</span>
                </div>
            </div>

            <hr />

            <div className="more-actions">
                <span>More Actions</span>
                <hr />
                <div className="actions">
                {/**
                <span onClick={() => setSelectedCard('airtime')}><SmartphoneIcon className='icon' /> Buy Airtime</span>
                <span onClick={() => setSelectedCard('data')}><SignalWifi4BarIcon className='icon' /> Buy Data</span>
                <span onClick={() => setSelectedCard('payBills')}><PaymentsIcon className='icon' /> Pay Bills</span>
                 * 
                 */}
                <span onClick={() => setSelectedCard('funding')}><AddCardIcon className='icon' /> Fund Account</span>
                </div>
            </div>
        </div>

        <div className="banner">
            k
            <div className="banner-display">

            </div>
        </div>

        <div className="table">
            <div className="main-table">
                <span>Recent Transaction</span>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            sortedData?.length <= 0 ? (
                                <>
                                    No Transction Record
                                </>
                            ) : (
                                sortedData?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className={`${item?.credit === true ? 'incoming' : 'outgoing'} `}>{item?.credit === true ? <CallReceivedIcon /> : <CallMadeIcon />}</td>
                                        <td>N {item.amount}</td>
                                        <td className={`${item?.credit === true ? 'recieve' : 'debited'} `}>{item?.action}</td>
                                        <td>{item?.fundSource}</td>
                                        <td>{formatDistanceToNow(new Date(item?.createdAt))} ago</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="sub-table">
                <span>
                    Top Task
                    <Link className='link'>View all</Link>
                </span>
                <hr />
                <div className='top-task'>
                    <div className="tasks">
                        {
                            recentTask?.length <= 0 ? (
                                <>
                                </>
                            ) : (
                                recentTask?.map((item, idx) => (
                                    <Link className='link task' to={`/task/${item._id}`} key={idx} >
                                        <span>
                                        { item?.platformCode === '01' ? <img src={IGImg} alt={item?.platform} className='socialMedia-icon' /> : item?.platformCode === '02' ? <img src={FBImg} alt={item?.platform} className='socialMedia-icon' /> : item?.platformCode === '03' ? <img src={TWImg} alt={item?.platform} className='socialMedia-icon' /> : item?.platformCode === '05' ? <img src={TKImg} alt={item?.platform} className='socialMedia-icon' /> : item?.platformCode === '06' ? <img src={YTImg} alt={item?.platform} className='socialMedia-icon' /> : item?.platformCode === '07' ? <img src={TGImg} alt={item?.platform} className='socialMedia-icon' /> : <img src={THRImg} alt={item?.platform} className='socialMedia-icon'/> }
                                            {item?.platform}
                                        </span>
        
                                        <span>
                                            {item.pricePerFreelancer}
                                            &gt;
                                        </span>
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard