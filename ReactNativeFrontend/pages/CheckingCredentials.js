import React from 'react';
import {Text} from 'react-native';

export default class FileFIR extends React.Component{
    constructor(props){
        super(props);
        //handle login stuff here
        this.props.navigation.replace('Login');
    }
    render(){
        return(<Text>wait</Text>);
    }
}