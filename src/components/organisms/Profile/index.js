/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';

/* utils */
import { dataModel } from '../../../utils/models';

const Root = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  '& > img': {
    borderRadius: '50%',
    height: 240,
    width: 240,
    '@media (max-width: 768px)': {
      height: 180,
      width: 180,
    },
  },
  marginTop: '25vh',
  '@media (max-width: 768px)': {
    marginTop: '12vw',
    flexDirection: 'column',
  },
});

const Content = styled('div')({
  marginLeft: 30,
  '@media (max-width: 768px)': {
    textAlign: 'center',
    marginLeft: 0,
    marginTop: 36,
  },
});

const GithubInfo = styled('div')({
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  marginTop: 18,
  marginBottom: 12,
  '@media (max-width: 768px)': {
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const Data = styled('div')({
  alignItems: 'center',
  display: 'flex',
  marginBottom: 2,
});

const Actions = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  marginRight: 14,
  '@media (max-width: 768px)': {
    justifyContent: 'center',
    marginRight: 0,
    marginBottom: 30,
  },
});

const Tag = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  alignItems: 'center',
  marginRight: 8,
});

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

const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.text.main,
  fontSize: 25,
  padding: 4,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: '50%',
  color: theme.palette.primary.contrastText,
  height: 22,
  padding: 18,
  marginRight: 8,
  width: 22,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '@media (max-width: 768px)': {
    justifyContent: 'center',
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
      <Typography variant="h3" cx={{ marginBottom: 4 }}>
        {name}
      </Typography>
      <Typography variant="h4">{bio}</Typography>
      <GithubInfo>
        <Data>
          <Tag>
            <StyledIcon>folder</StyledIcon>
            {repos}
          </Tag>
          <Tag>
            <StyledIcon>visibility</StyledIcon>
            {following}
          </Tag>
          <Tag>
            <StyledIcon>favorite</StyledIcon>
            {followers}
          </Tag>
        </Data>
        <Data>
          {createdAt && (
            <Tag>
              <StyledIcon>event_note</StyledIcon>
              {buildCreationDate(createdAt)}
            </Tag>
          )}
          {location && (
            <Tag>
              <StyledIcon>location_on</StyledIcon>
              {location}
            </Tag>
          )}
          {company && (
            <Tag>
              <StyledIcon>business</StyledIcon>
              {company}
            </Tag>
          )}
        </Data>
      </GithubInfo>
      <Actions>
        <StyledIconButton onClick={() => window.open(htmlUrl, '_blank')}>
          <GithubIconWrapper>
            <GithubIcon />
          </GithubIconWrapper>
        </StyledIconButton>
        {email && (
          <StyledIconButton
            size="small"
            onClick={() => window.open(`mailto:${email}`, '_blank')}
          >
            <Icon sx={{ fontSize: 24 }}>email</Icon>
          </StyledIconButton>
        )}
        {blog && (
          <StyledIconButton
            size="small"
            onClick={() => window.open(blog, '_blank')}
          >
            <Icon sx={{ fontSize: 24 }}>link</Icon>
          </StyledIconButton>
        )}
      </Actions>
    </Content>
  </Root>
);

Profile.propTypes = {
  data: dataModel,
};

export default Profile;
