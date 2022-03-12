import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { UserData } from '../../../utils/types';

const Root = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 768px)': {
    display: 'none',
  },
});

const AvatarWrapper = styled('div')({
  height: 90,
  marginRight: 20,
  position: 'relative',
  width: 90,
});

type Props = {
  userData: UserData;
};

const ProfileMobile = ({ userData: { avatar_url, name, login } }: Props) => (
  <Root>
    <AvatarWrapper>
      <Avatar sx={{ width: 90, height: 90, position: 'absolute' }} />
      <Avatar
        alt="user avatar"
        src={avatar_url}
        sx={{
          width: 90,
          height: 90,
          position: 'absolute',
          boxShadow: '0px 0px 14px 5px rgba(201,75,115,0.24)',
        }}
      />
    </AvatarWrapper>
    <Stack justifyContent="center">
      {name && (
        <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
          {name}
        </Typography>
      )}
      <Typography variant="h4">{login}</Typography>
    </Stack>
  </Root>
);

export default ProfileMobile;
