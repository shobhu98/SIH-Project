import React from 'react';
import {Image} from 'react-native';
import {Dimensions } from "react-native";


export default class ShowImage extends React.Component{
    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.state={
            filepath:navigation.getParam('uri')
        }
        console.log(this.state.filepath);
    }

    render(){
        
        return(
            <Image
                style={{width: Math.round(Dimensions.get('window').width), height: Math.round(Dimensions.get('window').height)}}
                source={{uri: this.state.filepath}}
            />
        );
    }
}