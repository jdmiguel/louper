import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Btn from '../Btn';
import './styles.css';


const ErrorModal = (props) => (
    <Dialog open={props.isErrorModalOpen} 
            aria-labelledby='simple-dialog-title'
            className='errorModal'>
                <DialogTitle>Please, choose an available user</DialogTitle>
                <DialogContent className='errorContentModal'>
                    <Btn type='restore'
                         txt='TRY AGAIN'
                         onClickBtn={props.clickErrorModalBtnHandler}/>
                </DialogContent>
    </Dialog>
);

export default ErrorModal;