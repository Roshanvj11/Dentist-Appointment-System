import React from 'react';
import Button from '@mui/material/Button';
import './OurDoctors.css';

import doctorOne from '../Images/doctor john.png'
import doctorTwo from '../Images/doctor sara.png'
import { useNavigate } from 'react-router-dom';


export default function OurDoctors() {
    const navigate=useNavigate();
    
    const handleClick=()=>{
        navigate('/Appointment')
    }

    return (
        <div className="main">

            <div className='heading'>
                <h1>Our Doctors</h1>
            </div>

            <div className="Doctor-box">

                <div className="DoctorContent">
                    <div className="box1">
                        <img src={doctorOne} alt="image" className='img' />
                        <p>Name : Dr. John Smith </p>
                        <p>Location : Cityville</p>
                        <p>Degree : MDS</p>
                        <p>Position : Dentist </p>
                    </div>

                    <div className="box2">
                        <h3>Expertise</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus porro consequuntur, inventore illo at molestiae obcaecati impedit nesciunt debitis dignissimos labore reprehenderit accusantium</p>
                        <h3>Experience</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus porro consequuntur, inventore illo at molestiae obcaecati impedit nesciunt debitis dignissimos labore reprehenderit accusantium</p>
                        <div className="AppointmentBtn">
                            <Button onClick={handleClick}>Book Appointment</Button>
                        </div>

                    </div>



                </div>



            </div>

            <div className="Doctor-box">

                <div className="DoctorContent">
                    <div className="box1">
                        <img src={doctorTwo} alt="image" className='img' />
                        <p>Name : Dr. Sarah Johnson </p>
                        <p>Location : Townville</p>
                        <p>Degree : BDS </p>
                        <p>Position : Orthodentist</p>
                    </div>

                    <div className="box2">
                        <h3>Expertise</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus porro consequuntur, inventore illo at molestiae obcaecati impedit nesciunt debitis dignissimos labore reprehenderit accusantium</p>
                        <h3>Experience</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus porro consequuntur, inventore illo at molestiae obcaecati impedit nesciunt debitis dignissimos labore reprehenderit accusantium</p>
                        <div className="AppointmentBtn">
                            <Button variant="contained">Book Appointment</Button>
                        </div>

                    </div>



                </div>



            </div>



        </div>

    )
}
