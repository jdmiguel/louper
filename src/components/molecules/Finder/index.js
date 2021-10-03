import { useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import UserIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const InputWrapper = styled('div')({
  '& > div > div': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  '& svg': {
    width: 22,
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
  '& > span > span': {
    fontSize: '1.03rem',
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const Finder = ({ isLoading, onFetchUser }) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidating, setIsValidating] = useState(null);

  const onKeyUp = ({ keyCode }) => {
    if (!setInputValue || keyCode !== 13) {
      return;
    }

    onFetchUser(inputValue);
  };

  const isNotValid = isValidating && inputValue === '';

  return (
    <FormControl
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <InputWrapper>
        <TextField
          placeholder="Type user name..."
          onFocus={() => {
            setIsValidating(false);
          }}
          onChange={({ target: { value } }) => {
            setInputValue(value);
          }}
          onKeyUp={onKeyUp}
          size="small"
          variant="outlined"
          error={isNotValid}
          inputProps={{
            maxLength: 20,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isLoading ? (
                  <CircularProgress
                    className="loaderIcon"
                    size={22}
                    thickness={4}
                  />
                ) : (
                  <UserIcon />
                )}
              </InputAdornment>
            ),
          }}
        />
      </InputWrapper>
      <StyledIconButton
        data-test="finder-btn"
        onClick={() => {
          setIsValidating(true);
          if (inputValue !== '') {
            onFetchUser(inputValue);
          }
        }}
      >
        <Icon sx={{ fontSize: '1.5rem' }}>search</Icon>
      </StyledIconButton>
    </FormControl>
  );
};

Finder.propTypes = {
  onFetchUser: PropTypes.func.isRequired,
};

export default Finder;
