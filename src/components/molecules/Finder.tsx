import { useState, useCallback } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

/* utils */
import { debounce } from '../../utils/index';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minWidth: 390,
    '@media (max-width: 767px)': {
      minWidth: 250,
    },
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
  isLoadingUser: boolean;
  isLoadingUsers: boolean;
  onFetchUsers: (chars: string) => void;
  onFetchUser: (name: string) => void;
};

const Finder = ({ isLoadingUser, isLoadingUsers, onFetchUsers, onFetchUser }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const onKeyUp = ({ keyCode }: { keyCode: number }) => {
    if (!searchQuery || keyCode !== 13) {
      return;
    }

    onFetchUser(searchQuery);
  };

  const isNotValid = isValidating && !searchQuery;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFunction = useCallback(debounce(onFetchUsers, 500), [onFetchUsers]);

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
        autoFocus
        placeholder="Type user name..."
        onFocus={() => {
          setIsValidating(false);
        }}
        onChange={({ target: { value } }) => {
          if (value === searchQuery) {
            return;
          }
          setSearchQuery(value);

          if (value.length > 2) debouncedFunction(value);
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
            <InputAdornment position="end" sx={{ color: 'secondary.light' }}>
              {isLoadingUsers ? (
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
          if (searchQuery !== '') {
            onFetchUser(searchQuery);
          }
        }}
      >
        {isLoadingUser ? (
          <CircularProgress className="loaderIcon" size={23} thickness={4} color="info" />
        ) : (
          <Icon sx={{ fontSize: '1.4rem' }}>search</Icon>
        )}
      </StyledIconButton>
    </FormControl>
  );
};

export default Finder;
