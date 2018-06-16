import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import './styles.css';

const IntroInput = (props) => {
    return (
        <FormControl className="formContainer">
            <InputLabel className='label'>
              Add Github User 
            </InputLabel>
            <Input className='input' onChange={event => props.changeUserHandler(event)}/>
        </FormControl>
    );
};
export default IntroInput;