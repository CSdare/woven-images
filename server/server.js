require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const imageController = require('./db/imageController');
const woven = require('woven-js');
const functions = require('../woven_functions/functions')

woven.configure(functions, { alwaysClient: true });

const port = 4000;
const app = express();

app.use(express.static(__dirname + '/../build/'));
app.use(bodyParser.json({ limit: '16mb' }));
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }));
app.use(woven.optimize);

app.get('/read', imageController.getImages);
app.post('/create', imageController.addImage);
app.post('/process', imageController.processImage);

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds237947.mlab.com:37947/imagesdb`);
mongoose.connection.once('open', () => {
  console.log('connected with MLab database')
});

app.listen(process.env.PORT || port);
