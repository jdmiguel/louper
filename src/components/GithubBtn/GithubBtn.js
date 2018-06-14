import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './GithubBtn.css';

const GithubBtn = (props) => (
    <div className="btnContainer">
        <Button variant="contained" color="primary" className="button" onClick={props.onClickBtn}>
            Go ahead
            <Icon className="rightIcon">forward</Icon>
        </Button>
    </div>
);

export default GithubBtn;