import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import NotingDetailsMale from './animation_components/female/NotingDetailsFemale';
import RequestingDetailsMale from "./animation_components/female/RequestingDetailsFemale";
import * as Speech from 'expo-speech';


export default class App extends React.Component {
  state = {
    note:true,
    speak:false,
    append:0,
    id:3,
    messages: [
      {
        _id: 2,
        text: "Hello",
        createdAt: new Date(),
        // user: {
        //   _id: 2,
        //   name: 'FAQ Bot',
        //   avatar: 'https://i.imgur.com/7k12EPD.png'
        // }
      },
      // {
      //   _id: 2,
      //   text: "Nooooo",
      //   createdAt: new Date()
      // }
    ]
  };

  checkBot(messages){
    if(this.state.append===0){
      this.onSend(messages);
    }else if(this.state.append===1){
      messages[0].text="fir types "+messages[0].text;
      this.setState({append:this.state.append+1})
      console.log("first one");
      this.onSend2(messages);
    }else if(this.state.append===2){
      this.onSend2(messages);
    }
  }

  onSend(messages) {
    this.setState({
      note:false,
      speak:true,
    })
    console.log("Messages");
    console.log(messages);
    // if(this.state.append===1){
    //   messages[0].text="fir types "+messages[0].text;
    //   this.setState({append:this.state.append+1})
      
    //   console.log("first one");
    //   this.onSend2(messages);
    // }else if(this.state.append===1){
    //   this.onSend2(messages);
    // }
    // else if(this.state.append===2){
      
    // }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }),()=>{
      fetch('http://192.168.1.10:7000/api/dialogflow/textquery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: messages[0].text
      })
    }).then((response) => {
      response.json().then((result) => {
        if (response.status === 200) {
          console.log(result.fulfillmentMessages[0].text.text[0]);
          if(result.fulfillmentMessages[0].text.text[0].localeCompare("I have got your personal details. Are you ready to move on to incident details?")===0){
            console.log("Changing here");
            this.setState({append:this.state.append+1});
          }
          var js = {
            _id: this.state.id,
            text: result.fulfillmentMessages[0].text.text[0],
            createdAt: new Date()
          }
          
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, js),
            id:previousState.id+1
          //}), () => console.log(this.state.messages))
          }))
          const start = () => {
            this.setState({
              note:false,
              speak:true,
            })
          };
          const end = () => {
            this.setState({
              note:true,
              speak:false,
            })
          };
          Speech.speak(result.fulfillmentMessages[0].text.text[0],{language:"hi-IN", pitch:1, rate:0.8, 
            onStart:start ,
            onDone: end
          });

        } else {
          var error = Error(reponse.statusText);
          error.response = response;
          throw error
        }
      })
    }).catch(function (error) {
      console.log(error)
    })
    })

    this.setState({
      note:true,
      speak:false,
    })


  }

  onSend2(messages){
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }),()=>{
      fetch('http://192.168.1.10:7000/api/dialogflow/agent2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: messages[0].text
      })
    }).then((response) => {
      response.json().then((result) => {
        if (response.status === 200) {
          console.log(result.fulfillmentMessages[0].text.text[0]);
          if(result.fulfillmentMessages[0].text.text[0].localeCompare("I have got your personal details. Are you ready to move on to incident details?")===0){
            console.log("Changing here");
            this.setState({append:this.state.append+1});
          }
          var js = {
            _id: this.state.id,
            text: result.fulfillmentMessages[0].text.text[0],
            createdAt: new Date()
          }
          
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, js),
            id:previousState.id+1
          }), () => console.log(this.state.messages))

        } else {
          var error = Error(reponse.statusText);
          error.response = response;
          throw error
        }
      })
    }).catch(function (error) {
      console.log(error)
    })
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground style={styles.image} source={require('../assets/policestation.png')} resizeMethod="scale">
            {this.state.note && <NotingDetailsMale style={{position:'absolute',zIndex:1}}/>}
            {this.state.speak && <RequestingDetailsMale style={{position:'absolute'}}/>}
          </ImageBackground>
          
          <GiftedChat messages={this.state.messages}
            onSend={messages => this.checkBot(messages)}
            user={{
            _id: 1
          }}
            />
        </View>
      

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image:{
    height:280,
    width:500,
    zIndex:-1,
  }
});

// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import NotingDetailsMale from './animation_components/female/TestSizeFemale';
// import RequestingDetailsMale from "./animation_components/male/RequestingDetailsMale";
// import * as Speech from 'expo-speech';


// export default class App extends React.Component {
  
//   state = {
//     note:true,
//     speak:false,
//     append:0,
//     id:3,
//     messages: [
//       {
//         _id: 2,
//         text: "Hello",
//         createdAt: new Date(),
//         // user: {
//         //   _id: 2,
//         //   name: 'FAQ Bot',
//         //   avatar: 'https://i.imgur.com/7k12EPD.png'
//         // }
//       },
//       // {
//       //   _id: 2,
//       //   text: "Nooooo",
//       //   createdAt: new Date()
//       // }
//     ]
//   };

//   checkBot(messages){
//     if(this.state.append===0){
//       this.onSend(messages);
//     }else if(this.state.append===1){
//       messages[0].text="fir types "+messages[0].text;
//       this.setState({append:this.state.append+1})
//       console.log("first one");
//       this.onSend2(messages);
//     }else if(this.state.append===2){
//       this.onSend2(messages);
//     }
//   }

//   onSend(messages) {
//     this.setState({
//       note:false,
//       speak:true,
//     })
//     console.log("Messages");
//     console.log(messages);
//     // if(this.state.append===1){
//     //   messages[0].text="fir types "+messages[0].text;
//     //   this.setState({append:this.state.append+1})
      
//     //   console.log("first one");
//     //   this.onSend2(messages);
//     // }else if(this.state.append===1){
//     //   this.onSend2(messages);
//     // }
//     // else if(this.state.append===2){
      
//     // }
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages)
//     }),()=>{
//       fetch('http://192.168.1.10:7000/api/dialogflow/textquery', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         text: messages[0].text
//       })
//     }).then((response) => {
//       response.json().then((result) => {
//         if (response.status === 200) {
//           console.log(result.fulfillmentMessages[0].text.text[0]);
//           if(result.fulfillmentMessages[0].text.text[0].localeCompare("I have got your personal details. Are you ready to move on to incident details?")===0){
//             console.log("Changing here");
//             this.setState({append:this.state.append+1});
//           }
//           var js = {
//             _id: this.state.id,
//             text: result.fulfillmentMessages[0].text.text[0],
//             createdAt: new Date()
//           }
          
//           this.setState(previousState => ({
//             messages: GiftedChat.append(previousState.messages, js),
//             id:previousState.id+1
//           //}), () => console.log(this.state.messages))
//           }))

//           Speech.speak(result.fulfillmentMessages[0].text.text[0]);

//         } else {
//           var error = Error(reponse.statusText);
//           error.response = response;
//           throw error
//         }
//       })
//     }).catch(function (error) {
//       console.log(error)
//     })
//     })

//     this.setState({
//       note:true,
//       speak:false,
//     })


//   }

//   onSend2(messages){
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages)
//     }),()=>{
//       fetch('http://192.168.1.10:7000/api/dialogflow/agent2', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         text: messages[0].text
//       })
//     }).then((response) => {
//       response.json().then((result) => {
//         if (response.status === 200) {
//           console.log(result.fulfillmentMessages[0].text.text[0]);
//           if(result.fulfillmentMessages[0].text.text[0].localeCompare("I have got your personal details. Are you ready to move on to incident details?")===0){
//             console.log("Changing here");
//             this.setState({append:this.state.append+1});
//           }
//           var js = {
//             _id: this.state.id,
//             text: result.fulfillmentMessages[0].text.text[0],
//             createdAt: new Date()
//           }
          
//           this.setState(previousState => ({
//             messages: GiftedChat.append(previousState.messages, js),
//             id:previousState.id+1
//           }), () => console.log(this.state.messages))

//         } else {
//           var error = Error(reponse.statusText);
//           error.response = response;
//           throw error
//         }
//       })
//     }).catch(function (error) {
//       console.log(error)
//     })
//     })
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//           {this.state.note && <NotingDetailsMale style={{position:'absolute'}}/>}
//           {this.state.speak && <RequestingDetailsMale style={{position:'absolute'}}/>}
//           <GiftedChat messages={this.state.messages}
//             onSend={messages => this.checkBot(messages)}
//             user={{
//             _id: 1
//           }}
//             />
//         </View>
      

//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   }
// });