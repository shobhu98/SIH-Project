import { Subheading } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import React from 'react';
import {View,Image,Text, TouchableOpacity} from 'react-native';
import FadeInView from 'react-native-fade-in-view';
import {NavigationActions} from 'react-navigation';  

 
class GeneralStarExample extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      showRating:false
    };
    this.goToHome=this.goToHome.bind(this);
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  componentDidMount(){
    setTimeout(() => {
        this.setState({showRating: true});
    }, 1000);
  }

  goToHome(){
      console.log("clicking");
      this.props.navigation.popToTop(); 
      this.props.navigation.navigate('FileFIR');
  }
 
  render() {
    return (
        <View>
            
            <View style={{justifyContent: 'center',alignItems: 'center', marginTop:200, }}>
            
                <Image style={{width: 100, height: 100}} source={require('../assets/green-arrow.png')} resizeMethod="scale"/>
                <Subheading style={{color:'#16335C', fontSize:20,marginTop:5}}>You have successfully filed the FIR</Subheading>
                
                {this.state.showRating && <FadeInView
                    duration={750}
                    style={{ alignItems: 'center' }}
                >   
                    <Subheading style={{color:'#16335C', fontSize:18,marginTop:30}}>Please rate us!</Subheading>
                    <StarRating
                        // disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                    <TouchableOpacity onPress={this.goToHome}>
                        <Text style={{color:'#16335C', fontSize:16,marginTop:10, textDecorationLine: 'underline'}}>Go back</Text>
                    </TouchableOpacity>
                </FadeInView>}
                


            </View>
            
        </View>
        
      
    );
  }
}
 
export default GeneralStarExample