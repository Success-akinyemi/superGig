import { whyUs } from '../../../data/whyUs'
import './WhyUs.css'

function WhyUs() {
  return (
    <div className='landingPagePadding whyUs'>
        <h2>Manage your brand's online reputation with confidence.</h2>
        <p>Experience unparalleled value across your preferred platforms, elevating your online presence to new heights.</p>

        <div className="content">
            {
                whyUs?.map((item) => (
                    <div className="card">
                        <img src={item?.img} alt={item?.title}/>
                        <h2>{item?.title}</h2>
                        <p>{item?.text}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default WhyUs