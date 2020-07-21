import React from 'react';
import { Card, DefaultTheme } from 'react-native-paper';
import {Content} from 'native-base';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {StyleProvider, Header, Title} from 'native-base';
import { Button, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#16335C',
        accent: '#f1c40f',
    },
};
const styles = StyleSheet.create({
    card: {
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:5,
        backgroundColor:"white",
        height:200,
        borderWidth:1,
        borderColor: "#dbdbdb",
    },
    tinyLogo: {
        height: 140,
        width: 110,
        resizeMode: 'contain',
    },
    content:{
        backgroundColor:"white"
    },
    cardcontent:{
        paddingBottom:20
    }
});

export default class FileFIR extends React.Component {
    render(){
        return(
            <Content style={styles.content}>
                <StatusBar backgroundColor="#16335C"/>
                <PaperProvider theme={theme}>
                    <Card style={styles.card}>
                        <Card.Title
                            title="Talk to Virtual Officer"
                            subtitle="Interactive Police Officer"
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/policeman.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                        <Card.Actions style={styles.cardcontent}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('ChooseGender')}>PROCEED</Button>
                        </Card.Actions>
                    </Card>

                    <Card style={styles.card}>
                        <Card.Title
                            title="Call for help"
                            subtitle="Professional Help will come your way"
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/form.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                        <Card.Actions style={styles.cardcontent}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('ChooseGender')}>PROCEED</Button>
                        </Card.Actions>
                    </Card>
                    
                    <Card style={styles.card}>
                        <Card.Title
                            title="Fill Manually"
                            subtitle="The old fashioned way"
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/form.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                        <Card.Actions style={styles.cardcontent}>
                            <Button mode="contained" onPress={() => this.props.navigation.navigate('ChooseGender')}>PROCEED</Button>
                        </Card.Actions>
                    </Card>
                    
                </PaperProvider>
                
            </Content>
        );
    }
}