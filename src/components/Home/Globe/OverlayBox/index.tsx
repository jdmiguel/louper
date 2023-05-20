import Typography from '@mui/material/Typography';
import { OVERLAY_BOX_OFFSET_LEFT, OVERLAY_BOX_OFFSET_TOP } from '@/utils/literals';
import { OverlayBoxData } from '@/utils/types';
import {
  StyledRoot,
  StyledOverlayBoxCountry,
  StyledOverlayBoxCountryIcon,
  StyledOverlayBoxUsers,
  StyledOverlayBoxUsersIcon,
} from './styles';

type Props = {
  data: OverlayBoxData;
};

const GlobeOverlayBox = ({ data }: Props) => {
  const { x, y, country, totalUsers } = data;

  return (
    <StyledRoot
      sx={{
        left: `${x - OVERLAY_BOX_OFFSET_LEFT}px`,
        top: `${y + OVERLAY_BOX_OFFSET_TOP}px`,
      }}
    >
      <StyledOverlayBoxCountry>
        <StyledOverlayBoxCountryIcon>location_on</StyledOverlayBoxCountryIcon>
        <Typography variant="h6">{`${country}`}</Typography>
      </StyledOverlayBoxCountry>
      <StyledOverlayBoxUsers>
        <StyledOverlayBoxUsersIcon>person</StyledOverlayBoxUsersIcon>
        <Typography variant="body2">{`${totalUsers}`}</Typography>
      </StyledOverlayBoxUsers>
    </StyledRoot>
  );
};

export default GlobeOverlayBox;
