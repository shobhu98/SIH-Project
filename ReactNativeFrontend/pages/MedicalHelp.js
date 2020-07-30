import * as React from 'react';
import {Text} from 'react-native-paper';
import {Linking, View, StyleSheet} from 'react-native'
import {Button, Provider as PaperProvider, DefaultTheme, Title} from 'react-native-paper';
import lan from './global.js'

const styles = StyleSheet.create({
    view: {
        marginVertical: 20,
        marginHorizontal: 20
    },
    button: {
        padding: 10,
        marginVertical: 10
    }
});

export default class MedicalHelp extends React.Component {
    constructor(props) {
        super(props);

        const Lan = {
            NationalEmergencyNumber: {
                en: "National Emergency Number",
                hi: "राष्ट्रीय आपातकाल संख्या"
            },
            Police: {
                en: "Police",
                hi: "पुलिस"
            },
            Fire: {
                en: "Fire Service",
                hi: "अग्निशमन सेवा"
            },
            Ambulance: {
                en: "Ambulance",
                hi: "रोगी वाहन"
            },
            WomenHelpline: {
                en: "Women Helpline",
                hi: "महिला हेल्पलाइन"
            },
            WomenHelplineDomestic: {
                en: "Women Helpline (Domestic Abuse)",
                hi: "महिला हेल्पलाइन (घरेलू दुरुपयोग)"
            },
            RoadAccident: {
                en: "Road Accident",
                hi: "सड़क दुर्घटना"
            },
            TouristHelpline:{
                en: "Tourist Helpline",
                hi: "पर्यटक हेल्पलाइन"
            }
        };

        this.state = {
            titles: Lan
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:112');
                }}>{this.state.titles.NationalEmergencyNumber[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:100');
                }}>{this.state.titles.Police[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:101');
                }}>{this.state.titles.Fire[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:102');
                }}>{this.state.titles.Ambulance[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:1091');
                }}>{this.state.titles.WomenHelpline[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:181');
                }}>{this.state.titles.WomenHelplineDomestic[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:1073');
                }}>{this.state.titles.RoadAccident[lan]}</Button>
                <Button color="#16335C" style={styles.button} mode="contained" onPress={() => {
                    Linking.openURL('tel:1363');
                }}>{this.state.titles.TouristHelpline[lan]}</Button>
            </View>
        );
    }
}
