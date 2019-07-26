import React, {Component} from 'react';

/* core */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Loader from '../core/Loader';

/* icons */
import FolderIcon from '@material-ui/icons/Folder';

/* services */
import { getRepos } from '../../services/github';

/* utils */
import {externalLink} from '../../utils/externalLink';

/* styles */
import './styles.css';

class UserRepos extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: null,
            isLoading: true
        };
    }

    componentDidMount(){
        getRepos(this.props.user)
        .then(data => {
            this.setState({
                data
            }); 
        })
        .catch(error => {
            throw error; 
        })
        .finally( ()=> {
            this.setState({
                isLoading: false
            });  
        });
    }

    render(){
        const {isLoading, data} = this.state;

        return isLoading ? <Loader /> : (
            <div className='userReposContainer'>
                <List>
                {
                    data.map(repo => (
                        <ListItem key={repo.name}
                            button
                            onClick={ () => externalLink(repo.html_url) }
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
        )
    }
} 

export default UserRepos;