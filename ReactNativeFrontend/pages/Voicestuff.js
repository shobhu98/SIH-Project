import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import Voice from '@react-native-community/voice';


export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      flag: false
    }; 
    Voice.onSpeechResults = (res) => {
      this.setState({
        text:JSON.stringify(res),
        flag:true
      });
    }
    
  }
  speak() {
    var thingToSay = 'नमस्ते';
    Speech.speak(thingToSay,{language:"hi-IN", pitch:1});
  }

  startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') return;
  
    this.setState({ isRecording: true });
    // some of these are not applicable, but are required
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
  
    });
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      this.stopRecording();
    }
    this.recording = recording;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Press to hear some words" onPress={this.speak} />
        <Button title="speak" onPress={() => Voice.start('en-US')} ></Button>
        {this.state.flag && <Button title="WOWOW"></Button>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});