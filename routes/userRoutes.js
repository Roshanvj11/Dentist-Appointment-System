const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const {
  User,
  updateOne,
  saveFormData,
  checkUserExists,
  addReviewData,
  allReviewData,
  averageRating,
  deleteReview,
} = require('../services/DB/database');
const { ObjectId } = require('mongodb');

router.post('/register', async (req, res) => {
  let { username, displayName, password, phoneNo, role, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if userName,email or phone number already exists in the collection
    const existingUserWithEmail = await checkUserExists('users', {
      email: email,
    });
    const existingUserWithUserName = await checkUserExists('users', {
      username: username,
    });
    const existingUserWithPhoneNo = await checkUserExists('users', {
      phoneNo: phoneNo,
    });

    if (existingUserWithEmail) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    if (existingUserWithUserName) {
      return res.status(400).json({ error: 'Username already exist' });
    }
    if (existingUserWithPhoneNo) {
      return res
        .status(400)
        .json({ error: 'Phone number is already registered' });
    }
    let data = {
      username,
      displayName,
      password: hashedPassword,
      phoneNo,
      role,
      email,
      cAt: new Date(),
    };
    // Save form data to MongoDB
    await saveFormData('users', data);
    res.status(200).send('Form data saved successfully');
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.put('/reset-password', async (req, res) => {
  let { password, email, token } = req.body;
  try {
    console.log('req.body', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if userName,email or phone number already exists in the collection

    const findQuery = {
      $and: [{ email: email }, { token: token }],
    };
    const existingUserWithEmailandToken = await checkUserExists(
      'users',
      findQuery
    );
    console.log('existingUserWithEmailandToken', existingUserWithEmailandToken);
    if (!existingUserWithEmailandToken) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const collectionName = 'users'; // Name of the collection to update
    const filter = { email: email }; // Filter to identify the document to update by email
    const update = { $set: { password: hashedPassword } }; // Update new password

    console.log('update', update);
    // Update user record with the new password
    await updateOne(collectionName, filter, update);

    res.status(200).send('New password saved successfully');
  } catch (error) {
    console.error('Error Resetting password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// handle signup initial requests
router.post('/login', async (req, res, next) => {
  // console.log('test');
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      // *** Display message without using flash option
      res.status(401).json({ success: false, msg: info.message });
    } else {
      req.login(user, async (err) => {
        console.log('LOGIN');
        if (err) {
          console.error('login-error', err);
          return res.status(500).json({
            success: false,
            msg: 'Something went wrong!',
          });
        }
        // return res.redirect('/dashboard');
        // Retrieve the user's role from your database
        try {
          const userFromDB = await User.findById(user._id);
          const role = userFromDB.role;
          const userId = userFromDB._id;
          // Assuming 'role' is a field in your user schema
          return res.status(200).json({
            success: true,
            msg: 'Login successful!',
            role: role,
            userId: userId

          });
        } catch (error) {
          console.error('Error retrieving user role:', error);
          return res.status(500).json({
            success: false,
            msg: 'Error retrieving user role',
          });
        }
      });
    }
  })(req, res, next);
});

// google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/failure',
  }),
  async (req, res) => {
    return res.redirect('http://localhost:5173/home');
  }
);

// google signup callback route
router.get(
  '/signup/google/callback',
  passport.authenticate('signup-google', {
    failureRedirect: 'http://localhost:5173/failure',
  }),
  async (req, res) => {
    return res.redirect('http://localhost:5173/home');
  }
);

router.get('/google/signin', (req, res, next) => {
  // Authenticate the user with Google OAuth2.0
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
});

// get google auth page requests
router.get('/google/signup', (req, res, next) => {
  // Authenticate the user with Google OAuth2.0
  passport.authenticate('signup-google', {
    scope: ['profile', 'email'],
  })(req, res, next);
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { Email } = req.body;
    const existingUserWithEmail = await checkUserExists('users', {
      email: Email,
    });
    if (!existingUserWithEmail) {
      return res.status(400).json({ error: 'Email not registered' });
    }
    // Generate a password reset token
    const token = crypto.randomBytes(20).toString('hex');
    console.log('token--', token);
    const collectionName = 'users'; // Name of the collection to update
    const filter = { email: Email }; // Filter to identify the document to update by email
    const update = { $set: { token: token } }; // Update the token to the document

    console.log('update', update);
    // Update user record with the reset token and email
    await updateOne(collectionName, filter, update);
    // res.status(200).send('Form data saved successfully');
    // Setup password reset link with both email and token
    const resetLink = `http://localhost:5173/reset-password?email=${Email}&token=${token}`;
    console.log('resetLink', resetLink);
    // Send mail
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "give your Email",
        pass: 'wwww xxxx yyyy zzzz',
      },
    });
    const mailOptions = {
      from: '"Dentist connect" <sroshanvijay@gmail.com>',
      to: Email,
      subject: 'Password reset link',
      text: `Please click the following link to reset your password: ${resetLink}`,
    };
    // Send mail
    await transporter.sendMail(mailOptions);

    res.send('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending forgot password request:', error);
    res.status(500).send('Error sending forgot password request');
  }
});

//Appointment form Data

router.post('/appointment', async (req, res) => {
  const {
    appointmentDate,
    name,
    patientId,
    phoneNumber,
    email,
    doctorId,
    time,
    doctor,
    date,
    cAt } = req.body;
  console.log(req.body.phoneNumber);

  collectionName = 'appointmentData';

  console.log('request:', req.body)

  
  console.log('appointmentDate', appointmentDate)
  console.log('time', time)
  const dateComponent = appointmentDate.substring(0,10);

  const combinedDateTimeString = `${dateComponent}T${time}.000Z`

  console.log('combinedDateTimeString:', typeof new Date(combinedDateTimeString), new Date(combinedDateTimeString))
  const data = {
    appointmentDate: new Date(combinedDateTimeString),
    name,
    patientId: new ObjectId(patientId),
    doctorId: new ObjectId(doctorId),
    phoneNumber,
    email,
    time,
    doctor,
    date,
    status: "pending",
    mode: 'Online',
    cAt: new Date()
  }
  try {
    await saveFormData(collectionName, data)
  //  console.log(result);
    // res.json(result);
    res.status(200).send({message:'Appointment Booked successfully'});

  } catch (error) {
    console.error("Error in posting Appointment data (router)",error);
  }
  console.log('data', data);
 
})

// Route to get user info
router.get('/whoami', (req, res) => {
  try {
    console.log('test route');
    console.log('req', req.user);
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If the user is authenticated, send back user info
    const userInfo = {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      // Add any other relevant user information here
    };
    console.log('userInfo', userInfo);
    res.json(userInfo);
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle errors gracefully
  }
});

//upload Offline Patients
router.post('/reviewData', async (req, res) => {
  const {
    userId,
    username,
    commentData,
    rating } = req.body;

const timestamp = new Date();
const date = new Date(timestamp);
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

console.log("date::::::::>",formattedDate);

  const reviewData = {
    userId: new ObjectId(userId),
    username,
    commentData,
    rating,
    date:formattedDate,
    Likes: Number(),
    cAt: new Date()
  }
  try {
    const result = await addReviewData('reviewData', reviewData);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("error in router, addReviewData", error);
  }
})

router.get('/allReviewData', async (req, res) => {
  try {
    const result = await allReviewData('reviewData');
    console.log('reviewData:', result);
    res.json(result);
  } catch (error) {
    console.error('router Error AllReviewData', error);
  }
})

// router.put('/likes/:id',async (req,res)=>{
//   const {liked}=req.body;
//   const {id}=req.params;
//   console.log("isLiked:",liked);
//   console.log('id:', id)
//   try {
    
//   } catch (error) {
    
//   }
// })

//Average Rating
router.get('/averageRating', async (req, res) => {
  try {
    const result = await averageRating('reviewData');
    console.log('AverageRating:', result);
    res.json(result);
  } catch (error) {
    console.error('router Error AllReviewData', error);
  }
})

//Delete Review LIst
router.delete('/deleteReview/:id', async (req, res) => {
  const {id} = req.params;
  console.log("review Delete Id:",req.params);
  console.log('review id:', id)
  try {
      const result = await deleteReview('reviewData', id);
      res.json(result);
  } catch (error) {
      console.error("error in router, delete Appointments", error)
  }

})

module.exports = router;
