import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NoFlickerImage } from 'react-native-no-flicker-image';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 200,//500
        height: 300,//700
    }
});

export default class RequestingDetailsFemale extends React.Component {
    constructor(props) {
        super(props);
        this.images = [
            require('../../../assets/images/complete_images/female/sizetest.png')
        ];
        //this.next = this.next.bind(this);
        //this.state = {index: 0};
    }

    // componentDidMount() {
    //     this.next();
    // }

    render() {
        return (
            <NoFlickerImage
                source={this.images[0]}
                style={styles.logo}
            />
        )
    }
}

