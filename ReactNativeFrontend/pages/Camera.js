import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
    constructor(props){
        super(props);
        this.takePicture=this.takePicture.bind(this);
        // this.goBack=this.goBack.bind(this);
        // const { navigation } = this.props;
    }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
    async takePicture () {
        if (this.camera) {
            // const options = {quality: 1, base64: true};
            // const data = await this.camera.takePictureAsync(options);
            // console.log(data);
            // this.props.navigation.navigate('ShowImage', {uri:data.base64});
            const options = {skipProcessing: true};
            const data = await this.camera.takePictureAsync(options);
            //console.log(data.uri);
            this.props.navigation.navigate('ShowImage',{uri:data.uri});
        }
    };

    // goBack(){
    //   console.log("go back")
    //   this.props.navigation.goBack();
    // }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {
        this.camera = ref;
      }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              });
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => this.props.navigation.goBack(null)}>
            <Text style={{ fontSize: 18, marginBottom: 20, color: 'white' }}>X</Text>
          </TouchableOpacity>
        </View>
    
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent:'center',
                // alignItems: 'center',
                // alignSelf: 'flex-end',
              }}
              >
                <View
                style={{
                  // flex: 0.1,
                  // flexDirection:'row',
                  justifyContent: 'flex-end',
                  
                }}
                
                
                >
                  
                  <TouchableOpacity onPress={this.takePicture}> 
                    <Image source={require("../assets/circle-cropped.png")}
                    style={{width: 70,
                    height: 70,
                    marginBottom:10}} /> 
                  </TouchableOpacity>
                </View>
              
              
            </View>
          </Camera>
        </View>
      );
    }
  }
}