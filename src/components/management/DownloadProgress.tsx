import styled from 'styled-components';
import closeIcon from '../../assets/images/close.png';
import { DownloadProgressProps } from '../../types/props';

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProgressContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom-color: #FF0099;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ProgressText = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: #6C6C6C;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseIcon = styled.img`
  width: 12px;
  height: 12px;
`;

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