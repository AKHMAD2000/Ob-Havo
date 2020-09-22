import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'



export default function SunSet(props) {
    return (

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
                <Icon
                    name={'sunrise'}
                    size={28}
                    style={styles.icon}
                    color={"#fff"}
                />
                <Text style={styles.text}>{props.rise}</Text>

            </View>
            <View >
                <Icon
                    name={'sunset'}
                    size={28}
                    style={styles.icon}
                    color={"#fff"}
                />
                <Text style={styles.text}>{props.set}</Text>

            </View>

        </View>



    )


}


const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Jost-ExtraLight',
    },
    icon : {
        justifyContent: 'center',       
        paddingTop: 0,
        alignSelf: 'center'
    }
})