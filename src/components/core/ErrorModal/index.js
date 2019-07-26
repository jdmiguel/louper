import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Btn from '../Btn';
import './styles.css';

const ErrorModal = ({ isErrorModalOpen, msg, onClick }) => (
  <Dialog
    open={isErrorModalOpen}
    aria-labelledby="simple-dialog-title"
    className="errorModal"
  >
    <DialogTitle>{msg}</DialogTitle>
    <DialogContent className="errorContentModal">
      <Btn type="restore" txt="TRY AGAIN" onClick={onClick} />
    </DialogContent>
  </Dialog>
);

ErrorModal.propTypes = {
  isErrorModalOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired
};

export default ErrorModal;
