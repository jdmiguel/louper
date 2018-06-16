import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './styles.css';

const Btn = (props) => (
    <div className="btnContainer">
        <Button variant="contained" color="primary" className="button" onClick={props.onClickBtn}>
            {props.txt}
            <Icon className="rightIcon">{props.type}</Icon>
        </Button>
    </div>
);

export default Btn;