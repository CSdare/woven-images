import React from 'react';

const defaultURL = 'http://globolstaff.com/images/stories/e10.jpg';

const replaceImage = (event) => {
  event.target.src = defaultURL;
}

const Image = (props) => {
  return (
    <div id={props.id} className="image">
      <img onError={replaceImage} src={props.url} crossOrigin="Anonymous" />
    </div>
  );
}

export default Image;
