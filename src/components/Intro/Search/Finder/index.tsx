import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { ErrorMessage } from '@/utils';

const StyledTextField = styled<any>(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    minWidth: 300,
    '@media (min-width: 768px)': {
      minWidth: 390,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 4,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 4,
  color: theme.palette.text.primary,
  minHeight: 40,
  minWidth: 40,
  padding: 7,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

type Props = {
  searchQuery: string;
  isLoadingUser: boolean;
  isLoadingUsers: boolean;
  onChangeSearchQuery: (query: string) => void;
  onFetchUser: (name: string) => void;
};

const Finder = ({
  searchQuery,
  onChangeSearchQuery,
  isLoadingUser,
  isLoadingUsers,
  onFetchUser,
}: Props) => {
  const [isOnError, setIsOnError] = useState(false);
  const withMinSearch = searchQuery?.length > 2;

  return (
    <FormControl
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <StyledTextField
        autoFocus
        placeholder="Type user name..."
        value={searchQuery}
        label={isOnError ? (withMinSearch ? ErrorMessage.NoUser : ErrorMessage.MinChars) : ''}
        onFocus={() => setIsOnError(false)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const currentSearchQuery = event?.target?.value;
          if (currentSearchQuery === searchQuery) {
            return;
          }
          setIsOnError(false);
          onChangeSearchQuery(currentSearchQuery);
        }}
        onKeyUp={({ key }: { key: string }) => {
          if (key !== 'Enter') {
            return;
          }
          if (!withMinSearch) {
            setIsOnError(true);
            return;
          }
          onFetchUser(searchQuery);
        }}
        size="small"
        variant="outlined"
        error={isOnError}
        inputProps={{
          maxLength: 20,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ color: 'text.primary' }}>
              {isLoadingUsers ? (
                <CircularProgress
                  className="loaderIcon"
                  size={22}
                  thickness={4}
                  sx={{ color: 'text.primary' }}
                />
              ) : (
                <Icon sx={{ color: 'neutral.main', fontSize: '1.4rem' }}>person</Icon>
              )}
            </InputAdornment>
          ),
        }}
      />
      <StyledIconButton
        aria-label="search"
        onClick={() => {
          if (!withMinSearch) {
            setIsOnError(true);
            return;
          }
          onFetchUser(searchQuery);
        }}
      >
        {isLoadingUser ? (
          <CircularProgress
            className="loaderIcon"
            size={23}
            thickness={4}
            sx={{ color: 'text.primary' }}
          />
        ) : (
          <Icon sx={{ fontSize: '1.6rem' }}>search</Icon>
        )}
      </StyledIconButton>
    </FormControl>
  );
};

export default Finder;
