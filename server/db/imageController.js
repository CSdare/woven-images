const mongoose = require('mongoose');
const ImageDB = require('./mongodb').Image;
const Canvas = require('canvas');
const processSepia = require('../../functions/tools');

const addImage = (req, res) => {
  ImageDB.create({ url: req.body.url }, (err, image) => {
    if (err) throw err;
    res.json(image);
  });
}

const getImages = (req, res) => {
  ImageDB.find((err, images) => {
    if (err) throw err;
    res.json(images);
  });
}

const processImage = (req, res) => {
  const Image = Canvas.Image;
  const img = new Image();
  img.src = req.body.url;

  const canvas = new Canvas(img.width, img.height);
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0, img.width, img.height);

  const imageDataObj = context.getImageData(0, 0, img.width, img.height);

  processSepia(imageDataObj.data, img.width * img.height * 4);

  context.putImageData(imageDataObj, 0, 0);

  const newURL = canvas.toDataURL('image/png');

  res.json({ _id: req.body._id, url: newURL });
};

module.exports = { addImage, getImages, processImage, }
