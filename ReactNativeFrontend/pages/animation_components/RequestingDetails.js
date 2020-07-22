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
        width: 500,
        height: 700,
    },
});

export default class RequestingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.images = [
            require('../../assets/images/complete_images/eyes_open_mouth_closed.png'),
            require('../../assets/images/complete_images/eyes_normal_mouth_open.png'),
            require('../../assets/images/complete_images/eyes_open_mouth_closed.png'),
            require('../../assets/images/complete_images/eyes_normal_mouth_open.png'),
            require('../../assets/images/complete_images/eyes_open_mouth_closed.png'),
            require('../../assets/images/complete_images/eyes_normal_mouth_open.png'),
            require('../../assets/images/complete_images/eyes_open_mouth_closed.png'),
            require('../../assets/images/complete_images/eyes_normal_mouth_open.png'),
            require('../../assets/images/complete_images/eyes_closed_mouth_open.png'),
        ];
        this.next = this.next.bind(this);
        this.state = {index: 0};
    }

    componentDidMount() {
        this.next();
    }

    next() {
        setTimeout(() => {
            this.setState({index: (this.state.index+1)%9});
            this.next();
        }, 10);
    }

    render() {
        return (
            <NoFlickerImage
                source={this.images[this.state.index]}
                style={styles.logo}
            />
        )
    }
}

