import React, {useEffect} from 'react'
import Background from '../../assets/worldMap.png'
import WarningImg from '../../assets/Something-Wrong.png'
import {trackEvent} from '../../manager/analyticsManager'
import './error.css'

const error = () => {
  trackEvent("Screen View",{"PageName":"Error screen"})
  return (
    <div className='error-screen' style={{backgroundImage: `url(${Background})`}}>
      <div className='error-card'>
      <h1 className="heading">Something went wrong</h1>
        <p>We offer the latest Hollywood blockbusters,&nbsp;the most<br/>
          popular TV series, and&nbsp;the&nbsp;best films&nbsp;from<br/>
          independent filmmakers.
        </p>
        <img className='warning-img' src={WarningImg}/>
        <p className='bottom-line'> If you feel this message is appearing to you by mistake,<br/> please contact us at <a href="mailto:help@rakuten.tv">help@rakuten.tv</a></p>
        </div>
    </div>
  )
}; export default error