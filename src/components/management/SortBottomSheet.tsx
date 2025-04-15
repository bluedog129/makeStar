import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const Sheet = styled.div<{ isOpen: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ isOpen }) => (isOpen ? '0' : '-240px')};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: 240px;
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

interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SortBottomSheet: React.FC<SortBottomSheetProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Sheet isOpen={isOpen} />
    </>
  );
};

export default SortBottomSheet;