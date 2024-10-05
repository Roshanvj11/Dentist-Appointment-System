import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
// import AppointmentDoctor from './AppointmentDoctor'
import MainBoard from './MainBoard';
// import Patients from './Patients';
import OfflinePatients from './OfflinePatients';

function Dashboard() {
  let [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'dashboard');

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


  // const handleRefresh = () => {

  //   window.location.reload(); 

  // };

  const handleLogout = () => {
    navigate('/');
    // handleRefresh();
  }

  return (
    // <div>

      <div style={{
        // border: '1px solid black',
        display: "flex",
        flexDirection: 'row',
         height: '100vh',

       }}>



        <div style={{
          // border: '1px solid black',
          display: "flex",
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#1B3C73',
          padding: "50px",
          // height: '100vh',
          // height: '80vh'

         }}>

          <div style={{
            // border: '1px solid blue',
            display: "flex",
            flexDirection: 'column',
            gap: "20px"
          }}>

            {/* <Button variant="outlined" onClick={() => changePage('appointments')}>Appointments</Button> */}
            <Button style={{
              color: 'whitesmoke',
              border:'1px solid whitesmoke',
              backgroundColor:'#f96877'
            }} onClick={() => changePage('dashboard')}>DashBoard</Button>
            {/* <Button variant="outlined" onClick={() => changePage('patients')}>Patients</Button> */}
            <Button style={{
              color: 'whitesmoke',
              border:'1px solid whitesmoke',
              backgroundColor:'#f96877'

            }} onClick={() => changePage('addPatients')}>Add Patients</Button>

          </div>

          <div>
            <Button style={{
              color: 'whitesmoke',
              border:'1px solid whitesmoke',
              backgroundColor:'#f96877'
            }} onClick={handleLogout}>Log Out</Button>
          </div>

        </div>

        <div style={{
          // border: '1px solid black',
          // display: 'flex',
          // height: '100vh',
          flexGrow:1
        }}>
          {/* {currentPage === 'appointments' && <AppointmentDoctor />} */}
          {/* {currentPage === 'patients' && <Patients />} */}
          {currentPage === 'dashboard' && <MainBoard />}
          {currentPage === 'addPatients' && <OfflinePatients />}

        </div>
    
      </div>

    // </div>
  )
}

export default Dashboard;
