import styled from 'styled-components';
import { SelectContainerStyleProps } from '../types/props';

export const SelectContainer = styled.div<SelectContainerStyleProps>`
  position: absolute;
  right: 100%;
  top: 0%;
  width: 140px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 100;
`;

export const SelectItem = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;

  &:hover {
    background-color: #F6F6F6;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`; 