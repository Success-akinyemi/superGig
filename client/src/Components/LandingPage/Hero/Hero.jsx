import { useState } from 'react'
import './Hero.css'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { Link } from 'react-router-dom';
import HeroImg from '../../../assets/bgImg.png'

function Hero() {
    const [ content, setContent ] = useState('business')
    const [text] = useTypewriter({
        words: ['Audience', 'Interaction', 'Awareness', 'Upvotes', 'Reposts'],
        loop: {},
        typeSpeed: 120,
        deleteSpeed: 80,
    });
  return (
    <div className='landingPagePadding hero'>
        <div className="left">
            <div className="top">
                <span onClick={() => setContent('business')} className={`contentOption ${content === 'business' ? 'active' : ''}`}>Business</span>
                <span onClick={() => setContent('freelance')} className={`contentOption ${content === 'freelance' ? 'active' : ''}`}>Freelance</span>
            </div>
            {
                content === 'business' && (
                    <div className="content contentOne">
                        <h2 className='text'>Get More</h2>
                        <h2 className='text moreText'>
                            <span>{text}</span>
                            <Cursor cursorStyle='<' />
                        </h2>
                        <h2 className='text'>Get More Profit</h2>
                        <p>
                        Expand your business horizons and enhance your global presence by posting tasks worldwide! Elevate your brand visibility and attain your objectives with effective promotion.
                        </p>

                        <div className="btnCard">
                            <Link className='link btn' to='/register'>Post a Task</Link>
                        </div>
                    </div>
                )
            }

            {
                content === 'freelance' && (
                    <div className="content contentTwo">
                        <h1>Boost Income by completing simple task</h1>
                        <p>with superGig earn extra cash surfing the internet</p>

                        <div className="btnCard">
                            <Link className='link btn' to='/register'>Complete a Task</Link>
                        </div>
                    </div>
                )
            }
        </div>

        <div className="right">
            <img src={HeroImg} alt='hero' />
        </div>
    </div>
  )
}

export default Hero