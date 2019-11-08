import React from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

/* styles */
import './styles.css';

const IntroInput = ({ onChange }) => (
  <FormControl className="formContainer">
    <InputLabel className="label">Add Github User</InputLabel>
    <Input className="input" onChange={event => onChange(event)} />
  </FormControl>
);

IntroInput.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default IntroInput;
