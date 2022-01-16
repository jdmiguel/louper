import { ChangeEvent } from 'react';

/* material-ui */
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

/* atoms */
import Link from '../atoms/Link';

/* types */
import { ThemeMode } from '../App';

const Root = styled('footer')({
  display: 'none',
  '@media (min-width: 1200px)': {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    opacity: 1,
    padding: '0 24px',
    position: 'absolute',
    bottom: 0,
    visibility: 'visible',
    width: '100%',
  },
});

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-thumb': {
    color: theme.palette.primary.main,
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const label = { inputProps: { 'aria-label': 'Switch theme' } };

type Props = {
  changeTheme: (themeMode: ThemeMode) => void;
};

const Footer = ({ changeTheme }: Props) => {
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    changeTheme(event.target.checked ? 'light' : 'dark');
  };

  return (
    <Root>
      <Stack direction="row" spacing={0.7} alignItems="center" sx={{ marginBottom: '18px' }}>
        <Typography variant="body1">COPYRIGHT @2021 | Created by </Typography>
        <Link
          url="https://jdmiguel.netlify.app/"
          ariaLabel="View profile of jdmiguel on GitHub"
          content="jdmiguel"
        />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: '6px' }}>
        <Typography variant="body1" sx={{ opacity: isLightTheme ? 0.5 : 1 }}>
          Dark theme
        </Typography>
        <StyledSwitch {...label} checked={isLightTheme} onChange={onChangeTheme} />
        <Typography variant="body1" sx={{ opacity: isLightTheme ? 1 : 0.5 }}>
          Light theme
        </Typography>
      </Stack>
    </Root>
  );
};

export default Footer;
