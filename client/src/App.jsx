import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './Components/Content/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/Content/ResetPassword/ResetPassword'
import { AuthorizeUser, ValidToken } from './auth/PrivateRoute'
import Home from './Pages/Home/Home'
import Registration from './Pages/Registration/Registration'
import LandingPage from './Pages/LandingPage/LandingPage'
import TaskPage from './Pages/TaskPage/TaskPage'
import CreateTask from './Pages/CreateTask/CreateTask'
import VerificationEmailSent from './Components/Content/VerificationEmailSent/VerificationEmailSent'
import VerifyUser from './Components/Content/VerifyUser/VerifyUser'
import ResetEmailSent from './Components/Content/ResetEmailSent/ResetEmailSent'
import { Toaster } from 'react-hot-toast'
import Profile from './Pages/Profile/Profile'
import CompletedTask from './Pages/CompletedTask/CompletedTask'

function App() {

  return (
    <div className='app'>
      <Toaster position='top-centre'></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Registration />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/newPassword/:resetToken' element={<ResetPassword />} />
          <Route path='/VerificationEmailSent' element={<VerificationEmailSent />} />
          <Route path='/:id/verify/:token' element={<VerifyUser />} />
          <Route path='/resetEmailSent' element={<ResetEmailSent />} />
          
          <Route path="/postedTask/:id" element={<AuthorizeUser><ValidToken><CompletedTask /></ValidToken></AuthorizeUser>}/>
          <Route path="/task/:id" element={<AuthorizeUser><ValidToken><TaskPage /></ValidToken></AuthorizeUser>}/>
          <Route path="/createTask" element={<AuthorizeUser><ValidToken><CreateTask /></ValidToken></AuthorizeUser>}/>
          <Route path="/profile" element={<AuthorizeUser><ValidToken><Profile /></ValidToken></AuthorizeUser>}/>
          <Route path="/home" element={<AuthorizeUser><ValidToken><Home /></ValidToken></AuthorizeUser>}/>
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>      
    </div>
  )
}

export default App
