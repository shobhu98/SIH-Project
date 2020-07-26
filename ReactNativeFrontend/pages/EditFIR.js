import React from 'react';
import {Content, H2, Text} from 'native-base';

export default class FillForm extends React.Component {
    render(){
        return(
            <Content padder>
                <H2>{JSON.stringify(navigation.getParam('name'))}</H2>
                <Text>{JSON.stringify(navigation.getParam('status'))}</Text>
            </Content>
        );
    }
}