import styled, { css, theme } from '../../theme';

export const SignUpFormWrapper = styled.div`
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
export const SignUpWidth = styled.div`
  width: 650px;
  max-width: 100%;
  text-align: center;

  @media (max-width: 685px) {
    padding: 0 15px;
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  text-align: left;
  flex-flow: row wrap;
  width: 49%;
  max-width: 100%;
  margin: 5px 0;
  :nth-child(odd) {
    margin-right: 5px;
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`;
export const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid ${theme.extraLightGray};
  border-radius: 3px;
  outline: none;
`;
export const Notification = styled.p`
  border: 1px solid ${theme.extraLightGray};
  border-radius: 3px;
  padding: 10px 30px;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  text-transform: none;
`;
export const Green = styled.span`
  color: ${theme.green};
  display: inline-block;
`;
