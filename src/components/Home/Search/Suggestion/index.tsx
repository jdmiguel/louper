import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { BasicUser } from '@/utils/types';
import { StyledButton, StyledAvatarWrapper } from './styles';

type Props = {
  data: BasicUser;
  onClick: (userName: string) => void;
};

const Suggestion = ({ data, onClick }: Props) => (
  <StyledButton variant="contained" onClick={() => onClick(data.login)}>
    <Stack direction="row" sx={{ alignItems: 'center', width: '100%' }}>
      <StyledAvatarWrapper>
        <Avatar variant="circular" sx={{ height: 32, width: 32, position: 'absolute' }} />
        <Avatar
          alt="user avatar"
          variant="circular"
          src={data.avatar_url}
          sx={{ height: 32, width: 32, position: 'absolute' }}
        />
      </StyledAvatarWrapper>
      <Typography
        variant="h5"
        sx={{
          maxWidth: 100,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {data.login}
      </Typography>
    </Stack>
  </StyledButton>
);

export default Suggestion;
