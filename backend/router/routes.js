const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

// Database configuration

mongoose.connect('mongodb://localhost:27017/testOne', {useNewUrlParser: true});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error'));
connection.once('open', () => {
  console.log('Connection to database is successful!!!');
})


// image configuration

const mimetypemap ={
  'image/png':  'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg'
}

const storage = multer.diskStorage({
    destination: function(req, file, callback){
      const isValid = mimetypemap[file.mimetype];
      let err = new Error('invalid mime type');
      if (isValid){
        err = null;
      }

      callback(err, 'backend/images');
    },
    filename: function(req, file, callback){
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = mimetypemap[file.mimetype];

      callback(null, name + '-' + Date.now() + '.' + ext);
    }
})


// create post

router.route('').post(multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + "://" + req.get('host');
  let post = new Post({
    title: req.body.title,
    description: req.body.description,
    imagePath: url + '/images/' + req.file.filename
  });

  post.save()
      .then((doc) => {
        res.status(200).json({
          message: 'New record has been added to the database',
          document: doc
        });
      })
})

// Read posts

router.route('').get((req, res, next) => {
  console.log(req.query);
  Post.find().then((docs) => {
    res.status(200).json({
      message: 'All Documents',
      documents: docs
    })
  })
})


// Read one post

router.route('/:id').get((req, res, next) => {
  Post.findById(req.params.id, (err, doc) => {
    if(err){
      console.log(err);
    }

    res.status(200).json({
      message: 'This is the derived document',
      document: doc
    })
  })
})

// update one post

router.route('/update/:id').post((req, res, next) => {
  Post.findById(req.params.id, (err, doc) => {
    if (!doc) {
      throw new(Error('No such document in this database'));
    } else {
      let imagePath;
      if (req.file) {
        const url = req.protocol + "://" + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
      } else {
        doc.title = req.body.title;
        doc.description = req.body.description;
        doc.imagePath = req.body.imagePath
      }

      doc.save()
         .then((postDoc) => {
           res.status(200).json({
             message:'The document has been updated',
             document: postDoc
           })
         })
    }
  })
})

// delete one document

router.route('/delete/:id').get((req, res, next) => {
  Post.findByIdAndRemove({_id: req.params.id}, (err, doc) => {
    if(err){
      console.error(err);
    }

    res.status(200).json({
      message: 'The document has been deleted'
    })
  })
})

module.exports = router;
