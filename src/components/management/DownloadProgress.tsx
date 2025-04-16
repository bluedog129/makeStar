import closeIcon from '../../assets/images/close.png';
import { DownloadProgressProps } from '../../types/props';
import {
  ProgressContainer,
  ProgressContent,
  Spinner,
  ProgressText,
  CloseButton,
  CloseIcon,
} from '../../styles/DownloadProgress.styles';

const DownloadProgress = ({ current, total, totalSize, onCancel }: DownloadProgressProps) => {
  const percentage = Math.round((current / total) * 100);
  const progressText = totalSize 
    ? `${totalSize} MB 중 ${percentage}%`
    : `${percentage}%`;

  return (
    <ProgressContainer>
      <ProgressContent>
        <Spinner />
        <ProgressText>{progressText}</ProgressText>
      </ProgressContent>
      <CloseButton onClick={onCancel}>
        <CloseIcon src={closeIcon} alt="취소" />
      </CloseButton>
    </ProgressContainer>
  );
};

export default DownloadProgress; 