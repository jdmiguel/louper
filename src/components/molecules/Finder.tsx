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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minWidth: 390,
    '@media (max-width: 767px)': {
      minWidth: 250,
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    boxShadow: `inset 0 0 1px 2px ${theme.palette.primary.main}`,
  },
}));

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

const MIN_CHARS_TO_SEARCH_USERS = 2;

type Props = {
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  isLoadingUser: boolean;
  isLoadingUsers: boolean;
  onFetchUsers: (query: string) => void;
  onFetchUser: (name: string) => void;
  onClearUsers: () => void;
};

const Finder = ({
  searchQuery,
  onChangeSearchQuery,
  isLoadingUser,
  isLoadingUsers,
  onFetchUsers,
  onFetchUser,
  onClearUsers,
}: Props) => {
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event?.target?.value;

    if (currentSearchQuery === searchQuery) {
      return;
    }
    onChangeSearchQuery(currentSearchQuery);

    if (currentSearchQuery.length > MIN_CHARS_TO_SEARCH_USERS)
      debouncedFunction(currentSearchQuery);
    if (currentSearchQuery.length <= MIN_CHARS_TO_SEARCH_USERS) onClearUsers();
  };

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
        value={searchQuery}
        onFocus={() => setIsValidating(false)}
        onChange={onChange}
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
