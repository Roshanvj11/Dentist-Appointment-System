import React from 'react'
import "./Header.css"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
    const navigate=useNavigate();

    const handleLogout=()=>{
        navigate('/')
    }

    return (
        <div id='header'>

            <div className="first-header">

                <div className="header-logo">

                    <ul >
                        <li>Logo</li>
                    </ul>

                </div>

                <div className="header-Login">
                    <ul>
                        {/* <li><Button onClick={handleRegister} variant="contained">Register</Button></li> */}
                        <li><Button onClick={handleLogout} variant="contained">LogOut</Button></li>
                    </ul>
                </div>

            </div>

            <div className="second-header">
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/treatments'>Treatments</Link></li>
                    <li><Link to='/blog'>Your Appointments</Link></li>
                    <li><Link to='/ourDoctors'>Our Doctors</Link></li>
                    <li><Link to='/feedback'>Feedback & Ratings</Link></li>
                    {/* <li><Button variant="text">About</Button></li>
                    <li><Button variant="text">Treatments</Button></li>
                    <li><Button variant="text">Blog</Button></li>
                    <li><Button variant="text">Our Doctors</Button></li>
                    <li><Button variant="text">Feedback & Ratings</Button></li> */}
                </ul>
            </div>

        </div>
    )
}
