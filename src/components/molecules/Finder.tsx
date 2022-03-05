import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

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
  const [isValidating, setIsValidating] = useState(false);

  const isNotValid = isValidating && !searchQuery;

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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const currentSearchQuery = event?.target?.value;
          if (currentSearchQuery === searchQuery) {
            return;
          }
          onChangeSearchQuery(currentSearchQuery);
        }}
        onKeyUp={({ key }: { key: string }) => {
          if (!searchQuery || key !== 'Enter') {
            return;
          }
          onFetchUser(searchQuery);
        }}
        size="small"
        variant="outlined"
        error={isNotValid}
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
                <Icon sx={{ color: 'neutral.light', fontSize: '1.4rem' }}>person</Icon>
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
        role="button"
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
