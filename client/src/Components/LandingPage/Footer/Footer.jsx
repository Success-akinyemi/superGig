import './Footer.css'
import LogoImg from '../../../assets/Supergig.png'
import { useEffect, useState } from 'react'

function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentYear(new Date().getFullYear())
        }, 1000 * 60)
        return () => clearInterval(interval)
    },[])

    return (
    <div className='landingPagePadding footer'>
        <img src={LogoImg} alt='logo' />

        <p>&copy; Copyright reserved, {currentYear}</p>
    </div>
  )
}

export default Footer