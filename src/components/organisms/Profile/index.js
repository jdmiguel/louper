/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';

/* utils */
import { navigateToUrl } from '../../../utils';
import { dataModel } from '../../../utils/models';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 240,
  position: 'sticky',
  top: 60,
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '& > img': {
    borderRadius: '50%',
    height: 220,
    width: 220,
    '@media (min-width: 1200px)': {
      height: 240,
      width: 240,
    },
  },
});

const Content = styled('div')({
  marginTop: 20,
  maxWidth: 300,
});

const ContentInfo = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 24,
  paddingBottom: 10,
  paddingTop: 10,
}));

const ContentActions = styled('div')({
  marginTop: 20,
});

const InfoTag = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  marginRight: 12,
  marginBottom: 6,
  fontSize: '0.9rem',
}));

const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 22,
  marginRight: 3,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  fontSize: '0.9rem',
  justifyContent: 'space-evenly',
  padding: 10,
  marginBottom: 8,
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '& span': {
    marginRight: 8,
  },
  '@media (max-width: 768px)': {
    justifyContent: 'center',
  },
}));

const GithubIconWrapper = styled('div')(({ theme }) => ({
  fontSize: 'initial',
  lineHeight: 0,
  '& svg': {
    width: 22,
    '& path': {
      fill: theme.palette.primary.contrastText,
    },
  },
}));

const buildCreationDate = (date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

const Profile = ({
  data: {
    avatarUrl,
    name,
    login,
    bio,
    email,
    repos,
    followers,
    following,
    createdAt,
    location,
    blog,
    company,
    htmlUrl,
  },
}) => (
  <Root>
    <img data-test="profile__image" alt="user avatar" src={avatarUrl} />
    <Content>
      <Typography variant="h3" sx={{ marginBottom: 0.4 }}>
        {name}
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {login}
      </Typography>
      <Typography variant="h5">{bio}</Typography>
      <ContentInfo>
        <InfoTag>
          <StyledIcon>folder</StyledIcon>
          {repos}
        </InfoTag>
        <InfoTag>
          <StyledIcon>visibility</StyledIcon>
          {following}
        </InfoTag>
        <InfoTag>
          <StyledIcon>favorite</StyledIcon>
          {followers}
        </InfoTag>
        {createdAt && (
          <InfoTag>
            <StyledIcon>event_note</StyledIcon>
            {buildCreationDate(createdAt)}
          </InfoTag>
        )}
        {location && (
          <InfoTag>
            <StyledIcon>location_on</StyledIcon>
            {location}
          </InfoTag>
        )}
        {company && (
          <InfoTag>
            <StyledIcon>business</StyledIcon>
            {company}
          </InfoTag>
        )}
      </ContentInfo>
      <ContentActions>
        <StyledButton
          variant="contained"
          onClick={() => navigateToUrl(htmlUrl)}
        >
          <span>Visit Profile</span>
          <GithubIconWrapper>
            <GithubIcon />
          </GithubIconWrapper>
        </StyledButton>
        {email && (
          <StyledButton
            variant="contained"
            onClick={() => navigateToUrl(`mailto:${email}`)}
          >
            <Icon sx={{ fontSize: 24 }}>email</Icon>
          </StyledButton>
        )}
        {blog && (
          <StyledButton variant="contained" onClick={() => navigateToUrl(blog)}>
            <span>Visit portfolio</span>
            <Icon sx={{ fontSize: 24 }}>link</Icon>
          </StyledButton>
        )}
      </ContentActions>
    </Content>
  </Root>
);

Profile.propTypes = {
  data: dataModel,
};

export default Profile;
