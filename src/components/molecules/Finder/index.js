import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { makeStyles } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import UserIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputWrapper: {
    '& > div > div': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& svg': {
      width: 22,
    },
  },
  iconBtn: {
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
  },
}));

const Finder = ({ isLoading, onFetchUser }) => {
  const classes = useStyles();

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
    <FormControl className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <TextField
          classes={{ root: classes.inputRoot }}
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
      </div>
      <IconButton
        data-test="finder-btn"
        classes={{ root: classes.iconBtn }}
        onClick={() => {
          setIsValidating(true);
          if (inputValue !== '') {
            onFetchUser(inputValue);
          }
        }}
      >
        <Icon>search</Icon>
      </IconButton>
    </FormControl>
  );
};

Finder.propTypes = {
  onFetchUser: PropTypes.func.isRequired,
};

export default Finder;
