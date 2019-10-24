import React, { Component, Fragment } from 'react';
import Clarifai from 'clarifai';

import withAuthorization from '../Session/withAuthorization';

import Footer from '../Footer';
import { MessageCreate, Messages } from '../Message';
import SignOutButton from '../SignOut';
import ImageLinkForm from '../ImageLinkForm';
import FaceRecognition from '../FaceRecognition';
import {
  Adjust,
  MessageWrapper,
  MessageBorder,
  MessageContentWrapper,
  Main,
  Flex,
  Span,
  H1,
  H2,
  H3,
  Img,
} from '../Universal/style';
import totoroImage from '../../resources/images/totoro.png';

// example image: https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=1368&height=912&fit=bounds&format=pjpg&auto=webp&quality=70

const app = new Clarifai.App({
  apiKey: '37d82e173c5e4dc2bfb1fd2aec88cdb6',
});

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    };
  }

  calculateBox = data => {
    const boxData =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imagedata');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol: boxData.left_col * imageWidth,
      topRow: boxData.top_row * imageHeight,
      rightCol: imageWidth * (1 - boxData.right_col),
      bottomRow: imageHeight * (1 - boxData.bottom_row),
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateBox(response));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { onInputChange, onButtonSubmit } = this;
    const { imageUrl, box } = this.state;
    const { session } = this.props;
    const date = new Date();
    const hour = date.getHours();
    let greet = '';

    if (hour < 12) {
      greet = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      greet = 'Good Afternoon';
    } else if (hour >= 17 && hour <= 24) {
      greet = 'Good Evening';
    }
    return (
      <Fragment>
        <Main>
          <Flex between>
            <Img src={totoroImage} alt="totoro" />
            <H1 landing>Facial Detection App</H1>
            <SignOutButton />
          </Flex>
          <Adjust center margin={'0 auto 50px auto'}>
            {session && session.me && (
              <H2>
                {greet}
                <Span>{session.me.firstname}!</Span>
              </H2>
            )}
          </Adjust>
          <Adjust center margin={'0 15px'}>
            <ImageLinkForm
              inputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </Adjust>
          <MessageWrapper>
            <Adjust center>
              <H3>Comment Section!</H3>
            </Adjust>
            <MessageBorder>
              <MessageCreate />
              <MessageContentWrapper>
                <Messages limit={3} />
              </MessageContentWrapper>
            </MessageBorder>
          </MessageWrapper>
        </Main>
        <Footer />
      </Fragment>
    );
  }
}

export default withAuthorization(
  session => session && session.me && session.me.confirmed,
)(Landing);
