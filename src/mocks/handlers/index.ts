import { handler as getUser } from './getUser';
import { handler as getUsers } from './getUsers';
import { handler as getRepos } from './getRepos';
import { handler as getFollowing } from './getFollowing';
import { handler as getFollowers } from './getFollowers';

export default [getUser, getUsers, getRepos, getFollowing, getFollowers];
