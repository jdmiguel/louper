import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './styles.css';

const Btn = ({onClickBtn, txt, type}) => (
    <Button variant="contained" color="primary" className="button" onClick={onClickBtn}>
        {txt}
        <Icon className="rightIcon">{type}</Icon>
    </Button>
);


export default Btn;