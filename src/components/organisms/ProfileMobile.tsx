/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/* atoms */
import Avatar from '@mui/material/Avatar';

/* types */
import { User } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 768px)': {
    display: 'none',
  },
});

type Props = {
  user: User;
};

const ProfileMobile = ({ user: { avatar_url, name, login } }: Props) => (
  <Root>
    <Avatar alt="user avatar" src={avatar_url} sx={{ width: 100, height: 100, marginRight: 2.8 }} />
    <Stack justifyContent="center">
      <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
        {name}
      </Typography>
      <Typography variant="h4">{login}</Typography>
    </Stack>
  </Root>
);

export default ProfileMobile;
