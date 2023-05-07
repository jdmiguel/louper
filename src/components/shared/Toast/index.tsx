import { forwardRef, ReactNode } from 'react';
import { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { StyledAlert } from './styles';

type AlertProps = {
  children?: ReactNode;
  severity: AlertColor;
  onClose: () => void;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <StyledAlert elevation={4} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'Alert';

type Props = {
  isOpen: boolean;
  msg: string;
  onClose: () => void;
};

const Toast = ({ isOpen, msg, onClose }: Props) => (
  <Snackbar
    open={isOpen}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <Alert severity="error" onClose={onClose}>
      {msg}
    </Alert>
  </Snackbar>
);

export default Toast;
