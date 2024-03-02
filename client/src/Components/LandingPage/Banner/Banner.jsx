import { Link } from 'react-router-dom'
import './Banner.css'

function Banner() {
  return (
    <div className='landingPagePadding banner'>
        <div className="card">
            <div className="text">
                <h2>
                    Ready to storm the online presence <br />
                    boost your profits?
                </h2>
            </div>

            <div className="btn">
                <Link className="link btnCard" to='/register'>Get Started</Link>
            </div>
        </div>
    </div>
  )
}

export default Banner