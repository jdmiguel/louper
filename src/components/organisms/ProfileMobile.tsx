/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* types */
import { User } from '../../utils/types';

/* styles */
import { ProfileMobileRoot } from './styles';

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

type Props = {
  user: User;
};

const ProfileMobile = ({ user: { avatar_url, name, login } }: Props) => (
  <ProfileMobileRoot>
    <img alt="user avatar" src={avatar_url} />
    <Content>
      <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
        {name}
      </Typography>
      <Typography variant="h4">{login}</Typography>
    </Content>
  </ProfileMobileRoot>
);

export default ProfileMobile;
