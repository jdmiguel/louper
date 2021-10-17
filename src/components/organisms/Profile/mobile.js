/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* utils */
import { dataModel } from '../../../utils/models';

const Root = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 769px)': {
    display: 'none',
  },
  '& > img': {
    borderRadius: '50%',
    height: 100,
    marginRight: 20,
    width: 100,
  },
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const ProfileMobile = ({ data: { avatarUrl, name, login } }) => (
  <Root>
    <img alt="user avatar" src={avatarUrl} />
    <Content>
      <Typography variant="h3" sx={{ marginBottom: 0.2 }}>
        {name}
      </Typography>
      <Typography variant="h4">{login}</Typography>
    </Content>
  </Root>
);

ProfileMobile.propTypes = {
  data: dataModel,
};

export default ProfileMobile;
