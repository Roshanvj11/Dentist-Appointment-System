import React from 'react'
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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

import './Offline.css'

function TablePaginationActions(props) {
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

export default function OfflinePatients() {
    const [nameState, setNameState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ageState, setAgeState] = useState('');
    const [complaintState, setComplaintState] = useState('');
    const [treatmentState, setTreatmentState] = useState('');
    const [dateState, setDateState] = useState(new Date());
    const [offlineDataTable, setOfflineDataTable] = useState([]);

    const [errors, setErrors] = useState({});
    

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberRegEx = /^[6-9]\d{9}$/;
        return phoneNumberRegEx.test(phoneNumber);
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


        if (!ageState?.trim()) {
            errors.ageState = 'age is Required';
        }

        if (!complaintState?.trim()) {
            errors.complaintState = 'Complaint is Required';
            isValid = false;
        }

        if (!treatmentState?.trim()) {
            errors.treatmentState = 'Treatment is required';
            isValid = false;
        }

        // if (!dateState?.trim()) {
        //     errors.treatmentState = 'Date is required';
        //     isValid = false;
        // }

        if (!validatePhoneNumber(phoneNumber)) {
            errors.phoneNumber = 'Enter a valid Phone Number';
            isValid = false;
        }


        setErrors(errors);
        return isValid;
    }

    const defaultValues = () => {
        setNameState('');
        setAgeState('');
        setDateState('');
        setComplaintState('');
        setTreatmentState('');
        setPhoneNumber('');

    }


    //posting offline data form 
    const handleButtonSubmit = async () => {

        if (validateForm()) {

            const offlineData = {
                name: nameState,
                date: dateState,
                age: ageState,
                complaint: complaintState,
                treatment: treatmentState,
                phoneNumber: phoneNumber,
                mode: 'Offline',
                cAt: new Date()


            }
            // console.log("Offline Patients Data", offlineData);
            try {
                await axios.post('/api/doctor/offlinePatient', offlineData);
                console.log('Offline data submitted successfully', offlineData);
                defaultValues();
            } catch (error) {
                console.error("error in client sending offline data", error);
            }


        }
        
    }

    //Getting offlineForm Data for Table 
    useEffect(() => {

        const offlinePatientList = async () => {
            try {
                const response = await axios.get('/api/doctor/offlinePatientList')
                setOfflineDataTable(response.data);
                console.log('response', response.data)

            } catch (error) {
                console.error("Error in client:", error)
            }

        }
        offlinePatientList();
    }, []);

    console.log('offlineDataTable:', offlineDataTable)



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    return (
        <div className="offlineMain" >

            <div className='offlineSubOne'>
                <div className='offlineHeading'>
                    <h2>Add Patient Here</h2>
                </div>
                <br />
                <div className="formOffline">
                <TextField id="standard-basic"
                    value={nameState}
                    onChange={(e) => setNameState(e.target.value)}
                    label='Name'
                    variant="standard"
                    error={!!errors.nameState}
                    helperText={errors.nameState}

                />

                <br />


                <TextField id="standard-basic"
                    value={ageState}
                    onChange={(e) => setAgeState(e.target.value)}
                    type='Number'
                    label='Age'
                    variant="standard"
                    error={!!errors.ageState}
                    helperText={errors.ageState}
                />
                <br />

                <TextField id="standard-basic"
                    style={{
                        width:'200px',
                    }}
                    value={dateState}
                    onChange={(e) => setDateState(e.target.value)}
                    type='date'
                    label='Date'
                    variant="standard"
                    error={!!errors.dateState}
                    helperText={errors.dateState}
                />
                <br />

                <TextField id="standard-basic"
                    value={complaintState}
                    onChange={(e) => setComplaintState(e.target.value)}
                    label='Complaint'
                    variant="standard"
                    error={!!errors.complaintState}
                    helperText={errors.complaintState}
                />
                <br />

                <TextField id="standard-basic"
                    value={treatmentState}
                    onChange={(e) => setTreatmentState(e.target.value)}
                    label='Treatment'
                    variant="standard"
                    error={!!errors.treatmentState}
                    helperText={errors.treatmentState}
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
                />
                <br />

                <button className='addPatientbtn' onClick={handleButtonSubmit}>Add Patient</button>
                    </div>
            </div>
            <br />

            {offlineDataTable.length >0 ? 
            <div style={{
                padding: '10px'
            }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Complaint</TableCell>
                                <TableCell align="center">Treatment</TableCell>
                                <TableCell align="center">PhoneNumber</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? offlineDataTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : offlineDataTable
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.age}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.date}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.complaint}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.treatment}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row.phoneNumber}
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
            </div>
            : <div>Add Patient Above</div>}
        </div>

    )

}
