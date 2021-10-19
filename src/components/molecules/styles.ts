/* material-ui */
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

const MenuRoot = styled('header')({
  position: 'sticky',
  top: 0,
});

const MenuTabs = styled(Tabs)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.secondary.light}`,

  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
    '@media (min-width: 1200x)': {
      justifyContent: 'center',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 2,
  },
}));

const MenuTab = styled(Tab)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minWidth: 60,
  '@media (min-width: 992px)': {
    minWidth: 120,
  },
  '@media (min-width: 1200px)': {
    minWidth: 200,
  },
  '& svg': {
    fill: theme.palette.primary.dark,
    marginBottom: '2px !important',
    transition: 'fill ease-out 250ms',
    width: 22,
    '& + span': {
      color: theme.palette.primary.dark,
      display: 'none',
      fontSize: '0.9rem',
      transition: 'color ease-out 250ms',
      '@media (min-width: 992px)': {
        display: 'initial',
      },
    },
  },

  '&:hover': {
    '& svg': {
      fill: theme.palette.primary.light,
      '& + span': { color: theme.palette.primary.light },
    },
  },
}));

const FinderInput = styled('div')({
  '& > div > div': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  '& svg': {
    width: 22,
  },
});

const FinderIconButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
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

const FooterRoot = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px 24px',
});

const FooterLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  fontWeight: 700,
  textDecoration: 'none',
  color: theme.palette.primary.dark,
  transition: 'color ease-out 250ms',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

export { MenuRoot, MenuTabs, MenuTab, FinderInput, FinderIconButton, FooterRoot, FooterLink };
