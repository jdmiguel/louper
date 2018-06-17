import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './styles.css';

const FloatBtn = (props) => {
    return(
        <Button variant="fab" 
                color="secondary"
                className='floatBtn'
                onClick={props.clickHandler}>
            <Icon>arrow_back_icon</Icon>
        </Button>
    )
};

export default FloatBtn;