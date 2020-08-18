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
        height: 280,//700
    },
});

export default class NotingDetailsFemale extends React.Component {
    constructor(props) {
        super(props);
        this.images = [
            require('../../../assets/images/complete_images/female/looking_down_mouth_closed_pen_left.png'),
            require('../../../assets/images/complete_images/female/looking_down_pen_right.png'),
            require('../../../assets/images/complete_images/female/looking_down_mouth_closed_pen_left.png'),
            require('../../../assets/images/complete_images/female/looking_down_pen_right.png'),
            require('../../../assets/images/complete_images/female/eyes_closed_mouth_closed.png'),
        ];
        this.next = this.next.bind(this);
        this.state = {index: 0};
    }

    componentDidMount() {
        this.next();
    }

    next() {
        setTimeout(() => {
            this.setState({index: (this.state.index+1)%5});
            this.next();
        }, 300);
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

