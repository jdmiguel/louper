/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Avatar from '@mui/material/Avatar';

/* types */
import { User } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 769px)': {
    display: 'none',
  },
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

type Props = {
  user: User;
};

const ProfileMobile = ({ user: { avatar_url, name, login } }: Props) => (
  <Root>
    <Avatar alt="user avatar" src={avatar_url} sx={{ width: 100, height: 100, marginRight: 2.8 }} />
    <Content>
      <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
        {name}
      </Typography>
      <Typography variant="h4">{login}</Typography>
    </Content>
  </Root>
);

export default ProfileMobile;
