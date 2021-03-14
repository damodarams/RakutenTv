import React from "react"
import Device_icon from "../../assets/devices.png"
import Payment_icon from "../../assets/payments.png"
import Info_icon from "../../assets/info.png"
import RakutenLogo from "../../assets/rakutenTv.png"

import "./footer.css"

const footer = () => {
  return (
    <>
      <div className="footer_info">
        <h1 className="footer_info_title">Rakuten TV - Your cinema at home</h1>
        <p className="footer_info_text">
          Rakuten TV provides a combination of services that offer a universe of content in just a fews clicks. Enjoy a
          true cinematic experience with the latest new releases, premium subscription services and range of thematic
          channels for free, including Movies, Euronews, Kids TV, Viki, Documentaries and Rakuten Stories, a channel
          that embodies Rakuten TV´s original and exclusive content.
        </p>
        <div className="footer_info_block">
          <img className="footer-image device-img" src={Device_icon} alt="devices" width="60px" height="40px" />
          <h1 className="footer_info_block_title">How it works</h1>
          <p className="footer_info_block_text">Our content can be watched on many devices. Check our device list.</p>
        </div>
        <div className="footer_info_block">
          <img className="footer-image payment-img" src={Payment_icon} alt="devices" width="60px" height="40px" />
          <h1 className="footer_info_block_title">More payment methods</h1>
          <p className="footer_info_block_text">
            Rakuten TV is compatible with PayPal, Visa and Mastercard credit cards.
          </p>
        </div>
        <div className="footer_info_block">
          <img className="footer-image info-img" src={Info_icon} alt="devices" width="60px" height="40px" />
          <h1 className="footer_info_block_title">Help & Support</h1>
          <p className="footer_info_block_text">
            Are you having problems with our service? Get in touch with our support team
          </p>
        </div>
      </div>
      <div className="footer_mini">
        <div className="footer_mini_company">
          <img className="footer_mini_company_logo" src={RakutenLogo} width="140" height="35" alt="rakuten logo" />
          <p className="footer__mini__company__link--nondecored">2009 - 2020 © Rakuten TV Europe, S.L.U. - v1.855.0</p>
        </div>
      </div>
    </>
  )
}

export default footer
