import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './styles.css';

const Btn = ({onClickBtn, txt, type}) => (
    <Button variant="contained" color="primary" className="button" onClick={onClickBtn}>
        {txt}
        <Icon className="rightIcon">{type}</Icon>
    </Button>
);

Btn.propTypes = {
    onClickBtn: PropTypes.func.isRequired,
    txt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };


export default Btn;