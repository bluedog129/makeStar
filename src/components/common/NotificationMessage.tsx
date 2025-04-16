import { useEffect, useState } from 'react';
import { NotificationMessageProps } from '@/types/notification';
import { NotificationContainer } from '@/styles/NotificationMessage.styles';

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