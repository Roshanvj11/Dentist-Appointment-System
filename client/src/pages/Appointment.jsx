import React, { useEffect, useState } from 'react'
import './Appointment.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

 import * as api from '../api/userApi';
// import * as appointmentApi from '../api/appointmentApi'
import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// import LogoImage from '../Images/doctor.png';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useAppContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';


export default function Appointment() {
  const [dateState, setDateState] = useState(new Date());
  const [nameState, setNameState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailState, setEmailState] = useState('');
  const [timeState, setTimeState] = useState('');
  const [selectOption, setSelectOption] = useState('Dr. Michael Lee')
  const [errors, setErrors] = useState({});

  const [doctordata, setDoctorData] = useState([]);
  const [doctorId, setDoctorId] = useState();
  const [totalAppointment, setTotalAppointment] = useState([]);

  const { user } = useAppContext();

  const navigate = useNavigate();

  // const [redirect, setRedirect] = useState(false);
  //Dialog for delete Appointment
  const [open, setOpen] = useState(false);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // if (redirect) {
  //   navigate('/blog')
  // }
  // const location = useLocation();
  // const { userId } = location.state;
  // console.log("userId:_",userId)

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegEx = /^[6-9]\d{9}$/;
    return phoneNumberRegEx?.test(phoneNumber);
  }

  const validateEmail = (emailState) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx?.test(emailState);
  }

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!nameState?.trim()) {
      errors.nameState = 'Name is Required';
      isValid = false;
    }

    if (!phoneNumber?.trim()) {
      errors.phoneNumber = 'Phone Number is Required';
      isValid = false;
    }

    if (!emailState?.trim()) {
      errors.emailState = 'Email is Required';
      isValid = false;
    }

    if (!timeState?.trim()) {
      errors.timeState = 'Time is Required';
    }

    if (!selectOption?.trim()) {
      errors.selectOption = 'Select Doctor';
      isValid = false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      errors.phoneNumber = 'Enter a valid Phone Number';
      isValid = false;
    }

    if (!validateEmail(emailState)) {
      errors.emailState = 'Email must be xyz@gmail.com';
      isValid = false;
    }
    console.log('errors:', errors)
    setErrors(errors);
    return isValid;
  }
  // console.log(errors);

  const defaultValues = () => {
    setNameState('');
    phoneNumber('');
    emailState('');
    timeState('');


  }
  console.log('dateState', dateState);
  const date = new Date(dateState);

  // Format the date to ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
  const isoString = date.toISOString();

  // Extract the date component from the ISO string (YYYY-MM-DD)
  const dateComponent = isoString.substring(0, 10);

  console.log("dateComponent:", dateComponent);

  const handleButtonSubmit = async () => {

    if (validateForm()) {
      const data = {
        appointmentDate: inputFieldDate,
        name: nameState,
        patientId: user.id,
        phoneNumber: phoneNumber,
        email: emailState,
        time: timeState,
        doctor: selectOption,
        doctorId: doctorId,
        date: FormatChangeDate
      };

      try {
        // const response = await axios.post('api/user/appointment', data);
        // //  defaultValues();
        // if (response.mode === "online") {
        //   window.location.href = '/blog';
        // }
        // console.log('Status from Backend:', response.status)
        // console.log('response from backend', response.data);
        const result = await api.appointmentData(data);
        navigate('/blog',alert('Appointment Booked Successfully'))
        console.log('result Appointment Data:', result);
        // alert(response.data.message)
        // setRedirect(true);
      } catch (err) {
        console.error('Error while saving appointment data:', err);
      }

    } else {
      console.log('Form validation failed');
    }
  };

  // console.log('redirect:', redirect)

  const changeDate = (e) => {
    setDateState(e)
  }

  const inputFieldDate = moment(dateState).format('YYYY-MM-DD');
  console.log('inputFieldDate', inputFieldDate)

  const FormatChangeDate = moment(dateState).format('DD-MM-YYYY');
  console.log('FormatChangeDate:', FormatChangeDate)

  const handleOptionChange = (e) => {
    setSelectOption(e.target.value);
    setDoctorId(e.target.value)
    console.log('e.target.value', e.target.value)
  }
  console.log('select option', selectOption);


  useEffect(() => {

    const doctorList = async () => {
      try {
        const response = await axios.get('/api/doctor/doctorList')
        setDoctorData(response.data);
        console.log('response', response.data)

      } catch (error) {
        console.error("Error in client:", error)
      }

    }
    doctorList();
  }, []);


  console.log("DoctorId", doctorId);

  // const doctorDetails = doctordata.map(item => { return item._id });
  // console.log("DoctorDetails:", doctorDetails);

  const selectedDocter = doctordata.filter(item => selectOption === item.name);
  console.log('selectedDoctor', selectedDocter)

  useEffect(() => {
    setDoctorId(selectedDocter[0]?._id)
  }, [selectedDocter])


  // Appointment List for users


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

  // //Delete appointment

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(`/api/doctor/deleteOfflinePatientList/${id}`)
  //     setTotalAppointment(totalAppointment.filter(appointment => appointment._id !== id));
  //     console.log(response.data);
  //     handleClose()

  //   } catch (error) {
  //     console.error("Error in client:", error)
  //   }
  //   console.log('Delete Id:', id)
  //   // handleRefresh();
  // }

  // const handleRefresh = () => {

  //   window.location.reload(); 

  // };
  // Function to disable Sundays
  const disableSundays = ({ date }) => {
    return date.getDay() === 0; // 0 represents Sunday
  };

  const tileClassName = ({ date }) => {
    return date.getDay() === 6 ? 'saturday' : null; // 6 represents Saturday
  };

  const handleBooked = () => {
    navigate('/blog')
  }

  const handlepage = () => {
    navigate('/layout')
  }

  console.log('doctordata:', doctordata)

  return (
    <div className='AppointmentMain'>

      <div className='AppointmentContainer'>

        {/* <div>
        <Button onClick={handlepage}> Home</Button>
      </div> */}
        <div className='headingForm'>
          <div className='FormHeader'>
            <h3>Dental Appointment Form</h3>
          </div>
        </div>


        <div className='CalenderData'>

          <div className="calendar-container">
            <h3>Select Date</h3>
            <Calendar
              value={dateState}
              onChange={changeDate}
              minDate={new Date()}
              maxDate={new Date('2080-12-31')}
              tileDisabled={disableSundays} // Disable Sundays
              tileClassName={tileClassName} // Add custom class to Saturdays
            />
          </div>

          <div className='appointmentForm' >

            <div className='appointmentFormChild'>
              <TextField id="standard-basic"
                value={FormatChangeDate}
                variant="standard"
                InputLabelProps={{
                  style: { color: '#1B3C73' } // Specify the color for the label
                }}
              />
              <br />

              <TextField id="standard-basic"
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
                label='Name'
                variant="standard"
                error={!!errors.nameState}
                helperText={errors.nameState}
                InputLabelProps={{
                  style: { color: '#1B3C73' } // Specify the color for the label
                }}

              />

              <br />

              <TextField id="standard-basic"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='tel'
                label='Phone Number'
                variant="standard"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                InputLabelProps={{
                  style: { color: '#1B3C73' } // Specify the color for the label
                }}
              />
              <br />

              <TextField id="standard-basic"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                label='Email'
                variant="standard"
                error={!!errors.emailState}
                helperText={errors.emailState}
                InputLabelProps={{
                  style: { color: '#1B3C73' } // Specify the color for the label
                }}
              />
              <br />
              <br />

              <InputLabel id="demo-simple-select-label"  style={{ color: '#1B3C73' }}>Select Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={timeState}
                onChange={(e) => setTimeState(e.target.value)}
                label="Select Time"
                error={!!errors.timeState}
                helperText={errors.timeState}
                style={{ width: '200px', height: '40px' }}
                
              >
                <MenuItem value={"10:00:00"}>10.00 Am</MenuItem>
                <MenuItem value={"11:00:00"}>11.00 Am</MenuItem>
                <MenuItem value={"12:00:00"}>12.00 Pm</MenuItem>
                <MenuItem value={"13:00:00"}>1.00 Pm</MenuItem>
                <MenuItem value={"14:00:00"}>2.00 Pm</MenuItem>
                <MenuItem value={"17:30:00"}>5.30 Pm</MenuItem>
                <MenuItem value={"18:30:00"}>6.30 Pm</MenuItem>
                <MenuItem value={"19:30:00"}>7.30 pm</MenuItem>
                <MenuItem value={"20:00:00"}>8.30 Pm</MenuItem>
              </Select>
              <br />

              <br />

            </div>



          </div>

        </div>

        <div className='chooseDoctor'>
          <h4>Choose Doctor</h4>
        </div>

        <div className='doctorData'>
          {doctordata.map(item => (

            <FormControl>
              <Card sx={{ width: 305, height: 360, padding: 2,color: '#1B3C73' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imagePath}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={handleOptionChange}
                        value={selectOption}
                        name="radio-buttons-group"
                      >

                        <FormControlLabel style={{color: '#1B3C73'}}
                          key={item.name} // Ensure each radio button has a unique key
                          value={item.name}
                          control={<Radio />}
                          label={item.name}
                        />

                      </RadioGroup>

                    </Typography>
                    <Typography style={{color: '#1B3C73',padding:'10px'}} variant="body2" color="text.secondary">
                      <p>Speciality :{item.specialty}</p>
                      <p>Location :{item.location}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>

              </Card>
            </FormControl>
          ))}
        </div>

        <div className='getAppointment'>
          <button className='appointmentButton' onClick={handleButtonSubmit}
            variant="contained">Get Appointment</button>
        </div>

        <div className='getAppointment'>
          <p>Already have Appointment Click?<button style={{color:'#f96877'}} onClick={handleBooked}>Here</button>
          </p>
        </div>

      </div>

    </div>
  )
}
