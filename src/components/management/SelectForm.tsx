import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 100%;
  top: 0%;
  width: 140px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 100;
`;

const SelectItem = styled.button`
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

interface SelectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

const SelectForm = ({
  isOpen,
  onClose,
  onDownload,
  onDelete,
}: SelectFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (callback: () => void) => {
    callback();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <SelectContainer ref={containerRef} isOpen={isOpen}>
      <SelectItem onClick={() => handleItemClick(onDownload)}>
        앨범 다운로드
      </SelectItem>
      <SelectItem 
        onClick={() => handleItemClick(onDelete)}
        style={{ color: '#FF0000' }}
      >
        앨범 삭제
      </SelectItem>
    </SelectContainer>
  );
};

export default SelectForm; 