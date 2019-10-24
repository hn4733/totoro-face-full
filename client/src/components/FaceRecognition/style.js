import styled, { css } from '../../theme';

export const FaceDectectionArea = styled.div`
  position: relative;
  display: inline-block;
`;
export const BoundingBox = styled.div`
  position: absolute;
  box-shadow: inset 0 0 0 3px #149df2;
  cursor: pointer;
  ${props =>
    props.top &&
    css`
      top: ${props.top}px;
    `};
  ${props =>
    props.top &&
    css`
      left: ${props.left}px;
    `};
  ${props =>
    props.top &&
    css`
      right: ${props.right}px;
    `};
  ${props =>
    props.top &&
    css`
      bottom: ${props.bottom}px;
    `};
`;
