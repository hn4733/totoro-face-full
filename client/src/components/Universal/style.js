import styled, { css, theme, keyframes } from '../../theme';
import BackImage from '../../resources/images/totoro-back-new.jpg';

export const Back = styled.div`
  background-image: url(${BackImage});
  background-size: 55%;
  background-position: bottom;
  background-repeat: no-repeat;
  height: 100vh;

  @media (max-width: 950px) {
    height: auto;
  }
`;

export const Main = styled.div`
  padding: 40px;
  height: 92vh;
  background: url(${BackImage});
  background-size: 55%;
  background-position: bottom;
  background-repeat: no-repeat;

  @media (max-width: 1426px) {
    height: auto;
    padding: 40px 15px;
  }
`;
export const Adjust = styled.div`
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};
`;
export const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  ${props =>
    props.between &&
    css`
      justify-content: space-between;
      align-items: center;
    `};
  ${props =>
    props.back &&
    css`
      background-color: ${theme.grayBack};
    `};
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `};
  ${props =>
    props.end &&
    css`
      justify-content: flex-end;
    `};
`;
export const Col = styled.div`
  display: flex;
  flex: 0 0 ${props => (props.digit === '3' ? '18%' : '50%')};
  padding: 0 20px;
`;
export const Width = styled.div`
  ${props =>
    props.full &&
    css`
      width: 100%;
    `};
  ${props =>
    props.relative &&
    css`
      position: relative;
    `};
`;

export const Button = styled.button`
  width: 100%;
  ${props =>
    props.normal &&
    css`
      width: auto;
    `};
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `};
  border: none;
  margin-top: 10px;
  padding: 10px 30px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  color: white;
  background-color: ${theme.lightBlue};
  ${props =>
    props.noMargin &&
    css`
      margin: 0 7px 0 0;
    `};
  :hover {
    color: white;
    background-color: ${theme.extraLightBlue};
  }
  :disabled {
    background-color: ${theme.extraLightBlue};
  }
  :disabled:hover {
    background-color: ${theme.extraLightBlue};
  }
`;

export const P = styled.p`
  ${props =>
    props.bold &&
    css`
      font-weight: 600;
    `};
  ${props =>
    props.date &&
    css`
      padding: 8px 13px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      border: 1px solid black;
      border-radius: 3px;
      color: black;
    `};
  ${props =>
    props.fontsize &&
    css`
      font-size: ${props.fontsize};
    `};
  ${props =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `};
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
  color: black;
  ${props =>
    props.backtologin &&
    css`
      background-color: white;
      padding: 15px 10px;
    `};
`;
export const H1 = styled.h1`
  font-family: 'Family Guy';
  font-size: 50px;
  letter-spacing: 2px;
  color: #726b9c;
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `};

  @media (max-width: 1426px) {
    text-align: center;
    ${props =>
      props.landing &&
      css`
        order: 1;
      `};
    width: 100%;
  }
  @media (max-width: 950px) {
    font-size: 33px;
  }
  @media (max-width: 560px) {
    width: 341px;
    font-size: 28px;

    ${props =>
      props.landing &&
      css`
        margin: 40px auto;
      `};
  }
`;
export const H2 = styled.h2`
  line-height: 52px;
  font-size: 30px;
  letter-spacing: 2px;
`;
export const H3 = styled.h3`
  color: black;
`;
export const H4 = styled.h4`
  ${props =>
    props.noMB &&
    css`
      margin: 12px 0 4px 0;
      font-size: 16px;
    `};
`;
export const Notification = styled.p`
  font-size: 16px;
  font-weight: normal;
  text-transform: none;
`;
export const Form = styled.form`
  display: flex;
  flex-flow: row wrap;
  ${props =>
    props.signup &&
    css`
      justify-content: space-between;
    `};
`;
export const Label = styled.label`
  font-size: 13px;
  color: darkslategray;
  ${props =>
    props.second &&
    css`
      margin-top: 8px;
    `};
  ${props =>
    props.signup &&
    css`
      width: 100%;
    `};
`;
export const Textarea = styled.textarea`
  padding: 10px 15px;
  width: 100%;
  font-size: 14px;
  border: 0;
  background-color: #eeebf5;
`;

export const MessageWrapper = styled.div`
  position: absolute;
  left: 40px;
  top: 220px;

  @media (max-width: 1426px) {
    position: relative;
    left: auto;
    top: auto;
    width: 500px;
    max-width: 100%;
    margin: 40px auto 40px auto;
  }
`;
export const MessageBorder = styled.div`
  border: 1px solid gray;
  padding: 20px 35px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);
`;
export const MessageContentWrapper = styled.div`
  margin-top: 10px;
  height: 430px;
  overflow-y: scroll;
`;

const totoroMove = keyframes`
  0% {
    transform: rotate(6deg);
  }
  50% {
    transform: rotate(-6deg);
  }
  100% {
    transform: rotate(6deg);
  }
`;

export const Img = styled.img`
  transform-origin: top;
  width: 100px;
  margin-left: 40px;
  animation: 4s infinite ${totoroMove};
`;

export const Span = styled.span`
  display: block;
  font-size: 40px;
  font-family: 'balonku';
`;

export const SignInWrapper = styled.div`
  position: relative;
  padding: 20px 25px 10px;
  border: 1px solid darkslategray;
  border-radius: 5px;
  background-color: white;
  border-top: 13px solid #928ab0;
`;

export const TotoroImage = styled.img`
  position: absolute;
  right: -71px;
  top: 39px;
  width: 138px;
  z-index: -1;

  @media (max-width: 604px) {
    display: none;
  }
`;
export const TotoroSitting = styled.img`
  position: absolute;
  top: -73px;
  left: 0;
  z-index: -1;
  width: 60px;

  @media (max-width: 604px) {
    display: none;
  }
`;
