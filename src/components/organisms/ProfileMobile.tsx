/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* styles */
import { ProfileMobileRoot } from './styles';

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const ProfileMobile = ({ data: { avatarUrl, name, login } }: any) => (
  <ProfileMobileRoot>
    <img alt="user avatar" src={avatarUrl} />
    <Content>
      <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
        {name}
      </Typography>
      <Typography variant="h4">{login}</Typography>
    </Content>
  </ProfileMobileRoot>
);

export default ProfileMobile;
