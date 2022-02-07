/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Avatar from '@mui/material/Avatar';
import TextTag from '../atoms/TextTag';
import Link from '../atoms/Link';

/* types */
import { UserData } from '../../utils/types';

const buildCreationDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 240,
  position: 'sticky',
  top: 60,
});

const AvatarWrapper = styled('div')({
  height: 240,
  position: 'relative',
  width: 240,
});

const Content = styled('div')({
  marginTop: 20,
  maxWidth: 300,
  overflow: 'hidden',
});

const Info = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 24,
  paddingBottom: 10,
  paddingTop: 10,
}));

const TextTagWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  marginRight: 12,
  marginBottom: 6,
  fontSize: '0.9rem',
}));

const Actions = styled('div')({
  marginTop: 20,
});

const Action = styled('div')({
  marginBottom: 5,
});

type Props = {
  userData: UserData;
};

const Profile = ({
  userData: {
    avatar_url,
    name,
    login,
    bio,
    public_repos,
    following,
    followers,
    created_at,
    location,
    company,
    html_url,
    email,
    blog,
  },
}: Props) => (
  <Root>
    <AvatarWrapper>
      <Avatar sx={{ width: 240, height: 240, position: 'absolute' }} />
      <Avatar
        alt="user avatar"
        src={avatar_url}
        sx={{
          width: 240,
          height: 240,
          position: 'absolute',
          boxShadow: '0 3px 10px rgba(0,0,0,.25)',
        }}
      />
    </AvatarWrapper>
    <Content>
      <Typography variant="h3" sx={{ marginBottom: 0.4 }}>
        {name}
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {login}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          overflow: 'hidden',
          maxWidth: 240,
          textOverflow: 'ellipsis',
        }}
      >
        {bio}
      </Typography>
      <Info>
        <TextTagWrapper>
          <TextTag content={`${public_repos}`} withIcon iconType="folder" />
        </TextTagWrapper>
        <TextTagWrapper>
          <TextTag content={`${following}`} withIcon iconType="visibility" />
        </TextTagWrapper>
        <TextTagWrapper>
          <TextTag content={`${followers}`} withIcon iconType="favorite" />
        </TextTagWrapper>
        {created_at && (
          <TextTagWrapper>
            <TextTag content={buildCreationDate(created_at)} withIcon iconType="event_note" />
          </TextTagWrapper>
        )}
        {location && (
          <TextTagWrapper>
            <TextTag content={location} withLowerCase withIcon iconType="location_on" />
          </TextTagWrapper>
        )}
        {company && (
          <TextTagWrapper>
            <TextTag content={company} withLowerCase withIcon iconType="business" />
          </TextTagWrapper>
        )}
      </Info>
      <Actions>
        <Action>
          <Link
            url={html_url}
            ariaLabel={`View ${name} profile on GitHub`}
            content="VISIT PROFILE"
            withIcon
            iconType="person"
          />
        </Action>
        {email && (
          <Action>
            <Link
              url={`mailto:${email}`}
              ariaLabel={`Send email to ${login}`}
              content="SEND EMAIL"
              withIcon
              iconType="mail_outline"
            />
          </Action>
        )}
        {blog && (
          <Action>
            <Link
              url={blog}
              ariaLabel={`View portfolio of ${name}`}
              content="VISIT PORTFOLIO"
              withIcon
              iconType="web_icon"
            />
          </Action>
        )}
      </Actions>
    </Content>
  </Root>
);

export default Profile;
