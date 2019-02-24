import React from 'react';
import { starredProjectsDataModel } from '../../../utils/models';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import './styles.css';

const clickListHandler = url => window.open(url,'_blank');

const StarredProjects = ({ data }) => (
    <div className='starredProjectsContainer'>
        <List>
        {
            data.map((repo,i) => (
                    <ListItem key={repo.name + i}
                            button
                            onClick={ () => clickListHandler(repo.html_url) }
                            className='itemStarredProjects'>
                            <Avatar>
                                <StarIcon className='iconStarredProjects'/>
                            </Avatar>
                            <ListItemText primary={repo.name} 
                                        secondary={repo.owner.login} />
                            
                    </ListItem> 
                ))
        }
        </List>
    </div>
);

StarredProjects.propTypes = {
    data: starredProjectsDataModel
}

export default StarredProjects;