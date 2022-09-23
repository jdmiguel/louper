import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { User } from '@/utils/types';

const StyledButton = styled(Button)(({ theme }) => ({
  height: 44,
  minWidth: 160,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '@media (min-width: 768px)': {
    minWidth: 180,
  },
}));

const AvatarWrapper = styled('div')({
  height: 32,
  marginRight: 10,
  position: 'relative',
  width: 32,
});

type Props = {
  data: User;
  onClick: (userName: string) => void;
};

const Suggestion = ({ data, onClick }: Props) => (
  <StyledButton variant="contained" onClick={() => onClick(data.login)}>
    <Stack direction="row" sx={{ alignItems: 'center', width: '100%' }}>
      <AvatarWrapper>
        <Avatar variant="circular" sx={{ height: 32, width: 32, position: 'absolute' }} />
        <Avatar
          alt="user avatar"
          variant="circular"
          src={data.avatar_url}
          sx={{ height: 32, width: 32, position: 'absolute' }}
        />
      </AvatarWrapper>
      <Typography
        variant="h5"
        sx={{
          maxWidth: 100,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {data.login}
      </Typography>
    </Stack>
  </StyledButton>
);

export default Suggestion;
