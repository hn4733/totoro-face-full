import React from 'react';

import { P } from '../Universal/style';
import {
  ImageDetectionSection,
  FormSection,
  FormInput,
  FormButton,
} from './style';

const ImageLinkForm = ({ inputChange, onButtonSubmit }) => {
  return (
    <ImageDetectionSection>
      <P fontsize={'20px'}>
        {`This smart machine can detect faces from images. Give it a TRY!`}
      </P>
      <FormSection>
        <FormInput
          type="text"
          placeholder="Paste image URL link here..."
          onChange={inputChange}
        />
        <FormButton onClick={onButtonSubmit}>Detect</FormButton>
      </FormSection>
    </ImageDetectionSection>
  );
};

export default ImageLinkForm;
