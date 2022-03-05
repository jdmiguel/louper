import { forwardRef, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const StyledAlert = styled(MuiAlert)({
  '& .MuiAlert-icon': {
    padding: '9px 0',
  },
  '& .MuiAlert-message': {
    padding: '12px 0',
  },
  '& .MuiAlert-action': {
    svg: {
      height: '1.4rem',
      width: '1.4rem',
    },
  },
});

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
  type: AlertColor;
  msg: string;
  onClose: () => void;
};

const Toast = ({ isOpen, type, msg, onClose }: Props) => (
  <Snackbar
    open={isOpen}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <Alert severity={type} onClose={onClose}>
      {msg}
    </Alert>
  </Snackbar>
);

export default Toast;
