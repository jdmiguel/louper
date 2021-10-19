import { useState } from 'react';

/* material-ui */
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import UserIcon from '@mui/icons-material/Person';
import Icon from '@mui/material/Icon';

/* styles */
import { FinderInput, FinderIconButton } from './styles';

const Finder = ({
  isLoading,
  onFetchUser,
}: {
  isLoading: boolean;
  onFetchUser: (name: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const onKeyUp = ({ keyCode }: { keyCode: any }) => {
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
      <FinderInput>
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
                  <CircularProgress className="loaderIcon" size={22} thickness={4} />
                ) : (
                  <UserIcon />
                )}
              </InputAdornment>
            ),
          }}
        />
      </FinderInput>
      <FinderIconButton
        onClick={() => {
          setIsValidating(true);
          if (inputValue !== '') {
            onFetchUser(inputValue);
          }
        }}
      >
        <Icon sx={{ fontSize: '1.5rem' }}>search</Icon>
      </FinderIconButton>
    </FormControl>
  );
};

export default Finder;
