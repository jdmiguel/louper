import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './styles.css';

class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: 0
        }
    }

    changeHandler = (event, value) => {
        const { onClick } = this.props;
        
        onClick(value);
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <div className='menu'>
                <Paper>
                    <Tabs value={value}
                          onChange={this.changeHandler}
                          indicatorColor="primary"
                          textColor="primary"
                          className="tabs"
                          centered>
                        <Tab label="USER DATA" />
                        <Tab label="REPOSITORIES" />
                        <Tab label="FOLLOWING" />
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

Menu.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Menu;