import React from 'react'
import "./Footer.css"
import Button from '@mui/material/Button';

export default function Footer() {
    const phoneNumber = "123-456-7890";
    return (
        <div className='footer'>

            <div className="footerChild-One">

                <div className="first-footerChild">

                    <div>
                        <p>Logo</p>
                        <ul><li><h3>Opening Hours</h3></li>
                            <li>Monday-Saturday</li>
                            <li>9.30 Am-2.00 Pm</li>
                            <li>5.30 Pm-10.30 Pm</li></ul>
                    </div>

                    <div>
                        <ul><li><Button variant="outlined">Contact </Button></li></ul>
                    </div>

                </div>

                <div className="second-footerChild">

                    <div>
                        <p>Logo</p>
                        <ul><li><h3>Emergency Service</h3></li></ul>
                    </div>

                    <div>
                        <ul><li>Call us  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></li></ul>
                    </div>

                </div>

                <div className="third-footerChild">

                    <div>
                        <p>Logo</p>
                        <ul><li><h3>Location</h3></li>
                            <li>xxx , yyy , zzz</li></ul>
                    </div>

                    <div>
                        <ul><li><a href="https://www.google.co.in/maps/place/RAPHA+DENTAL+IMPLANT+AND+ROOT+CANAL+CENTRE/@8.698237,77.7126477,17z/data=!3m1!4b1!4m6!3m5!1s0x3b041246c27bdf35:0x9b4b74b0de00518f!8m2!3d8.698237!4d77.715228!16s%2Fg%2F11gblf0yn1?entry=ttu">Map</a></li></ul>
                    </div>

                </div>
            </div>

            <div className="footerChild-Two">
                <p>Follow us on</p>
                <ul >
                    <li><a href="https://m.facebook.com/search_results/?q=rapha+dental+implant+centre+%E0%AE%B0%E0%AE%83%E0%AE%AA%E0%AE%BE+%E0%AE%AA%E0%AE%B2%E0%AF%8D+%E0%AE%AE%E0%AE%B0%E0%AF%81%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AF%81%E0%AE%B5%E0%AE%AE%E0%AE%A9%E0%AF%88 ">
                        Facebook
                    </a>
                    </li>
                    <li><a href="https://www.instagram.com/benojbranham?igsh=MXdqNmI3dGVkZXRkNQ==">
                        Instagram
                    </a>
                    </li>
                    <li>
                        <a href="https://youtube.com/@Dental_Tamil_channel?si=oGL85zYnXBBO1w-t">
                            Youtube
                        </a>
                    </li>
                </ul>
            </div>

        </div>

    )
}
