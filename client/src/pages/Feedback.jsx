import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import ReviewDialog from './ReviewDialog';
import { useAppContext } from '../context/globalContext';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import './Feedback.css'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

//Logos
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'; import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';



export default function Feedback() {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [avergeRatings, setAverageRatings] = useState();
  //Dialog for delete Appointment
  const [open, setOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpen = (openId) => {
    console.log('openId', openId)
    setOpen(true);
    setSelectedId(openId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { user } = useAppContext();
  console.log('user id:', user)



  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleSubmitReview = async (comment, starValue) => {
    // Handle submitting review logic here
    const reviewData = {
      userId: user.id,
      username: user.username,
      commentData: comment,
      rating: starValue
    }
    console.log("reviewData rating:", reviewData.rating);
    try {
      await axios.post('/api/user/reviewData', reviewData)
    } catch (error) {

    }
    console.log('Submitted review:', comment);
    console.log('Submitted starValue:', starValue);

  };

  useEffect(() => {
    const reviewList = async () => {
      try {
        const response = await axios.get("/api/user/allReviewData")
        setReviewData(response.data)
      } catch (error) {
        console.error("Error in Getting Review Data:", error);
      }
    }
    reviewList();
  }, [])

  console.log('reviewData:', reviewData)


  //post like count
  // const handleLikes = (like,id) => {
  //   const updatedLike = isLiked ? like - 1 : like + 1;
  //   setIsLiked(!isLiked)
  //   axios.put(`/api/user/likes/${id}`,{liked:isLiked});
  //   console.log('updatedLike:', updatedLike);
  //   console.log('id:',id);
  // }
  // console.log("isLiked:", isLiked);

  //Label text For Average Rating

  // const averageRating=4.9;
  // const roundedRating = Math.round(averageRating * 2) / 2;
  // console.log('roundedRating:', roundedRating)

  //Average Rating

  useEffect(() => {
    const AvergeRating = async () => {
      try {
        const response = await axios.get("/api/user/averageRating")
        setAverageRatings(response.data)
      } catch (error) {
        console.error("Error in Getting Review Data:", error);
      }
    }
    AvergeRating();
  }, [])

  console.log('averageRatings:', avergeRatings);

  //Delete Review

  const handleDeleteReview = async (id) => {
    try {
      const response = await axios.delete(`/api/user/deleteReview/${id}`)
      setReviewData(reviewData.filter(item => item._id !== id));
      console.log(response.data);
      handleClose()

    } catch (error) {
      console.error("Error in client:", error)
    }

    console.log("review delete id:", id);
  }


  return (
    <div className='reviewMain'>
      {/* <div style={{ textAlign: 'center' }}>
        <h1>Feedback & Ratings</h1>
      </div> */}
      <div className='OverallRatingBox'>


        <div className='OverallRating'>

          <div className='OverallRatingOne'>
            <h3>Sample Dental Clinic,</h3>
            <p>Tirunelveli</p>
            {/* <p>1st Floor,</p>
              <p>Rajan Building Saliyar Street,</p>
              <p>Melapalayam,</p>
              <p>Tirunelveli-627005</p> */}
          </div>

          <div className='OverallRatingTwo'>
            <div>

              <p>
                <Rating name="read-only"
                  precision={0.5}
                  value={[avergeRatings]}
                  readOnly />
              </p>
              <p>Overall</p>

            </div>
              <div>
              <p id='overallPara'>{avergeRatings} </p>
              </div>
          </div>

        </div>
              
        <div>
          <button className='WriteReview'  onClick={handleOpenDialog}>
            <ModeOutlinedIcon sx={{ fontSize: 30 }} /> Write Review
          </button>
          <ReviewDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onSubmit={handleSubmitReview}

          />
        </div>

      </div>

      <div className='patientThink'>
        <h2>What Our Patients Think</h2>
      </div>

      <div className='ReviewBox'>

        {reviewData.map(item => (
          <div key={item._id} className='ReviewBoxOne' >
            {/* Delete Review */}
            {item.userId === user.id &&

              <div className='reviewTopCancelButton'>
                <Box></Box>
                <Box></Box>
                <Box>
                  <p className='dummyPara' >
                    < CancelOutlinedIcon style={{ color: 'red', backgroundColor: "white", borderRadius: '5px', fontSize: 30 }}
                      variant="outlined" onClick={() => handleClickOpen(item._id)} />
                  </p>
                  {/* <Button variant="outlined" onClick={()=>handleClickOpen(item._id)}>
                <CancelIcon />
                </Button> */}
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Delete Review"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you Sure
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={() => handleDeleteReview(selectedId)}>Yes</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </div>
            }

            <div className='ReviewBoxRating' >

              <Box
                sx={{
                  width: 200,
                  //  height: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Rating name="read-only" value={item.rating} readOnly />

              </Box>

              <div className='ReviewBoxDate'>

                <p><AccountCircleIcon sx={{ fontSize: 60 }} /></p>
                <b>{item.username}</b>
                <small>{item.date}</small>

              </div>


            </div>

            <div className='ReviewComment'>

              <p className='ReviewCommentpara'>{item.commentData}</p>


            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
