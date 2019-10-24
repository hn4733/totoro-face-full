import styled, { theme } from '../../theme';

export const Ul = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;

  .active {
    background-color: ${theme.menuBackActive};
    color: white;
  }
`;
export const MenuItem = styled.div`
  height: 30px;
  padding: 15px 25px;
  text-align: center;
  :hover {
    background-color: ${theme.menuBackActive};
    color: white;
  }
`;
