import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './styles.css';

const Btn = (props) => (
    <Button variant="contained" color="primary" className="button" onClick={props.onClickBtn}>
        {props.txt}
        <Icon className="rightIcon">{props.type}</Icon>
    </Button>
);

export default Btn;