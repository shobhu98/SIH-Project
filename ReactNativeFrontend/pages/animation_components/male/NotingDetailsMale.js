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

export default class NotingDetailsMale extends React.Component {
    constructor(props) {
        super(props);
        this.images = [
            require('../../../assets/images/complete_images/male/looking_down_mouth_closed_penLeft.png'),
            require('../../../assets/images/complete_images/male/looking_down_mouth_closed_penRight.png'),
            require('../../../assets/images/complete_images/male/looking_down_mouth_closed_penLeft.png'),
            require('../../../assets/images/complete_images/male/looking_down_mouth_closed_penRight.png'),
            require('../../../assets/images/complete_images/male/eyes_closed_mouth_closed.png'),
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

