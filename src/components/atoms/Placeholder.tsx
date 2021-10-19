/* styles */
import {
  PlaceholderRoot,
  PlaceholderShimmer,
  PlaceholderRepoContent,
  PlaceholderRepoLine,
  PlaceholderRepoDivider,
  PlaceholderUserContent,
  PlaceholderUserVline,
  PlaceholderUserHline,
} from './styles';

const Repo = (
  <PlaceholderRepoContent>
    <PlaceholderRepoLine />
    <PlaceholderRepoLine />
    <PlaceholderRepoLine />
    <PlaceholderRepoDivider />
    <PlaceholderRepoLine />
  </PlaceholderRepoContent>
);

const User = (
  <PlaceholderUserContent>
    <PlaceholderUserVline />
    <PlaceholderUserHline />
    <PlaceholderUserHline />
    <PlaceholderUserHline />
  </PlaceholderUserContent>
);

const Placeholder = ({ hasUserStyle = false }) => (
  <PlaceholderRoot>
    <PlaceholderShimmer>{!hasUserStyle ? Repo : User}</PlaceholderShimmer>
  </PlaceholderRoot>
);

export default Placeholder;
