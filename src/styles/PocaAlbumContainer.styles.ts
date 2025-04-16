import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff6b6b;
  margin-bottom: 20px;
`;

export const NotificationMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`; 