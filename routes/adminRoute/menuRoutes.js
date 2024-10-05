const express = require('express');
const router = express.Router();
const multer = require('multer');
const { saveFormData, getAllMenu } = require('../../services/DB/database');
// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename uploaded file with a unique name
  },
});

// Create Multer instance with storage configuration
const upload = multer({ storage: storage });

// Define route for inserting a new menu
router.post('/add-menu', upload.single('image'), async (req, res) => {
  // Handle form data and uploaded image here
  const { name, price, category, type } = req.body;
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  const imagePath = req.file.path; // Path to the uploaded image
  console.log('imagePath', imagePath);
  const data = {
    name,
    price,
    category,
    type,
    img_url: imagePath,
  };
  console.log('data', data);
  const result = await saveFormData('menu', data);
  console.log('result', result);
  res.status(201).json({ message: 'Menu added successfully' });
});
// Define route for getting all menu
router.get('/getAllMenu', async (req, res) => {
  try {
    const result = await getAllMenu('menu', {});
    // console.log('result in get', result);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
