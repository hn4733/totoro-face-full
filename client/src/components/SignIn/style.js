import styled, { css } from '../../theme';

export const SignInFormWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 0;
  ${props =>
    props.wrap &&
    css`
      flex-flow: row wrap;
    `};

  @media (max-width: 950px) {
    height: auto;
    padding: 40px 10px;
  }
`;
export const SignInWidth = styled.div`
  width: 450px;
  max-width: 100%;
  ${props =>
    props.forgot &&
    css`
      width: 470px;
    `};
  text-align: center;

  @media (max-width: 500px) {
    padding: 0 15px;
  }
`;
export const Input = styled.input`
  width: 100%;
  max-width: 100%;
  margin: 5px 0;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  outline: none;
`;
