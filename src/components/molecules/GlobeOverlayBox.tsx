import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

const Root = styled('div')(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor: theme.palette.overlay.main,
  borderRadius: 8,
  padding: 15,
  position: 'absolute',
  zIndex: 1,
}));

const OverlayBoxCountry = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  marginBottom: 4,
}));

const OverlayBoxCountryIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  marginRight: 7,
}));

const OverlayBoxUsers = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
}));

const OverlayBoxUsersIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 18,
  marginRight: 7,
}));

export type OverlayBoxData = {
  country: string;
  x: number;
  y: number;
  totalUsers: string;
};

type Props = {
  data: OverlayBoxData;
};

const GlobeOverlayBox = ({ data }: Props) => {
  const { x, y, country, totalUsers } = data;

  return (
    <Root
      sx={{
        left: `${x - 54}px`,
        top: `${y + 16}px`,
      }}
    >
      <OverlayBoxCountry>
        <OverlayBoxCountryIcon>location_on</OverlayBoxCountryIcon>
        <Typography variant="h6">{`${country}`}</Typography>
      </OverlayBoxCountry>
      <OverlayBoxUsers>
        <OverlayBoxUsersIcon>person</OverlayBoxUsersIcon>
        <Typography variant="body2">{`${totalUsers}`}</Typography>
      </OverlayBoxUsers>
    </Root>
  );
};

export default GlobeOverlayBox;
