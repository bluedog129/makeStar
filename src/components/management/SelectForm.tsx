import { useEffect, useRef } from 'react';
import { SelectFormProps } from '@/types/props';
import { SelectContainer, SelectItem } from '@/styles/SelectForm.styles';

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

  const handleItemClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    callback();
  };

  if (!isOpen) return null;

  return (
    <SelectContainer ref={containerRef} $isOpen={isOpen}>
      <SelectItem onClick={handleItemClick(onDownload)}>
        앨범 다운로드
      </SelectItem>
      <SelectItem 
        onClick={handleItemClick(onDelete)}
        style={{ color: '#FF0000' }}
      >
        앨범 삭제
      </SelectItem>
    </SelectContainer>
  );
};

export default SelectForm;