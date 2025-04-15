import React, { useState } from 'react';
import styled from 'styled-components';
import pinkCheckIcon from '../../assets/images/pinkCheck.png';

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

const SortOption = styled.button<{ isSelected: boolean }>`
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
  color: ${({ isSelected }) => (isSelected ? '#FF0099' : '#000000')};
  cursor: pointer;
`;

const CheckIcon = styled.img`
  width: 12px;
  height: 8px;
`;

const SortOptionsContainer = styled.div`
`;

type SortType = 'latest' | 'name';

interface SortBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSort?: (sortType: SortType) => void;
}

const SortBottomSheet: React.FC<SortBottomSheetProps> = ({ isOpen, onClose, onSort }) => {
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');

  const handleSortSelect = (sortType: SortType) => {
    setSelectedSort(sortType);
    onSort?.(sortType);
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <Sheet isOpen={isOpen}>
        <SortOptionsContainer>
          <SortOption
            isSelected={selectedSort === 'latest'}
            onClick={() => handleSortSelect('latest')}
          >
            최신 발매일순
            {selectedSort === 'latest' && <CheckIcon src={pinkCheckIcon} alt="selected" />}
          </SortOption>
          <SortOption
            isSelected={selectedSort === 'name'}
            onClick={() => handleSortSelect('name')}
          >
            앨범 이름순
            {selectedSort === 'name' && <CheckIcon src={pinkCheckIcon} alt="selected" />}
          </SortOption>
        </SortOptionsContainer>
      </Sheet>
    </>
  );
};

export default SortBottomSheet;