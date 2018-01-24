import React from 'react';
import Image from './Image'

const ImagesContainer = (props) => {
  const images = props.images.map((image, i) => {
    return <Image key={image._id} id={`image-${i}`} url={image.url} />
  });

  return (
    <div className="image-container">
      {images}
    </div>
  );
}

export default ImagesContainer;
