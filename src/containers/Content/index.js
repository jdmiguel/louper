import React, {Component} from 'react';
import Menu from '../../components/Menu';
import FloatBtn from '../../components/FloatBtn';
import { Wrapper } from '../../utils/wrapper';
import PropTypes from 'prop-types';
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
        }
    }

    backIntroHandler = () => this.props.history.push('/');

    render(){
        return(
            <Wrapper>
                <Menu onClickMenu={this.menuHandler}/>
                <FloatBtn clickHandler={this.backIntroHandler}/>
            </Wrapper>
        )
    }
}

Content.propTypes = {
    history: PropTypes.func
};

export default Content;