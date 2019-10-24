import styled from '../../theme';

export const ImageDetectionSection = styled.div`
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    display: flex;
    flex-flow: row wrap;
  }
`;
export const FormSection = styled.div`
  margin: 0 auto;
  display: flex;
  padding: 10px 15px;
  background-color: #726b9c;
  width: 500px;
  border-radius: 5px;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    flex-flow: row wrap;
  }
`;
export const FormInput = styled.input`
  font-size: 14px;
  width: 70%;
  padding-left: 20px;
  margin-right: 3px;
  border-radius: 3px;
  border: 0;

  @media (max-width: 600px) {
    margin-right: 0;
    border-radius: 0;
    padding: 10px 10px;
    width: 100%;
  }
`;
export const FormButton = styled.button`
  width: 30%;
  padding: 10px 0;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: white;
  :hover {
    color: white;
    background-color: #a099bb;
  }

  @media (max-width: 600px) {
    margin-top: 10px;
    width: 100%;
  }
`;
