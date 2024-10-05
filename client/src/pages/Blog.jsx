import React from 'react'
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/globalContext';
import axios from 'axios';
import './Blog.css';

import LogoImage from '../Images/doctor.png';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';

export default function Blog() {
  const [totalAppointment, setTotalAppointment] = useState([]);
  const { user } = useAppContext();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = (openId) => {
    console.log('openId:', openId)
    setSelectedId(openId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {

    const appointmentList = async () => {
      try {
        const response = await axios.get('/api/doctor/findUserAppointments')
        setTotalAppointment(response.data);
        console.log('response', response.data)

      } catch (error) {
        console.error("Error in client:", error)
      }

    }
    appointmentList();
  }, [])

  console.log("findUserAppointments:", totalAppointment);

  const patientTotalAppointment = totalAppointment.filter(item => {
    console.log('item.patientId:', item.patientId)
    return item.patientId === user.id
  })


  console.log('patientTotalAppointment', patientTotalAppointment);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/doctor/deleteOfflinePatientList/${id}`)
      setTotalAppointment(totalAppointment.filter(appointment => appointment._id !== id));
      console.log(response.data);
      handleClose()

    } catch (error) {
      console.error("Error in client:", error)
    }
    console.log('Delete Id:', id)

    // handleRefresh();
  }

  return (
    <div className='blogmain'>

      <div className='blogHeading'>
        <h1>Your Appointments</h1>
      </div>


      {patientTotalAppointment.map((appointment) => (

        <div key={appointment._id} className='appointmentContainer'>

          <div id='status'>
            <p></p>
            <p className='statusPara1' style={{
              backgroundColor:
                appointment.status === 'pending' ? 'orange' :
                  appointment.status === 'Approved' ? '#B2A4FF' :
                    appointment.status === 'Completed' ? '#4CCD99' :
                      appointment.status === 'Cancelled' ? '#FA7070' :
                        'inherit'
            }}>
              {appointment.status}

            </p>


            <Box style={{ visibility: appointment.status === 'Completed' ? 'hidden' : 'visible' }}>
              <p className='statusPara2'>
                < CancelOutlinedIcon style={{ color: 'red', backgroundColor: "antiquewhite", borderRadius: '5px', fontSize: 30 }} variant="outlined" onClick={() => handleClickOpen(appointment._id)} />
              </p>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Cancel Appointment"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you Sure
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleDelete(selectedId)}>Yes</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </div>

          <div className='AppointmentCard'>

            <div>
              <img src={LogoImage} alt="" style={{
                width: "200px",
              }} />
            </div>

            <div className='content'>

              <div className='contentData1'>
                <p className='para1'>Name</p>
                <p className='para1'>Appointment Date</p>
                <p className='para1'>Doctor</p>
                <p className='para1'>Time</p>
              </div>

              <div className='contentData2'>
                <p className='para2'>{appointment.name}</p>

                <p className='para2'>{appointment.date}</p>
                <p className='para2'>{appointment.doctor}</p>
                <p className='para2'>
                  {(() => {
                    const [hours, minutes, seconds] = appointment.time.split(':');
                    const hoursInt = parseInt(hours, 10);
                    const formattedHours = hoursInt % 12 === 0 ? 12 : hoursInt % 12;
                    const period = hoursInt >= 12 ? 'pm' : 'am';
                    return `${formattedHours}:${minutes} ${period}`;
                  })()}
                </p>
                {/* {appointment.time} */}

              </div>



            </div>



          </div>

        </div>
      ))}

    </div>
  )
}
