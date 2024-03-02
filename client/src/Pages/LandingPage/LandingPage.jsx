import Navbar from '../../Components/LandingPage/Navbar/Navbar'
import Hero from '../../Components/LandingPage/Hero/Hero'

import './LandingPage.css'

function LandingPage() {
  return (
    <div className='landingPage'>
        <Navbar /> 
        <Hero />
    </div>
  )
}

export default LandingPage