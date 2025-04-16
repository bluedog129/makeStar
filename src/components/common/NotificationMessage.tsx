import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NotificationMessageProps, NotificationContainerProps } from '../../types/notification';

const NotificationContainer = styled.div<NotificationContainerProps>`
  position: fixed;
  ${props => props.$position === 'top' ? 'top: 20px;' : 'bottom: 20px;'}
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
      transform: translate(-50%, ${props => props.$position === 'top' ? '-20px' : '20px'});
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const NotificationMessage = ({ 
  message, 
  duration = 3000, 
  onClose,
  position = 'bottom'
}: NotificationMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return <NotificationContainer $position={position}>{message}</NotificationContainer>;
};

export default NotificationMessage; 