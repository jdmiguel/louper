import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextTag from '@/components/shared/TextTag';
import Link from '@/components/shared/Link';
import { UserData } from '@/utils/types';
import {
  StyledRoot,
  StyledAvatarWrapper,
  StyledContent,
  StyledHeadings,
  StyledDetails,
  StyledTextTagWrapper,
  StyledAction,
} from './styles';

const buildCreationDate = (date: string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleString();

  return formattedDate.slice(0, formattedDate.indexOf(','));
};

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
  <StyledRoot>
    <StyledAvatarWrapper>
      <Avatar sx={{ width: 240, height: 240, position: 'absolute' }} />
      <Avatar
        alt="user avatar"
        src={avatar_url}
        sx={{
          width: 240,
          height: 240,
          position: 'absolute',
          boxShadow: '0px 0px 14px 6px rgb(169 45 201 / 40%)',
        }}
      />
    </StyledAvatarWrapper>
    <StyledContent>
      <StyledHeadings>
        {name && (
          <Typography variant="h3" sx={{ marginBottom: 0.4 }}>
            {name}
          </Typography>
        )}
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {login}
        </Typography>
        {bio && (
          <Typography
            sx={{
              color: 'secondary.light',
              overflow: 'hidden',
              maxWidth: 240,
              textOverflow: 'ellipsis',
            }}
          >
            {bio}
          </Typography>
        )}
      </StyledHeadings>
      <StyledDetails>
        <StyledTextTagWrapper>
          <TextTag content={`${public_repos}`} withUppercase withIcon iconType="folder" />
        </StyledTextTagWrapper>
        <StyledTextTagWrapper>
          <TextTag content={`${following}`} withUppercase withIcon iconType="visibility" />
        </StyledTextTagWrapper>
        <StyledTextTagWrapper>
          <TextTag content={`${followers}`} withUppercase withIcon iconType="favorite" />
        </StyledTextTagWrapper>
        <StyledTextTagWrapper>
          <TextTag content={buildCreationDate(created_at)} withIcon iconType="event_note" />
        </StyledTextTagWrapper>
        {location && (
          <StyledTextTagWrapper>
            <TextTag content={location} withIcon iconType="location_on" />
          </StyledTextTagWrapper>
        )}
        {company && (
          <StyledTextTagWrapper>
            <TextTag content={company} withIcon iconType="business" />
          </StyledTextTagWrapper>
        )}
      </StyledDetails>
      <>
        <StyledAction>
          <Link
            url={html_url}
            ariaLabel={`View ${login} profile on GitHub`}
            content="VISIT PROFILE"
            withIcon
            iconType="person"
          />
        </StyledAction>
        {email && (
          <StyledAction>
            <Link
              url={`mailto:${email}`}
              ariaLabel={`Send email to ${login}`}
              content="SEND EMAIL"
              withIcon
              iconType="mail_outline"
            />
          </StyledAction>
        )}
        {blog && (
          <StyledAction>
            <Link
              url={blog}
              ariaLabel={`View portfolio of ${login}`}
              content="VISIT PORTFOLIO"
              withIcon
              iconType="web_icon"
            />
          </StyledAction>
        )}
      </>
    </StyledContent>
  </StyledRoot>
);

export default Profile;
