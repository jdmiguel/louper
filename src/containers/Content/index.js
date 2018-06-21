import React, {Component} from 'react';
import Menu from '../../components/Menu';
import FloatBtn from '../../components/FloatBtn';
import storeInstance from '../../store/Store';
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
        }
    }

    backIntroHandler = () => this.props.history.push('/');


    componentWillMount(){
        if(!storeInstance.getIfUserExists()) this.backIntroHandler();
    }

    render(){
        return(
            <Wrapper>
                <Menu onClickMenu={this.menuHandler}/>
                <FloatBtn clickHandler={this.backIntroHandler}/>
            </Wrapper>
        )
    }
}

export default Content;