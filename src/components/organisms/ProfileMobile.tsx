/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/* atoms */
import Avatar from '@mui/material/Avatar';

/* types */
import { UserData } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 768px)': {
    display: 'none',
  },
});

type Props = {
  userData: UserData;
};

const ProfileMobile = ({ userData: { avatar_url, name, login } }: Props) => (
  <Root>
    <Avatar
      alt="user avatar"
      src={avatar_url}
      sx={{
        width: 100,
        height: 100,
        marginRight: 2.8,
        boxShadow: '0px 0px 14px 5px rgba(201,75,115,0.24)',
      }}
    />
    <Stack justifyContent="center">
      <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
        {name}
      </Typography>
      <Typography variant="h4">{login}</Typography>
    </Stack>
  </Root>
);

export default ProfileMobile;
