import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import {View, StyleSheet,Text,Image,Alert} from 'react-native';
import { ActivityIndicator, Title, Card, Subheading } from 'react-native-paper';
import { Modal, Portal} from 'react-native-paper';
import {Content} from 'native-base'
import Lan from "./LanguageStrings";
import lan from "./global";


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
    view: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:80
    },
    modal: {
        alignItems: 'center'
    },
    button:{
        padding:30,
        width:350
    },
    text:{
        color:"white",
        marginTop:20,
        fontSize:20
    },
    card: {
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        marginBottom:5,
        backgroundColor:"white",
        height:150,
        borderWidth:1,
        borderColor: "#dbdbdb",
    },
    tinyLogo: {
        height: 140,
        width: 110,
        resizeMode: 'contain',
        marginRight:10
    },
    content:{
        backgroundColor:"white"
    },
    cardcontent:{
        paddingBottom:20
    },
    textview:{
        marginHorizontal:10,
        marginVertical:20
    },
    bg:{
        backgroundColor:"white"
    }
});

export default class Signature extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showmodal: false,
            call:true,
            card:false
        };  
        this.showModal = this.showModal.bind(this);
    }

    showModal(){
        this.setState({showmodal: true});
        setTimeout(() => {
            this.setState({showmodal: false});
            this.setState({call: false});
            this.setState({card: true});
        }, 4000);
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //       Alert.alert('I am appearing...','After 5 second!')
    //       }, 5000);
    // }

    render(){
        return(
            <PaperProvider theme={theme} style={styles.bg}>
                {this.state.call && 
                <View style={styles.view} visible={this.state.call}>
                    <Button mode="contained" style={styles.button} onPress={this.showModal} >{Lan.PressForVolunteerButton[lan]}</Button>
                </View>}
                
                <Portal>
                    <Modal visible={this.state.showmodal} contentContainerStyle={styles.modal} >
                        <ActivityIndicator animating={true} size="large" color="#16335C" />
                        <Text style={styles.text}>Checking volunteers</Text>
                    </Modal>
                </Portal>
                {this.state.card &&
                <Content padder>
                    <View style={styles.textview}>
                        <Title>{Lan.VolunteerText1[lan]}</Title>
                        <Subheading>{Lan.VolunteerText2[lan]}</Subheading>
                    </View>
                    
                    <Card style={styles.card} visible={this.state.card}>
                        <Card.Title
                            title={Lan.DummyVolunteerName[lan]}
                            subtitle="+91 7042183975"
                            right={(props) => <Image style={styles.tinyLogo} source={require('../assets/man.png')} resizeMethod="scale"/>}
                            theme={theme}
                        />
                    </Card>
                </Content>
                
                }
                
            </PaperProvider>
        );
    }
}