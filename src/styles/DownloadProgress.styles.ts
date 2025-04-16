import styled from 'styled-components';

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ProgressContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Spinner = styled.div`
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

export const ProgressText = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: #6C6C6C;
`;

export const CloseButton = styled.button`
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

export const CloseIcon = styled.img`
  width: 12px;
  height: 12px;
`; 