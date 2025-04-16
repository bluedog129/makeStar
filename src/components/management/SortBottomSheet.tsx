import { useState } from 'react';
import pinkCheckIcon from '@/assets/images/pinkCheck.png';
import {
  SortType,
  SortBottomSheetProps,
} from '@/types/props';
import {
  Overlay,
  Sheet,
  SortOption,
  CheckIcon,
  SortOptionsContainer,
} from '@/styles/SortBottomSheet.styles';

const SortBottomSheet = ({ isOpen, onClose, onSort }: SortBottomSheetProps) => {
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');

  const handleSortSelect = (sortType: SortType) => {
    setSelectedSort(sortType);
    onSort?.(sortType);
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Sheet $isOpen={isOpen}>
        <SortOptionsContainer>
          <SortOption
            $isSelected={selectedSort === 'latest'}
            onClick={() => handleSortSelect('latest')}
          >
            최신 발매일순
            {selectedSort === 'latest' && <CheckIcon src={pinkCheckIcon} alt="selected" />}
          </SortOption>
          <SortOption
            $isSelected={selectedSort === 'name'}
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