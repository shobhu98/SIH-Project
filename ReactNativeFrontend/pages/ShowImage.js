import React from 'react';
import {Text} from 'react-native';

export default class ShowImage extends React.Component{
    render(){
        const { params } = this.props.navigation.state;
        const uri = params ? params.uri : null;
        return(
            <Text>{JSON.stringify(uri)}</Text>
        );
    }
}