import PropTypes from 'prop-types';

/* material-ui */
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

const ErrorModal = ({ isErrorModalOpen, msg, onClick }) => (
  <Dialog
    open={isErrorModalOpen}
    aria-labelledby="simple-dialog-title"
    sx={{ textAlign: 'center' }}
  >
    <DialogTitle sx={{ fontSize: '1.1rem' }}>{msg}</DialogTitle>
    <DialogContent sx={{ margin: '0 auto 10px' }}>
      <Button
        data-test="restore-btn"
        onClick={onClick}
        color="primary"
        variant="contained"
        endIcon={<Icon>restore</Icon>}
      >
        TRY AGAIN
      </Button>
    </DialogContent>
  </Dialog>
);

ErrorModal.propTypes = {
  isErrorModalOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default ErrorModal;
