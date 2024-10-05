import React from 'react'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function Home() {
  const navigate = useNavigate();

  // const location =useLocation();
  // const {userId} = location.state;
  // console.log(userId)


  const handleAppointment = () => {
    navigate('/Appointment');
  }
  return (


    <div className='MainHome'>
      <div className="first-content">
        <img src="" alt="" />
        <h1>Happy Smile</h1>
        <p>
        “Don’t take life too seriously! <br /> Nobody gets out alive anyway Smile” 
        </p>
        <Button onClick={handleAppointment} variant="contained">Make an Appointment</Button>
      </div>
      {/* <div className="second-content">
            <h1>choose your clinic name</h1>
            <p>quotes about clinic</p>
          </div> */}
    </div>


  )
}
