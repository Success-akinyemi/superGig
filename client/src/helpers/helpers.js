import axios from 'axios'
import jwt_decode from 'jwt-decode'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_LOCALHOST_SERVER_API
//axios.defaults.baseURL = import.meta.env.VITE_LIVE_SERVER_API

const token = localStorage.getItem('authToken')

/**Get user from token */
export async function getUser(){
    if(!token) return Promise.reject('Cannot get Token')

    try {
        const decoded = jwt_decode(token);
        //console.log('decoded>>', decoded);
        
        return decoded;
      } catch (error) {
        //console.error('Error decoding token:', error);
        return Promise.reject('Error decoding token');
      }
}

/**Register New User */
export async function registerUser({username, email, password, referredBy }){
    try {
        const res = await axios.post('/api/auth/register', {username, email, password, referredBy })
        console.log('respones', res.data)
        if(res.data.success){
            return res        
        }
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

export async function loginUser({ email, password }){
    try {
        const res = await axios.post('/api/auth/login', { email, password })
        console.log('respones', res)
        if(res.data){
            return res        
        }
    } catch (error) {
        console.log('ERROR REGISTERING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            console.log('MSG', errorMsg)
            toast.error(errorMsg)
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

export async function verifyUser({ id, token}){
    try {
        const res = await axios.post(`/api/auth/${id}/verify/${token}`)
        console.log(res)
        if(res.data.success){
            localStorage.setItem('authToken', res.data.token)
            toast.success('Email Verified')
            return res
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            console.log('MSG', errorMsg)
            toast.error(errorMsg)
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

export async function resetPassword ({ email }){
    try {
        const res = await axios.post('/api/auth/forgotPassword', { email })
        console.log('RES FROM FORGOT PASSWROD', res)
        if(res.data.success){
            return res
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            console.log('MSG', errorMsg)
            toast.error(errorMsg)
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

export async function newPassword({ resetToken, password }){
    try {
        const res = await axios.put(`/api/auth/resetPassword/${resetToken}`, {password})

        if(res.data.success){
            toast.success(res.data.data)
            return res
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            console.log('MSG', errorMsg)
            toast.error(errorMsg)
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Pay with Paystack */
export async function paysavings({email, amount}){
    try {        
        console.log('before send>>', email, amount)
        if(!email && !amount){
            toast.error('Amount and Email is required')
            return;
        }
        const response = await axios.post('/api/payWithPaystack', { amount, email }, {headers: { "Authorization" : `Bearer ${token}`}})
        
        console.log(response.data);

        const authorizationUrl = response.data.authorizationUrl; //paystack
        console.log('url', authorizationUrl)
        window.location.href = authorizationUrl; // Redirect the user to the Paystack checkout page
        
        return Promise.resolve({ authorizationUrl })
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Create task */
export async function createTask({ platform, platformCode, task, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers, createdBy }){
    try {
        const res = await axios.post('/api/createTask', { platform, platformCode, task, unitPrice, pricePerFreelancer, taskUrl, numberOfWorkers, createdBy }, {headers:{ Authorization: `Bearer ${token}`}})
        
        if(res.data.success){
            toast.success(res.data.data)
            return res
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Update user */
export async function updateUser(formData){
    try {
        const res = await axios.post('/api/auth/updateUser', formData, {headers:{ Authorization: `Bearer ${token}`}})
        if(res.data.success){
            toast.success(res.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Add user social media account */
export async function addSocialMediaAccount({accountValue, platformCode, userId}){
    try {
        const res =  await axios.post('/api/addSocialMediaAccount', {accountValue, platformCode, userId}, {headers:{ Authorization: `Bearer ${token}`}})
        if(res.data.success){
            toast.success(res.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Submit Task */
export async function submitTask(formData){
    try {
        const res = await axios.post('/api/submitTask', formData, {headers:{ Authorization: `Bearer ${token}`}})
        if(res.data.success){
            toast.success(res.data.data)
            return res
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Update account info */
export async function updateAccountInfo(formData){
    try {
        const res = await axios.post('/api/updateAccountInfo', formData, {headers: {Authorization: `Bearer ${token}`}})
        if(res.data.success){
            toast.success(res.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

/**Update Account Info */
export async function uploadBankInfo({userId, getBankName, accountName, accountNumber}){
    try {
        const res = await axios.post('/api/updateAccountInfo', {userId, accountNumber, getBankName, accountName}, {headers: {Authorization: `Bearer ${token}`}})
        if(res?.data.success){
            toast.success(res.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

export async function withdrawBonusEarning({bonusAmount, userId}){
    try {
        const res = await axios.post('/api/withdrawBonusEarning', {bonusAmount, userId}, {headers: {Authorization: `Bearer ${token}`}} )
        if(res?.data.success){
            toast.success(res.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

export async function withdrawEarning({earningAmount, userId}){
    try {
        const res = await axios.post('/api/withdrawEarnings', {earningAmount, userId}, {headers: {Authorization: `Bearer ${token}`}} )
        if(res?.data.success){
            toast.success(res.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}

export async function confirmPayment({id}){
    try {
        const res = await axios.post('/api/admin/confirmPayment', {id}, {headers: {Authorization: `Bearer ${token}`}} )
        if(res?.data.success){
            toast.success(res?.data.data)
            window.location.reload()
        }
    } catch (error) {
        console.log('ERROR VERIFYING USER API', error)
        if (error.response && error.response.data) {
            const errorMsg = error.response.data.data;
            const errorMsg2 = error.response.data.error;
            console.log('MSG', errorMsg)
            console.log('MSG2', errorMsg2)
            if(errorMsg){
                toast.error(errorMsg)
            } else{
                toast.error(errorMsg2)
            }
            return errorMsg;
          } else {
            return 'An error occurred during the request.';
          }
    }
}


export async function buyAirtime({networkCode,amount,userPhoneNumber,email}){
    try {

        const response = await axios.post('/api/handleAirtime', {networkCode,amount,userPhoneNumber,email}, {headers: {Authorization: `Bearer ${token}`}})
        
        console.log(response.data)
        console.log(response.data.data);


        if (response.data.statuscode === '100') {
          toast.success('Credited successfully!');
    
          // Redirect to the home page after showing the toast
          window.location.href = '/dashboard';
        }
    } catch (error) {
        console.log(error)
    }
}

export async function buyData({networkCode,amount,userPhoneNumber,email,buyType,dataPlanCode,cp}){
    try {

        const response = await axios.post('/api/handleData', {networkCode,amount,userPhoneNumber,email,buyType,dataPlanCode,cp}, {headers: {Authorization: `Bearer ${token}`}})
        
        console.log('1>>',response.data)
        console.log('2>>' ,response.data.data);


        if (response.data.statuscode === '100') {
          toast.success('Credited successfully!');
    
          // Redirect to the home page after showing the toast
          window.location.href = '/dashboard';
        }

        if (response.data.Status === 'successful') {
            toast.success('Credited successfully!');
      
            // Redirect to the home page after showing the toast
            window.location.href = '/dashboard';
          }
    } catch (error) {
        console.log(error)
    }
}

export async function buyCableTvSubscription({userPhoneNumber,smartCardNumber,email,selectedCableTvCode,amount,cableTv}){
    try {

        const response = await axios.post('/api/cableTvSubscription', {userPhoneNumber,smartCardNumber,email,selectedCableTvCode,amount,cableTv}, {headers: {Authorization: `Bearer ${token}`}})
        
        console.log(response.data)
        console.log(response.data.data);


        if (response.data.statuscode === '100') {
          toast.success('Credited successfully!');
    
          // Redirect to the home page after showing the toast
          window.location.href = '/dashboard';
        }
    } catch (error) {
        console.log(error)
    }
}

export async function verifyCableTvSmartCard({smartCardNumber,cableTv}){
    try {

        const response = await axios.post('/api/verifyCableTvSmartCard', {smartCardNumber,cableTv}, {headers: {Authorization: `Bearer ${token}`}})
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export async function buyElectricBill({email, userMeterNumber, userMeterType, electricCompany, userPhoneNumber,amount}){
    try {

        const response = await axios.post('/api/buyElectricBill', {email, userMeterNumber, userMeterType, electricCompany, userPhoneNumber,amount}, {headers: {Authorization: `Bearer ${token}`}})
        
        console.log(response.data)
        console.log(response.data.data)

        if (response.data.statuscode === '100') {
            toast.success('Credited successfully!');
      
            // Redirect to the home page after showing the toast
            window.location.href = '/dashboard';
          }
        
    }
    catch(error){
        console.log(error)
    }
}

export async function verifymeterNumber({electricCompany,userMeterNumber}){
    try {

        const response = await axios.post('/api/verifyElectricMeterNumber', {electricCompany,userMeterNumber}, {headers: {Authorization: `Bearer ${token}`}})
        return response.data;
    } catch (error) {
        console.log(error)
    }
}