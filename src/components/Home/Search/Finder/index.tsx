import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';
import { SEARCH_PLACEHOLDER, ERROR_MESSAGE, FINDER_ICON } from '@/utils/literals';
import { StyledTextField, StyledIconButton } from './styles';

const Loader = (
  <CircularProgress className="loaderIcon" size={22} thickness={4} sx={{ color: 'text.primary' }} />
);

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
  const [isInputErrorDisplayed, setIsInputErrorDisplayed] = useState(false);

  const withMinSearch = searchQuery?.length > 2;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearchQuery = event?.target?.value;
    if (currentSearchQuery === searchQuery) {
      return;
    }
    setIsInputErrorDisplayed(false);
    onChangeSearchQuery(currentSearchQuery);
  };

  const handleKeyUp = ({ key }: { key: string }) => {
    if (key !== 'Enter') {
      return;
    }
    if (!withMinSearch) {
      setIsInputErrorDisplayed(true);
      return;
    }
    onFetchUser(searchQuery);
  };

  const handleClick = () => {
    if (!withMinSearch) {
      setIsInputErrorDisplayed(true);
      return;
    }
    onFetchUser(searchQuery);
  };

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
        placeholder={SEARCH_PLACEHOLDER}
        value={searchQuery}
        label={isInputErrorDisplayed ? ERROR_MESSAGE.minChars : ''}
        onFocus={() => setIsInputErrorDisplayed(false)}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        size="small"
        variant="outlined"
        error={isInputErrorDisplayed}
        inputProps={{
          maxLength: 20,
        }}
      />
      <StyledIconButton aria-label="search" onClick={handleClick}>
        {isLoadingUser ? Loader : <Icon sx={{ fontSize: '1.6rem' }}>{FINDER_ICON.button}</Icon>}
      </StyledIconButton>
    </FormControl>
  );
};

export default Finder;
