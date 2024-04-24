import { useEffect, useState } from 'react';
import './Profile.css'
import Sidebar from '../../Components/Authorize/Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import { useFetch, useFetchAccount } from '../../hooks/fetch.hook';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { addSocialMediaAccount, updateUser, uploadBankInfo } from '../../helpers/helpers';
import { selectAccountPlatform } from '../../data/createTask';
import toast from 'react-hot-toast';
import { bankCode } from '../../data/bankCode';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);
    const [greeting, setGreeting] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isUpdatingAccount, setIsUpdatingAccount ] = useState(false)
    const { apiData } = useFetch()
    const { apiAccountData } = useFetchAccount()
    const accountData = apiAccountData?.data
    const [platform, setPlatform] = useState("");
    const [platformCode, setPlatformCode] = useState("");
    const [ accountValue, setAccountValue ] = useState('')
    const userData = apiData
    console.log(userData?._id)

    const [accountNumber, setAccountNumber] = useState()
    const [getBankCode, setGetBankCode] = useState()
    const [fetchingAccountDetails, setFetchingAccountDetails] = useState(false)
    const [accountName, setAccountName] = useState('')
    const [getBankName, setGetBankName] = useState('')
    const [fetchError, setFetchError] = useState(null)
    const [updatingBankInfo, setUpdatingBankInfo] = useState(false)

    const [selectedMenuItem, setSelectedMenuItem] = useState(() => {
      const savedMenuItem = localStorage.getItem('selectedMenuItem');
      return savedMenuItem || 'dashboard'
    })

    //handle get bank code:
    const handleBankCode = (e) => {
        const selectedAccount = bankCode.find(item => item.code === e.target.value)

        if(selectedAccount)
        setGetBankCode(selectedAccount.code)
        setGetBankName(selectedAccount.name)
    }

    useEffect(() => {
        console.log(accountNumber, getBankCode)
        if(accountNumber?.length === 10 && getBankCode){
            const fetchData = async () => {
                try {
                    setFetchingAccountDetails(true)
                    setAccountName('')
                    const response = await fetch(`${import.meta.env.VITE_VERIFY_URL}?account_number=${accountNumber}&bank_code=${getBankCode}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${import.meta.env.VITE_BANK_TOKEN}` // Replace with your actual Bearer token
                        }
                    });
             
                    if (!response.ok) {
                        setFetchError('Failed to get Bank Details')
                        throw new Error('Request failed');
                    }
             
                    const data = await response.json();
                    if(data?.status === true){
                        setAccountName(data?.data?.account_name)
                    }
                    console.log(data);
                } catch (error) {
                    console.log(error);
                } finally{
                    setFetchingAccountDetails(false)
                }
            };
             
            fetchData();
        }
    }, [accountNumber, getBankCode])

    const updateBankInfo = async () => {
        try {
            setUpdatingBankInfo(true)
            if(!accountName){
                toast.error('Bank Name and Account Name Needed')
                return;
            }
            if(!getBankName){
                toast.error('Bank Name and Account Name Needed')
                return;
            }
            if(!accountNumber){
                toast.error('Bank Name and Account Name Needed')
                return;
            }
            const userId = apiData?._id
            const res = await uploadBankInfo({userId, getBankName, accountName, accountNumber})
        } catch (error) {
            console.log('FAILED TO UPDATE BANK INFO', error)
        } finally{
            setUpdatingBankInfo(false)
        }
    }

    const userId = userData?._id
    console.log('ID', userId)
    useEffect(() => {
        setFormData({...formData, userId})
    }, [userId])
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            
            console.log('UPP', formData)
            setIsLoading(true)
            const res = await updateUser(formData)
        } catch (error) {
            console.log('ERROR UPDATING USER', error)
        } finally {
            setIsLoading(false)
        }
    }

    const addAccount = async (e) => {
        e.preventDefault()
        const userId = apiData?._id
        try {
            if(!accountValue){
                toast.error('Enter your account url')
                return;
            }
            //check urll based on platformCode
            setIsUpdatingAccount(true)
            console.log(accountValue, platformCode)
            const res = await addSocialMediaAccount({accountValue, platformCode, userId})
        } catch (error) {
            console.log('FAILED TO ADD USER ACCOUNT', error)
        } finally {
            setIsUpdatingAccount(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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

        //TOGGLE SIDEBAR
        const toggle = () => {
            setMenuOpen((prev)=>!prev)
        }

        const handleAccount = (e) => {
            const selectedOption = selectAccountPlatform.find(item => item.code === e.target.value)
            
            if(selectedOption){
              setPlatformCode(selectedOption.code)
              setPlatform(selectedOption.platform)
            }
        }

        const handleLogout = () => {
            localStorage.clear('authToken')
            navigate('/')
          }

  return (
    <div className='profile'>
        <div className={`left ${menuOpen ? 'menu-open' : ''}`}>
          <div className="card">
            <div className="top">
              <Sidebar
                setSelectedMenuItem={setSelectedMenuItem} 
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
                <div className="logout">
                    <span className='logoutBtn' onClick={handleLogout}>Logout</span>
                </div>
                <div className="infoCard">
                    <h2>Update Account</h2>
                    <p>To complete task update accounts here</p>

                    <div className="content">
                        <div className="inputField">
                            <label>First Name</label>
                            <input defaultValue={userData?.firstName} onChange={handleChange} id='firstName' type='text' />
                        </div>
                        <div className="inputField">
                            <label>Middle Name</label>
                            <input defaultValue={userData?.middleName} onChange={handleChange} id='middleName' type='text' />
                        </div>
                        <div className="inputField">
                            <label>Last Name</label>
                            <input defaultValue={userData?.lastName} onChange={handleChange} id='lastName' type='text' />
                        </div>                    
                        <div className="inputField">
                            <label>Username</label>
                            <input defaultValue={userData?.username} onChange={handleChange} id='username' type='text' />
                        </div>
                        <div className="inputField">
                            <label>Email</label>
                            <input defaultValue={userData?.email} onChange={handleChange} disabled />
                        </div>
                        <div className="inputField">
                            <label>Phone Number</label>
                            <input defaultValue={userData?.phoneNumber} onChange={handleChange} id='phoneNumber' type='number' minLength={11} maxLength={11}  />
                        </div>
                        <div className="inputField">
                            <label>Gender</label>
                            <input defaultValue={userData?.gender} onChange={handleChange} id='gender' type='text'/>
                        </div>

                        <div>
                            {
                                apiData?._id && (
                                    <button onClick={handleUpdate} disabled={isLoading}>{isLoading ? 'Updating...' : 'Save'}</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="infoCard">
                <h2>Update Social Media Account</h2>
                <p>To perform task update your Social media account here</p>

                <form className="content" onSubmit={handleUpdate}>
                    <div className="inputField">
                        <label>Instagram Account</label>
                        <input defaultValue={userData?.instagramAccount} disabled id='firstName' type='text' />
                    </div>
                    <div className="inputField">
                        <label>Facebook Account</label>
                        <input defaultValue={userData?.facebookAccount} disabled id='middleName' type='text' />
                    </div>
                    <div className="inputField">
                        <label>Twitter(X) Account</label>
                        <input defaultValue={userData?.twitterAccount} disabled id='lastName' type='text' />
                    </div>                    
                    <div className="inputField">
                        <label>Threads Account</label>
                        <input defaultValue={userData?.threadsAccount} disabled />
                    </div>
                    <div className="inputField">
                        <label>Tiktok Account</label>
                        <input defaultValue={userData?.tiktokAccount} disabled id='username' type='text' />
                    </div>

                    <hr />
                    <h3>Add Your Account here</h3>

                    <div className="card">
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

                        <div className="inputArea">
                            {
                                platformCode === '01' &&(
                                    <input type="text" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Instagram account url here' required className="account" />
                                )
                            }
                            {
                                platformCode === '02' &&(
                                    <input type="text" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Facebook account url here' required className="account" />
                                )
                            }                            
                            {
                                platformCode === '03' &&(
                                    <input type="text" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Twitter account url here' required className="account" />
                                )
                            }                    
                            {
                                platformCode === '04' &&(
                                    <input type="text"  value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Threads account url here' required className="account" />
                                )
                            }
                            {
                                platformCode === '05' &&(
                                    <input type="text" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Tiktok account url here' required className="account" />
                                )
                            }
                            {
                                platformCode === '06' &&(
                                    <input type="text" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Youtube account url here' required className="account" />
                                )
                            }                            
                            {
                                platformCode === '07' &&(
                                    <input type="text" value={accountValue} onChange={(e) => setAccountValue(e.target.value)} placeholder='Input your Telegram number' required className="account" />
                                )
                            }
                        </div>
                    </div>

                    <div>
                        {
                            apiData?._id && (
                                <button onClick={addAccount} disabled={isUpdatingAccount}>{isUpdatingAccount ? 'Updating...' : 'Add Account'}</button>
                            )
                        }
                    </div>

                    {/**Account info */}
                    <div className="card">
                        <div className="inputGroup">
                            <label htmlFor="">Update Your Account Information</label>
                        </div>
                        {
                            <div className="bankInfo">
                                {
                                    accountData?.accountName && (
                                        <>
                                            <p>Account Name: <span>{accountData?.accountName}</span></p>
                                            <p>Account Name: <span>{accountData?.accountNumber}</span></p>
                                            <p>Account Name: <span>{accountData?.bankName}</span></p>
                                        </>
                                    )
                                }

                            </div>
                        }

                        <div className="inputArea accountInfo">
                            <input 
                                type="text" 
                                value={accountNumber} 
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (input.length <= 10 && /^\d*$/.test(input)) {
                                        setAccountNumber(input);
                                    }
                                }} 
                                required 
                                placeholder='Enter Account Number'
                                disabled={fetchingAccountDetails}
                            />
                            <div className="inputGroup">
                                <label htmlFor="">Select Bank</label>
                                <select onChange={handleBankCode} disabled={fetchingAccountDetails}>
                                <option value="">-- SELECT ACCOUNT --</option>
                                {bankCode.map((item, idx) => (
                                    <option key={idx} value={item.code}>
                                    {item.name}
                                    </option>
                                ))}
                                </select>
                            </div>
                            <p className='displayAcountInfo'>
                                {
                                    fetchingAccountDetails && (
                                        <span>Fetching account Details</span>
                                    )
                                }
                                {
                                    accountName && (
                                        <>
                                            <span>{accountName}</span>
                                            <span>{getBankName}</span>
                                        </>
                                    )
                                }
                                {
                                    fetchError && (
                                        <span>{fetchError}</span>
                                    )
                                }
                            </p>
                        </div>
                    </div>

                    <div>
                        {
                            apiData?._id && (
                                <button onClick={updateBankInfo} disabled={updatingBankInfo}>{updatingBankInfo ? 'Updating...' : 'Update Account'}</button>
                            )
                        }
                    </div>
                </form>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Profile