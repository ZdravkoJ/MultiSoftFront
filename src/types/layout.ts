export interface MainModalProps {
  isOpen: boolean;
  message: string;
  error: boolean;
  show: (message: string, error: boolean) => void;
  close: () => void;
}
