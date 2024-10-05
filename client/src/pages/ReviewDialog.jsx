import React from 'react'
import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


const ReviewDialog = ({ open, onClose, onSubmit }) => {
    const [comment, setComment] = useState('');
    const [starValue, setStarValue] = useState(2);
    const [hover, setHover] = useState(-1);

    const  handleChange = (event) => {
        setComment(event.target.value);
    };


    const handleSubmit = () => {
        // You can perform additional validation here before submitting
        onSubmit(comment,starValue);
        onClose();
    };


    // console.log("starValue:",starValue);

    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };



    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Write a Review</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: 200,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={starValue}
                            precision={1}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setStarValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {starValue !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : starValue]}</Box>
                        )}
                    </Box>
                    
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        value={comment}
                        onChange={handleChange}
                        inputProps={{ maxLength: 200 }} 
                    />
                    <p>Maximum 200 Letters</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit Review
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReviewDialog


