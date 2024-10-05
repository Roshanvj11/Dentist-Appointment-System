import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function DoctorNotes({ id }) {

    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);
    const [isNotes, setIsNotes] = useState(false);

    //Button Save and edit

    const handleAddNotes = async () => {

        //getting notes
        await axios.get(`/api/doctor/notesValues/${id}`)
            .then(response => {
                if (response.data[0].notes) {
                   setIsNotes(true) 
                   setNotes(response.data[0].notes);
                }else{
                    setIsNotes(false)
                    setNotes('');

                }
                console.log("Get successfully", response.data[0].notes);
            })
            .catch(error => {
                console.error("error in Getting notes", error);
            });
        setOpen(true);
    }

    //    let newNotes= notes.map(item=>{
    //         return item.notes;
    //     })

    //     console.log("newNotes",newNotes);

    // const handleEdit = () => {
    //     setOpen(false)

    // }

    const handleClose = () => {
        setOpen(false);
    };


    const handleSave = async () => {
        //update notes
        await axios.put(`/api/doctor/notes/${id}`, { note: notes })
            .then(response => {
                console.log("Update successfully", response);
            })
            .catch(error => {
                console.error("error in updating notes", error);
            });
        console.log('id:', id)

        //getting notes
        // await axios.get(`/api/doctor/notesValues/${id}`)
        // .then(response => {
        //     setNotes(response.data);
        //     console.log("Get successfully",response.data);
        // })
        // .catch(error=>{
        //     console.error("error in Getting notes",error);
        // });

        // handleRefresh();
        setOpen(false);
    }

    // const handleRefresh =()=>{
    //     window.location.reload()
    // }
   

console.log('isNotes', isNotes)
    return (
        <div >
            <React.Fragment>
                {/* {editing ?
                    <Button variant="contained" onClick={handleAddNotes} color="success">
                        Notes
                    </Button> :
                    <Button variant="contained" onClick={handleEdit} color="success">
                        Edit
                    </Button>
                } */}
                <Button variant='contained' color='success' onClick={handleAddNotes}>Notes</Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">

                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <TextField
                        id="myTextarea"
                        multiline
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />

                    {/* <Button variant="contained" onClick={handleSave} color="success">
                        Save
                    </Button> */}
                   
                        <Button variant="contained" onClick={handleSave} color="success">
                           {isNotes? "Edit":"Save" } 
                        </Button> 
                      
                
                </BootstrapDialog>
            </React.Fragment>
        </div>
    )
}
