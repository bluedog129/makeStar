import styled from 'styled-components';
import closeIcon from '../assets/images/close.png';

export const TopbarContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px 15px 20px;
  background-color: white;
`;

export const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 34px;
`;

export const CloseButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background-image: url(${closeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`; 