import React, { Component } from 'react';
import Header from './Header';
import SpecDisplay from './SpecDisplay';
import FileUpload from './FileUpload';
import Process from './Process';
import ImagesContainer from './ImagesContainer';

import Woven from 'woven-js/client';
import wovenWorker from 'worker-loader?inline=true&name=woven-worker.js!babel-loader!woven-loader!../../woven_functions/functions.js';
import convertImageToCanvas from '../../functions/convertImageToCanvas';

const woven = new Woven();
woven.connect(wovenWorker);

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };
    this.getImagesFromDB = this.getImagesFromDB.bind(this);
    this.addImageToDB = this.addImageToDB.bind(this);
    this.processImages = this.processImages.bind(this);
  }

  getImagesFromDB() {
    fetch('/read', {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
     .then(res => res.json())
     .then(data => this.setState({ images: data }))
     .catch(err => console.error('Error fetching images:', err));
  }

  addImageToDB(url) {
    const imageToAdd = { url };
    fetch('/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(imageToAdd)
    }).then(res => res.json())
      .then((data) => {
        this.setState({ images: [...this.state.images, data] });
      });
  }

  processImages() {
    const imagesToProcess = this.state.images.slice();
    imagesToProcess.forEach(image => {
      if (woven.getLocation() === 'client') {
        convertImageToCanvas(image.url, (err, canvasObj) => {
          if (err) return console.error(err);
          woven.run('processSepia', canvasObj.imageDataObj.data, canvasObj.length)
            .then(newBinaryData => {
              const newImageData = new ImageData(newBinaryData, canvasObj.imageDataObj.width, canvasObj.imageDataObj.height);
              canvasObj.context.putImageData(newImageData, 0, 0);
              const newURL = canvasObj.canvas.toDataURL('image/png');
              this.setState((prevState) => {
                const index = prevState.images.findIndex(prevImg => prevImg._id === image._id);
                const images = prevState.images.slice();
                images.splice(index, 1, { _id: image._id, url: newURL });
                return { images };
              })
            })
            .catch(err => console.error('Error processing image in web worker =>', err));
        });
      } else if (woven.getLocation() === 'server') {
        fetch(`/process`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ _id: image._id, url: image.url })
        })
          .then(res => res.json())
          .then(data => {
            this.setState((prevState) => {
              const index = prevState.images.findIndex(prevImg => prevImg._id === data._id);
              const images = prevState.images.slice();
              images.splice(index, 1, { _id: data._id, url: data.url });
              return { images };
            })
          })
          .catch(err => console.error('Error processing image on server =>', err));
      }
    });
  }

  componentDidMount() {
    this.getImagesFromDB();
   }

  render() {
    return (
      <div className="container">
        <Header />
        <Process 
          processImages={this.processImages}
          getImagesFromDB={this.getImagesFromDB}
        />
        <FileUpload addImage={this.addImageToDB} />
        <ImagesContainer images={this.state.images} />
        <SpecDisplay />
      </div>
    );
  }
}

export default App;
