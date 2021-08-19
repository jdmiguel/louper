import React from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

/* styles */
import './styles.css';

const FloatBtn = ({ onClick }) => (
  <Button
    variant="fab"
    color="secondary"
    className="floatBtn"
    onClick={onClick}
  >
    <Icon>search</Icon>
  </Button>
);

FloatBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FloatBtn;
