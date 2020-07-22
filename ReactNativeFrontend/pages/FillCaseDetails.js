import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Button, Provider as PaperProvider, DefaultTheme, Title, Divider } from 'react-native-paper';
import { Container, Input, H2, Text, Textarea, Item, StyleProvider, Content, Picker, Icon} from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/textjs';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF4B63',
        accent: '#f1c40f',
    },
};
const styles = StyleSheet.create({
    englishButton: {
        margin: 40,
        padding:30,
        borderColor:"#FF4B63",
        borderWidth: 2,
    },
});

export default class FillCaseDetails extends React.Component {
    render(){
        return(
            <Content style={styles.content}>
                <PaperProvider theme={theme}>
                    {/* <Title>Choose gender of officer</Title> */}
                    <Button mode="outlined" style={styles.englishButton} labelStyle={styles.labelstyle} icon="gender-male" onPress={() => this.props.navigation.navigate('MAnimationStack')} >yolo</Button>
                    <Button mode="outlined" style={styles.hindiButton} labelStyle={styles.labelstyle} icon="gender-female" onPress={() => this.props.navigation.navigate('FAnimationStack')}>yolo</Button>
                </PaperProvider>
            </Content>
        );
    }
}