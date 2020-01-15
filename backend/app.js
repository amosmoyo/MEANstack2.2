const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const router = require('./router/routes');

const app = express();


// set my middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(path.join('backend/images')));

app.use('/api/posts', router);

module.exports = app;
