export type NotificationPosition = 'top' | 'bottom';

export interface NotificationMessageProps {
  message: string;
  duration?: number;
  onClose?: () => void;
  position?: NotificationPosition;
}

export interface NotificationContainerProps {
  $position: NotificationPosition;
} 