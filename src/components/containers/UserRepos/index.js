import React from 'react';
import { repoDataModel } from '../../../utils/models';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import './styles.css';

const clickListHandler = url => window.open(url,'_blank');

const UserRepos = ({ data }) => (
    <div className='userReposContainer'>
        <List>
        {
            data.map((repo,i) => (
                    <ListItem key={repo.name + i}
                            button
                            onClick={ () => clickListHandler(repo.html_url) }
                            className='itemUserRepos'>
                            <Avatar>
                                <FolderIcon className='iconUserRepos'/>
                            </Avatar>
                            <ListItemText primary={repo.name} 
                                        secondary={repo.description} />
                    </ListItem> 
                ))
        }
        </List>
    </div>
);

UserRepos.propTypes = {
    data: repoDataModel
};

export default UserRepos;