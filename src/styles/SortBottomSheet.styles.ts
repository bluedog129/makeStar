import styled from 'styled-components';
import { OverlayStyleProps, SheetStyleProps, SortOptionStyleProps } from '../types/props';

export const Overlay = styled.div<OverlayStyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

export const Sheet = styled.div<SheetStyleProps>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ $isOpen }) => ($isOpen ? '0' : '-240px')};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: 170px;
  background-color: white;
  border-radius: 12px 12px 0 0;
  transition: bottom 0.3s ease-in-out;
  z-index: 1001;
  padding: 20px 20px calc(20px + env(safe-area-inset-bottom));

  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 4px;
    background-color: #E6E6E6;
    border-radius: 2px;
  }
`;

export const SortOption = styled.button<SortOptionStyleProps>`
  width: 100%;
  height: 56px;
  padding: 0px 8px 0px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $isSelected }) => ($isSelected ? '#FF0099' : '#000000')};
  cursor: pointer;
`;

export const CheckIcon = styled.img`
  width: 12px;
  height: 8px;
`;

export const SortOptionsContainer = styled.div`
`; 