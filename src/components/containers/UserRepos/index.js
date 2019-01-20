import React from 'react';
import { repoDataModel } from '../../../utils/models';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Folder from '@material-ui/icons/Folder';
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
                              className='itemRepo'>
                                <Folder className='iconUserRepos'/>
                                {repo.name}
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