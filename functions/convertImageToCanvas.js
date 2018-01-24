export default (uri, callback) => { 
  const image = document.createElement('img');
  image.src = uri;
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageDataObj = context.getImageData(0, 0, canvas.width, canvas.height);
    const length = imageDataObj.width * imageDataObj.height * 4;
    callback(null, { canvas, context, imageDataObj, length });
  }
  image.onerror = (err) => {
    callback(err);
  }
};
