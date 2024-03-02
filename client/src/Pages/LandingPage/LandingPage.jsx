import Navbar from '../../Components/LandingPage/Navbar/Navbar'
import Hero from '../../Components/LandingPage/Hero/Hero'

import './LandingPage.css'
import WhyUs from '../../Components/LandingPage/WhyUs/WhyUs'
import Banner from '../../Components/LandingPage/Banner/Banner'
import Footer from '../../Components/LandingPage/Footer/Footer'

function LandingPage() {
  return (
    <div className='landingPage'>
        <Navbar /> 
        <Hero />
        <WhyUs />
        <Banner />
        <Footer />
    </div>
  )
}

export default LandingPage