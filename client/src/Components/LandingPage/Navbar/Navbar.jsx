import { Link } from 'react-router-dom';
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  return (
    <div className='navbar'>
        <div className="logo">
          
        </div>

        <div className="register">
          <Link to='/register' className='link registerBtn'>Get Started</Link>
        </div>
    </div>
  )
}

export default Navbar