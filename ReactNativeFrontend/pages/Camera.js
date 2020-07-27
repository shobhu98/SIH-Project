import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraExample extends React.Component {
    constructor(props){
        super(props);
        this.takePicture=this.takePicture.bind(this);
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
            console.log(data.uri);
            this.props.navigation.navigate('ShowImage', {uri:data.base64});
        }
    };

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
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
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
              <TouchableOpacity onPress={this.takePicture}> 
              <Image source={require("../assets/icon.png")}
              style={{width: 100,
              height: 100}} /> 
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}