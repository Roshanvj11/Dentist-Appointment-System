import React, { useState } from 'react';
import { useEffect } from 'react';
import './Layout.css';
// import "./Header.css";
// import "./Footer.css"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Header from './Header';
import About from './About';
import OurDoctors from './OurDoctors';
// import Home from './Home'
// import Footer from './Footer';
import Treatments from './Treatments';
import Home from './Home';
import Blog from './Blog';
import Feedback from './Feedback';
import Contact from './Contact'

//Logos

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

import logo from '../Images/teeth png.png'

//Images

export default function Layout() {
  let [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'Home');

  console.log('currentPage', currentPage)
  const phoneNumber = "123-456-7890";


  const changePage = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);

  }

  useEffect(() => {
    // When the component mounts, check if there's a stored page and set the current page accordingly
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(storedPage);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className='container'>

      <div id='header'>

        {/* <div className="first-header"> */}

        <div className="header-logo">

          <p><img src={logo} alt="" height={50} /></p>

        </div>



        {/* </div> */}

        <div className="second-header">
          <ul>
            {/* <li><Link to='/home'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/treatments'>Treatments</Link></li>
        <li><Link to='/blog'>Your Appointments</Link></li>
        <li><Link to='/ourDoctors'>Our Doctors</Link></li>
        <li><Link to='/feedback'>Feedback & Ratings</Link></li> */}
            {/* <li><Button variant="text">About</Button></li>
        <li><Button variant="text">Treatments</Button></li>
        <li><Button variant="text">Blog</Button></li>
        <li><Button variant="text">Our Doctors</Button></li>
        <li><Button variant="text">Feedback & Ratings</Button></li> */}
            <Button variant="text" onClick={() => changePage('Home')}>Home</Button>
            <Button variant="text" onClick={() => changePage('About')}>About</Button>
            <Button variant="text" onClick={() => changePage('Treatments')}>Treatments</Button>
            <Button variant="text" onClick={() => changePage('yourAppointments')}>Your Appointments</Button>
            <Button variant="text" onClick={() => changePage('ourDoctors')}>Our Doctors</Button>
            <Button variant="text" onClick={() => changePage('Feedback')}>Feedback & Ratings</Button>

          </ul>
        </div>

        <div className="header-Login">
          <ul>
            {/* <li><Button onClick={handleRegister} variant="contained">Register</Button></li> */}
            <li><button className='headerLogoutButton' onClick={handleLogout} >LogOut</button></li>
          </ul>
        </div>
      </div>

      <div>
        {currentPage === 'Home' && <Home />}
        {currentPage === 'About' && <About />}
        {currentPage === 'Treatments' && <Treatments />}
        {currentPage === 'yourAppointments' && <Blog />}
        {currentPage === 'ourDoctors' && <OurDoctors />}
        {currentPage === 'Feedback' && <Feedback />}
        {currentPage === 'Contact' && <Contact />}

      </div>

      <div className='footer'>
        
        <div className="footerChild-One">

          <div className="first-footerChild">

            <div>
              <p><AccessTimeIcon /></p>
              <ul><li><h3>Opening Hours</h3></li>
                <li>Monday-Saturday</li>
                <li>9.30 Am-2.00 Pm</li>
                <li>5.30 Pm-10.30 Pm</li></ul>
            </div>

            <div>
              <ul><li><button onClick={() => changePage('Contact')}>Contact </button></li></ul>
            </div>

          </div>

          <div className="second-footerChild">

            <div>
              <p><LocalHospitalIcon /></p>
              <ul>
                <li>
                  <h3>Emergency Service</h3>
                  <li style={{textAlign:'center',padding:"10px"}}>Call us</li>
                </li>
                {/* <li>Call us</li>
                <li><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></li> */}
              </ul>

            </div>

            <div className='LinkFooter'>
              <ul>
                <li><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></li>
              </ul>
            </div>

          </div>

          <div className="third-footerChild">

            <div>
              <p><LocationOnOutlinedIcon /></p>
              <ul><li><h3>Location</h3></li>
                <li>1st Floor,</li>
                <li>Rajan Building Saliyar Street,</li>
                <li>Melapalayam,</li>
                <li>Tirunelveli-627005</li>
              </ul>
            </div>

            <div className='LinkFooter'>
              <ul><li><a href="https://www.google.co.in/maps/place/RAPHA+DENTAL+IMPLANT+AND+ROOT+CANAL+CENTRE/@8.698237,77.7126477,17z/data=!3m1!4b1!4m6!3m5!1s0x3b041246c27bdf35:0x9b4b74b0de00518f!8m2!3d8.698237!4d77.715228!16s%2Fg%2F11gblf0yn1?entry=ttu">Map</a></li></ul>
            </div>

          </div>
        </div>

        <div className="footerChild-Two">
          <p>Follow us on</p>
          <ul className='Socialmedias'>
            <li className='Facebook'><a href="https://m.facebook.com/search_results/?q=rapha+dental+implant+centre+%E0%AE%B0%E0%AE%83%E0%AE%AA%E0%AE%BE+%E0%AE%AA%E0%AE%B2%E0%AF%8D+%E0%AE%AE%E0%AE%B0%E0%AF%81%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AF%81%E0%AE%B5%E0%AE%AE%E0%AE%A9%E0%AF%88 ">
              <FacebookOutlinedIcon sx={{ fontSize: 40 }}  />
            </a>
            </li>
            <li className='Instagram'><a href="https://www.instagram.com/benojbranham?igsh=MXdqNmI3dGVkZXRkNQ==">
              <InstagramIcon sx={{ fontSize: 40 }} />
            </a>
            </li>
            <li className='Youtube'> 
              <a href="https://youtube.com/@Dental_Tamil_channel?si=oGL85zYnXBBO1w-t">
                <YouTubeIcon sx={{ fontSize: 40 }}  />
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
