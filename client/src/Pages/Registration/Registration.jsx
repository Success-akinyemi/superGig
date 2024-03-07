import { Link, useLocation } from 'react-router-dom';
import Login from '../../Components/Content/Login/Login';
import Signup from '../../Components/Content/Signup/Signup';
import './Registration.css';
import { useEffect, useRef, useState } from 'react';
import LogoImg from '../../assets/Supergig.png'

function Registration() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refParams = queryParams.get('ref');
  const getLogin = queryParams.get('login');

  
  const signupRef = useRef(null);
  const [slide, setSlide] = useState('register');
  
  useEffect(() => {
    if(getLogin === 'true'){
      setSlide('login')
    }
  }, [getLogin, slide])

  const login = () => {
    setSlide('login');
    console.log(slide);
  };

  const register = () => {
    setSlide('register');
    console.log(slide);
  };

  return (
    <div className='registration'>
      <div className="container">
        <div className="box" style={{ paddingTop: slide === 'login' ? '60px' : '20px' }} >
          <img src={LogoImg} alt='logo' className='logo' />
          <Login isActive={slide === 'login'} />
          <Signup referredBy={refParams} isActive={slide === 'register'} />

          <div className="switch">
            <Link className={`link login`} onClick={login}>Login</Link>
            <Link className={`link register `} onClick={register}>Signup</Link>
            <div className="btn-active" id='btn' style={{[slide === 'login' ? 'left' : 'right']: '0'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
