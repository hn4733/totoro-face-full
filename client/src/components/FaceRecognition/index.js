import React from 'react';
import { FaceDectectionArea, BoundingBox } from './style';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <FaceDectectionArea>
      <img
        id="imagedata"
        src={imageUrl}
        alt=""
        width="280px"
        height="auto"
      />
      <BoundingBox
        top={box.topRow}
        right={box.rightCol}
        bottom={box.bottomRow}
        left={box.leftCol}
      ></BoundingBox>
    </FaceDectectionArea>
  );
};

export default FaceRecognition;

// {https://cdn.diys.com/wp-content/uploads/2016/07/Family-Photoshoot-Ideas-2.jpg}
