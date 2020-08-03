import React from 'react';
import { Button, Provider as PaperProvider, DefaultTheme, Title, Divider, IconButton } from 'react-native-paper';
import { Container, Input, H2, Text, Textarea, Item, StyleProvider, Content, Picker, Icon} from 'native-base';
import DatePicker from 'react-native-datepicker'
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/textjs';
import {StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import lan from './global.js'
import Lan from "./LanguageStrings";
import * as FileSystem from 'expo-file-system';


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
        color:"#FF4B63"
    },
    text:{
        marginTop:15
    },
    divider:{
        height:2,
        marginTop:10,
        marginLeft:5,
        marginRight:5
    },
    bg:{
        backgroundColor:"white"
    },
    proceedButton:{
        marginVertical:20,
        marginHorizontal:10
    },
    buttonView:{
        flexDirection:"row"
    }
});

export default class FillCaseDetails extends React.Component {
    
    constructor(props) {
        super(props);
        
        // console.log("profile details");
        // console.log(navigation.getParam('response'));
        //var options=Lan.DistrictOptions[lan];
        var options=["Badoni police station","Basai Police Station","Kotwala Datia Police Station","Gohad Police Station","Gohad Chowk Police Station","Mehgaon Police Station","Jabera Thana","Mou Police Station"];
        var options2=["Badoni police station","Basai Police Station","Kotwala Datia Police Station","Gohad Police Station","Gohad Chowk Police Station","Mehgaon Police Station","Jabera Thana","Mou Police Station"]
        var optionsj=[];
        var optionsj2=[];
        for(var i=0;i<options.length;i++){
            optionsj.push({
                name:options[i],
                key:"key"+i
            });
        }
        for(var i=0;i<options2.length;i++){
            optionsj2.push({
                name:options2[i],
                key:"key"+i
            });
        }
        this.state = {
            selected2: undefined,
            selected:undefined,
            date:"07/22/2020",
            optionsj:optionsj,
            optionsj2:optionsj2,
            // nationality: undefined,
            place:"",
            incident:"",
            suspects:"",
            delay:"",
            uriList:[],
            //personal:navigation.getParam('response')
        };
        this.submit=this.submit.bind(this);
    }
    
    onValueChange(value) {
        this.setState({
          selected: value
        });
    }

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
    }

    // onNationalityChange(value) {
    //     this.setState({
    //       nationality: value
    //     });
    // }
    componentDidMount() {
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert(Lan.CameraPrompt[lan]);
          }
        }
    };
    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            //this.setState({ uriList: this.state.uriList.concat(result.uri) });
            this.setState({ uriList: this.state.uriList.concat(base64) });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    };

    submit(){
        //POST request
        let obj={
            place:this.state.place,
            district:this.state.selected2,
            //police:this.state.selected,
            incident:this.state.incident,
            suspects:this.state.suspects,
            delay:this.state.delay,
            date:this.state.date,
            evidence:this.state.uriList
        }
        console.log("place "+this.state.place);
        console.log("district "+this.state.selected2);
        console.log("police "+this.state.selected);
        console.log("incident "+this.state.incident);
        console.log("suspects "+this.state.suspects);
        console.log("delay "+this.state.delay);
        console.log("date "+this.state.date);
        //console.log(this.state.uriList);
        // this.props.navigation.navigate('Signature',{personal:navigation.getParam('response'),case:obj});
        const { navigation } = this.props;
        console.log("logging parsonal");
        console.log(navigation.getParam('response'));
        this.props.navigation.navigate('Signature',{personal:navigation.getParam('response'),case:obj});
        //this.props.navigation.navigate('Signature',{case:obj});
    }

    render(){

        return(
            <StyleProvider style={getTheme(material)}>
                <Content padder style={styles.bg}>
                    <H2 style={styles.h2}>Incident Details</H2>
                    <Divider style={styles.divider} />
                    <Text style={styles.text}>Place of Occurence</Text>
                    <Item regular>
                        <Input placeholder={Lan.PlaceHolderPlace[lan]} onChangeText={text => this.setState({place:text})}/>
                    </Item>
                    <Text style={styles.text}>District where incident occured</Text>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select your District"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                        >
                            {this.state.optionsj.map((option, index) => (
                                <Picker.Item label={option.name} value={option.name} />
                            ))}
                        </Picker>
                    </Item>
                    <Text style={styles.text}>Police Station</Text>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select your District"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            {this.state.optionsj2.map((option, index) => (
                                <Picker.Item label={option.name} value={option.name} />
                            ))}
                        </Picker>
                    </Item>
                    <Text style={styles.text}>Brief description of incident</Text>
                    <Textarea rowSpan={4} bordered placeholder="Description" onChangeText={text => this.setState({incident:text})}/>
                    <Text style={styles.text}>Details of Suspects (if any)</Text>
                    <Textarea rowSpan={4} bordered placeholder="Name and phone number of suspects" onChangeText={text => this.setState({suspects:text})} />
                    <Text style={styles.text}>Reason for delay (if any)</Text>
                    <Textarea rowSpan={4} bordered placeholder="Reason" onChangeText={text => this.setState({delay:text})}/>
                    <Text style={styles.text}>Date of Incident</Text>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="datetime"
                        placeholder="select date"
                        format="MM/DD/YYYY"
                        minDate="01/05/1947"
                        maxDate="08/03/2020"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />

                    <Text style={styles.text}>Attach picture evidence</Text>
                    <View style={styles.buttonView}>
                        <IconButton
                            icon="camera"
                            color="red"
                            size={30}
                            onPress={() => this.props.navigation.navigate('ClickCamera')}
                        />
                        <IconButton
                            icon="attachment"
                            color="red"
                            size={30}
                            onPress={this._pickImage}
                        />
                        
                    </View>
                    <Text>Attached items: {this.state.uriList.length}</Text>
                    
                    {/* {this.state.uriList.map((option, index) => (
                        <View>
                            <Text>{option}</Text>
                            <IconButton
                                icon="attachment"
                                color="black"
                                size={30}
                                onPress={this.removeLink({option})}
                            />
                        </View>
                        
                    ))} */}
                    
                    <PaperProvider theme={theme}>
                        <Button mode="contained" style={styles.proceedButton}  onPress={this.submit} >Proceed</Button>
                    </PaperProvider>
                    
                </Content>
            </StyleProvider>
        );
    }
}