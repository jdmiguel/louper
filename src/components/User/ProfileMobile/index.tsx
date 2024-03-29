import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useUser } from '@/contexts/UserContext';
import { StyledRoot, StyledAvatarWrapper } from './styles';

const ProfileMobile = () => {
  const { user } = useUser();
  const { avatar_url, name, login } = user;

  return (
    <StyledRoot>
      <StyledAvatarWrapper>
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
      </StyledAvatarWrapper>
      <Stack justifyContent="center">
        {name && (
          <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
            {name}
          </Typography>
        )}
        <Typography variant="h4">{login}</Typography>
      </Stack>
    </StyledRoot>
  );
};

export default ProfileMobile;
