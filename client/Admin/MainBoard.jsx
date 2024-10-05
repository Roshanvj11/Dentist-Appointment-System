import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import DoctorNotes from "./DoctorNotes";

import './Mainboard.css'

export default function MainBoard() {

    //Total appointment Table
    const [totalAppointment, setTotalAppointment] = useState([]);

    //Total Appointment Count
    let [appointmentCount, setAppointmentCount] = useState([0]);

    //pendingAppointmentCount
    let [PendingCount, setPendingCount] = useState([0])

    //TodayAppointmentCount
    const [todayAppointment, setTodayAppointment] = useState([]);

    //Completed Patients Count
    const [completedAppointment, setCompletedAppointment] = useState([0]);

    //Offline Patient Count
    const [offlinePatientCount, setOfflinePatientCount] = useState([0]);

    //total Patients
    const [totalPatients, setTotalPatients] = useState(0)

    //Appointment Status 
    const [status, setStatus] = useState();


    const handleStatusChange = async (e, appointmentId) => {
        setStatus({ status: e.target.value, id: appointmentId });
        console.log("Target value:", e.target.value);
        await axios.put(`/api/doctor/updateAppointmentStatus/${appointmentId}`, { status: e.target.value })
    };
    console.log('status:', status)

    //Appointment Table
    const appointmentList = async () => {
        try {
            const response = await axios.get('/api/doctor/findUserAppointments')
            setTotalAppointment(response.data);
            console.log('response', response.data)

        } catch (error) {
            console.error("Error in client:", error)
        }

    }

    useEffect(() => {
        appointmentList();
    }, []);

    console.log("Total Appointments admin:", totalAppointment);

    //Today Appointment Data
    const todayAppointmentData = async () => {
        try {
            const response = await axios.get('/api/doctor/todayAppointmentList')
            setTotalAppointment(response.data);
            console.log('response', response.data)

        } catch (error) {
            console.error("Error in client:", error)
        }
    }

    //This Week Appointment LIst

    const thisWeekAppointmentData = async () => {
        try {
            const response = await axios.get('/api/doctor/thisWeekAppointmentList')
            setTotalAppointment(response.data);
            console.log('response', response.data)

        } catch (error) {
            console.error("Error in client:", error)
        }
    }

    //getting total appointment Count
    useEffect(() => {
        const appointmentCount = async () => {
            try {
                const response = await axios.get("api/doctor/appointmentCount");
                setAppointmentCount(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("appointment Count error client:", error);
            }
        }
        appointmentCount()
    }, []);

    console.log('appointmentCount', appointmentCount);

    //Getting pending Status 

    useEffect(() => {
        const pendingAppointmentCount = async () => {
            try {
                const response = await axios.get("api/doctor/pendingAppointMentCount");
                setPendingCount(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("pending appointment Count error client:", error);
            }
        }
        pendingAppointmentCount()
    }, []);

    console.log('PendingCount:', PendingCount);

    //Today Appointment Count

    useEffect(() => {
        const todayAppointmentCount = async () => {
            try {
                const response = await axios.get("api/doctor/todayAppointmentCount");
                setTodayAppointment(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Today appointment Count error client:", error);
            }
        }
        todayAppointmentCount()
    }, []);

    console.log('todayAppointment:', todayAppointment);

    //Completed Appointment Count

    useEffect(() => {
        const completedAppointmentCount = async () => {
            try {
                const response = await axios.get("api/doctor/findCompletedPatients");
                setCompletedAppointment(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Today appointment Count error client:", error);
            }
        }
        completedAppointmentCount()
    }, []);

    console.log('completedAppointment:', completedAppointment);

    useEffect(() => {
        const offlineCount = async () => {
            try {
                const response = await axios.get("api/doctor/findOfflinePatientsCount");
                setOfflinePatientCount(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Today appointment Count error client:", error);
            }
        }
        offlineCount()
    }, []);

    console.log('offlinePatientCount:', offlinePatientCount);

    //Total Patients Count
    useEffect(() => {
        const appointmentCompleted = completedAppointment[0] + offlinePatientCount[0];
        setTotalPatients(appointmentCompleted)
    })

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    //Status 
    const [statusMap, setStatusMap] = useState('');

    const handleChange = async (event) => {
        setStatusMap(event.target.value);

    }

    //query=(pending,cancelled etc...)
    const handleStatus = async (query) => {
        try {
            const response = await axios.get('/api/doctor/findUserAppointments')
            const statusValues = response.data.filter((item) => { return item.status === query })
            console.log("statusValues:", statusValues);
            setTotalAppointment(statusValues)

        } catch (error) {
            console.error("Error in client:", error)
        }

    }

    //Mail
    const handleEmail = (email, subject) => {
        const emailData = {
            to: email,
            subject: subject,
            text: `Your Appointment was ${subject}`
        }
        axios.post('/api/doctor/status', emailData).then(response => {
            console.log("email send Successfully", response);
        }).catch(error => {
            console.error("error in client email", error);
        })
        console.log("Email", email);
    }
    console.log('todayAppointment', todayAppointment)

    return (
            <div className="mainBoardContainer">

                  <div className="MainBoardHeading">
                        <h2>Dashboard</h2>
                    </div>


                <div className="mainBoardSubContainer">

                  
                    <div className="statusContainer" >

                        <div className="statusSubContainer" style={{ backgroundColor: '#FF204E' }}>
                            <p>{PendingCount}</p>
                            <h5>Pending Appointments</h5>
                        </div>


                        <div className="statusSubContainer" style={{ backgroundColor: '#610C9F' }}>
                            <p>{todayAppointment}</p>
                            <h5>Today Appointments</h5>
                        </div>

                        <div className="statusSubContainer" style={{ backgroundColor: '#C400C6' }}>
                            <p>{appointmentCount}</p>
                            <h5>Total Appointments</h5>
                        </div>

                        <div className="statusSubContainer" style={{ backgroundColor: '#03C988' }}>
                            <p>{totalPatients}</p>
                            <h5>Total Patients</h5>
                        </div>

                    </div>

                    <div className="middleContainer">

                        <h3 className="middleHeading">Appointments</h3>

                        <div className="statusFilterBox" >

                            <div className="firstBox" >
                                <button onClick={appointmentList} >All Appointments</button>
                                <button onClick={todayAppointmentData} >Today</button>
                                <button onClick={thisWeekAppointmentData}>This Week</button>
                            </div>

                            <div>
                                <Box className='statusBoxOne' sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" className="labelSelect">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-selectNew"
                                            value={statusMap}
                                            label="Status"
                                            onChange={handleChange}

                                        >
                                            <MenuItem onClick={() => handleStatus('pending')}>Pending</MenuItem>
                                            <MenuItem onClick={() => handleStatus('Approved')}>Approved</MenuItem>
                                            <MenuItem onClick={() => handleStatus('Completed')}>Completed</MenuItem>
                                            <MenuItem onClick={() => handleStatus('Cancelled')}>Cancelled</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                        </div>

                        {totalAppointment.length > 0 ?
                            <div>

                                <TableContainer component={Paper}>
                                    <Table aria-label="custom pagination table">
                                        <TableHead className="tableHeader">
                                            <TableRow>
                                                <TableCell align="center" className="tableCell">Name</TableCell>
                                                <TableCell align="center" className="tableCell">Appointment Date</TableCell>
                                                <TableCell align="center" className="tableCell">Doctor</TableCell>
                                                <TableCell align="center" className="tableCell">Time</TableCell>
                                                <TableCell align="center" className="tableCell">Phone Number</TableCell>
                                                <TableCell align="center" className="tableCell">Notes</TableCell>
                                                <TableCell align="center" className="tableCell">Status</TableCell>
                                                <TableCell align="center" className="tableCell">Update Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? totalAppointment.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                : totalAppointment
                                            ).map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row" align="center">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="center">
                                                        {row.date}
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="center">
                                                        {row.doctor}
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="center">
                                                        {/* {row.time} */}
                                                        {(() => {
                                                            const [hours, minutes, seconds] = row.time.split(':');
                                                            const hoursInt = parseInt(hours, 10);
                                                            const formattedHours = hoursInt % 12 === 0 ? 12 : hoursInt % 12;
                                                            const period = hoursInt >= 12 ? 'pm' : 'am';
                                                            return `${formattedHours}:${minutes} ${period}`;
                                                        })()}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" align="center">
                                                        {row.phoneNumber}
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="center">
                                                        {row.status !== 'Cancelled' && row.status !== 'pending' && <DoctorNotes id={row._id} />}
                                                    </TableCell>
                                                    <TableCell>
                                                       <p style={{
                                                        width:120,
                                                        height:40 ,
                                                        display:'flex',
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        borderRadius:'6px',
                                                        color:'black',
                                                         backgroundColor:
                                                        row.status === 'pending' ? 'orange' :
                                                        row.status === 'Approved' ? '#B2A4FF' :
                                                        row.status === 'Completed' ? '#4CCD99' :
                                                        row.status === 'Cancelled' ? '#FA7070' :
                                                                            'inherit'
                                                    }}
                                                       >{row.status}
                                                       </p> 
                                                    </TableCell>
                                                    <TableCell style={{ width: 160 }} align="center">
                                                        <Box sx={{ minWidth: 120 }}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-selectNew"

                                                                    value={row._id === status?.id && status?.status}
                                                                    label="Status"
                                                                    onChange={(e) => {
                                                                        handleStatusChange(e, row._id)

                                                                    }}
                                                                >
                                                                    <MenuItem onClick={() => handleEmail(row.email, "Approved")} style={{ color: 'blue' }} value={'Approved'}>Approved</MenuItem>
                                                                    <MenuItem onClick={() => handleEmail(row.email, "Completed")} style={{ color: 'green' }} value={'Completed'}>Completed</MenuItem>
                                                                    <MenuItem onClick={() => handleEmail(row.email, "Cancelled")} style={{ color: 'red' }} value={'Cancelled'}>Cancelled</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 53 * emptyRows }}>
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
                                                    colSpan={6}
                                                    count={rows.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    slotProps={{
                                                        select: {
                                                            inputProps: {
                                                                'aria-label': 'rows per page',
                                                            },
                                                            native: true,
                                                        },
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                            </div> : <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: '10px',
                                gap: '10px'
                            }}
                            >
                                <marquee behavior="" direction="">No More Appoinments Available</marquee>
                            </div>}

                    </div>

                </div>


            </div>

        
    )
}



function TablePaginationActions(props) {

    // ws.on('connect', () => {
    //     console.log('Connected to server');
    // });

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

