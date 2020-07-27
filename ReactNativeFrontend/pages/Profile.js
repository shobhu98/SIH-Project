import React from 'react';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import {Content, H2, Input, Item, Text, Textarea} from 'native-base';
import {Divider,Button, Provider as PaperProvider, DefaultTheme, } from 'react-native-paper';
import { Title } from 'react-native-paper';

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
    h2:{
      marginTop:10,
      color:"#FF4B63",
      marginBottom:10
    },
    view:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    divider:{
        height:2,
        width:200,
        marginBottom:10
    },
    button1:{
        width:200,
        borderWidth:2,
        borderColor:"#16335C"
    },
    button2:{
        width:120,
        borderWidth:2,
        borderColor:"#16335C"
    },
    view2:{
        flexDirection: 'row',
        marginTop:15
    },
    edit:{
        textDecorationLine: 'underline',
        color:"#16335C"
    },
    text:{
        marginTop:10
    },
    bg:{
        backgroundColor:"white"
    },
});

export default class ChooseGender extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"Ankita",
            address:"G-74, Sector-87, Noida",
            district:"GBN",
            mobile:"7042105583",
            email:"ankita@gmail.com",
            country:"India",
            ppnum:"NA",
            dob:"17/04/2020"
        }
    }
    render(){
        return(
            <Content padder style={styles.bg}>
                <H2 style={styles.h2}>Profile</H2>
                <Divider style={styles.divider}/>
                <PaperProvider theme={theme}>
                    <View style={styles.view}>
                        <Button mode="outlined" style={styles.button1} onPress={() => this.props.navigation.navigate('ChangeLanguage')} >Change Language</Button>
                        <Button mode="outlined" style={styles.button2}>Sign Out</Button>   
                    </View>
                </PaperProvider>
                <View style={styles.view2}>
                    <Title>Details </Title>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FillProfile')} >
                        <Title style={styles.edit}>(Edit)</Title>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Name</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.name} />
                    </Item>
                    <Text style={styles.text}>Address</Text>
                    <Textarea disabled rowSpan={4} bordered placeholder={this.state.address}/>
                    <Text style={styles.text}>District</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.district} />
                    </Item>
                    <Text style={styles.text}>Mobile Number</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.mobile} />
                    </Item>
                    <Text style={styles.text}>Email ID</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.email} />
                    </Item>
                    <Text style={styles.text}>Country</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.country} />
                    </Item>
                    <Text style={styles.text}>Passport Number</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.ppnum} />
                    </Item>
                    <Text style={styles.text}>Date Of Birth</Text>
                    <Item regular>
                        <Input disabled placeholder={this.state.dob} />
                    </Item>
                </View>
            </Content>
        );
    }
}
