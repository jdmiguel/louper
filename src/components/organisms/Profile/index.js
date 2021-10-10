/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import WebIcon from '@mui/icons-material/Web';

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
  '& img': {
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

const StyledLink = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 700,
  marginBottom: 6,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color ease-out 250ms',
  '& path': { transition: 'fill ease-out 250ms' },
  '&:hover': {
    color: theme.palette.primary.light,
    '& path': { fill: theme.palette.primary.light },
  },
}));

const GithubIconWrapper = styled('div')(({ theme }) => ({
  marginRight: 6,
  '& svg': {
    width: 22,
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

const StyledLinkIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 22,
  marginRight: 6,
}));

const StyledWebIcon = styled(WebIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
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
        <StyledLink
          onClick={() => navigateToUrl(htmlUrl)}
          target="_self"
          rel="noopener noreferrer"
          aria-label={`View ${name} profile on GitHub`}
        >
          <GithubIconWrapper>
            <GithubIcon />
          </GithubIconWrapper>
          Visit Profile
        </StyledLink>
        {email && (
          <StyledLink
            onClick={() => navigateToUrl(`mailto:${email}`)}
            target="_self"
            rel="noopener noreferrer"
            aria-label={`Send email to ${login}`}
          >
            <StyledLinkIcon>email</StyledLinkIcon>
            Send email
          </StyledLink>
        )}
        {blog && (
          <StyledLink
            onClick={() => navigateToUrl(blog)}
            target="_self"
            rel="noopener noreferrer"
            aria-label={`View portfolio of ${name}`}
          >
            <StyledWebIcon />
            Visit portfolio
          </StyledLink>
        )}
      </ContentActions>
    </Content>
  </Root>
);

Profile.propTypes = {
  data: dataModel,
};

export default Profile;
