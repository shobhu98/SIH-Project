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

export default class NamasteFemale extends React.Component {
    constructor(props) {
        super(props);
        this.images = [
            require('../../../assets/images/complete_images/female/femail_namaste_mouth_close.png'),
            require('../../../assets/images/complete_images/female/female_namaste_mouth_open.png'),
            require('../../../assets/images/complete_images/female/femail_namaste_mouth_close.png'),
            require('../../../assets/images/complete_images/female/female_namaste_mouth_open.png'),
            require('../../../assets/images/complete_images/female/femail_namaste_mouth_close.png'),


            require('../../../assets/images/complete_images/female/female_namaste_eyes_closed__mouth_closed.png'),
            require('../../../assets/images/complete_images/female/femail_namaste_mouth_close.png'),
            require('../../../assets/images/complete_images/female/femail_namaste_mouth_close.png'),
            require('../../../assets/images/complete_images/female/femail_namaste_mouth_close.png'),
        ];
        this.next = this.next.bind(this);
        this.state = {index: 0};
    }

    componentDidMount() {
        this.next();
    }

    next() {
        setTimeout(() => {
            if (this.state.index >= 8){
                this.setState({index: 5});
            } else {
                this.setState({index: (this.state.index + 1)});
            }
            this.next();
        }, 300);
    }

    render() {
        return (
            <NoFlickerImage
                source={this.images[this.state.index%8]}
                style={styles.logo}
            />
        )
    }
}

