import React, {Component} from 'react';
import Menu from '../../components/Menu';
import { Wrapper } from '../../utils/wrapper';
import './styles.css';

class Content extends Component {

    menuHandler = index => {
        switch(index){
            case 0:
                this.props.history.push('/user/data');
            break;
            case 1:
                this.props.history.push('/user/repos');
            break; 
            case 2:
                this.props.history.push('/user/following');
            break; 
            case 3:
                this.props.history.push('/user/followers');
            break;  
        }
    }

    render(){
        return(
            <Wrapper>
                <Menu onClickMenu={this.menuHandler}/>
            </Wrapper>
        )
    }
}

export default Content;