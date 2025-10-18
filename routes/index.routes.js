const express = require('express')
const supabase = require('../config/supabase.config');
const multer = require('multer');
const authMiddleware = require('../Middlewares/auth');
const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() });


router.get('/home', authMiddleware, (req, res) => {
    res.render('home')
})

router.post('/upload', authMiddleware, upload.single('file'),async (req, res) => {

  try {
    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload the file to the 'images' bucket in Supabase
    const { data, error } = await supabase.storage
      .from('my-drive') 
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.log('Error from Supabase:', error);
      return res.status(500).send('Error uploading file.');
    }

    console.log('Upload successful!', data);
    res.status(200).send('File uploaded successfully!');

  } catch (err) {
    console.log('An unexpected error occurred:', err);
    res.status(500).send('An unexpected error occurred.');
  }
});






module.exports= router