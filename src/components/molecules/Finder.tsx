import { useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 4,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 4,
  color: theme.palette.primary.contrastText,
  padding: 7,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

type Props = {
  isLoading: boolean;
  onFetchUser: (name: string) => void;
};

const Finder = ({ isLoading, onFetchUser }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const onKeyUp = ({ keyCode }: { keyCode: number }) => {
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
      <StyledTextField
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
                <CircularProgress className="loaderIcon" size={22} thickness={4} />
              ) : (
                <Icon sx={{ fontSize: '1.4rem' }}>person</Icon>
              )}
            </InputAdornment>
          ),
        }}
      />
      <StyledIconButton
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

export default Finder;
