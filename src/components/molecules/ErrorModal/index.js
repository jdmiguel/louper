import PropTypes from 'prop-types';

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  dialog: {
    textAlign: 'center',
  },
  title: {
    fontSize: '1.1rem',
  },
  content: {
    margin: '0 auto 10px',
  },
}));

const ErrorModal = ({ isErrorModalOpen, msg, onClick }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isErrorModalOpen}
      aria-labelledby="simple-dialog-title"
      className={classes.dialog}
    >
      <DialogTitle>{msg}</DialogTitle>
      <DialogContent className={classes.content}>
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
};

ErrorModal.propTypes = {
  isErrorModalOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default ErrorModal;
