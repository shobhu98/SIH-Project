import React from 'react';
import {Content, H2, Text} from 'native-base';

export default class FillForm extends React.Component {
    render(){
        const { navigation } = this.props;
        return(
            <Content padder>
                <H2>{navigation.getParam('name')}</H2>
                <Text>{navigation.getParam('id')}</Text>
            </Content>
        );
    }
}