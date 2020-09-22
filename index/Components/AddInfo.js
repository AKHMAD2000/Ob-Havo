
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Divider from './Divider';
import {translate, setI18nConfig} from '../Constants/Language'



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function AddInfo(props) {
    const current = props.data
    
    return (
     
        
            <View paddingTop={10}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.text} numberOfLines={1}>{translate("BULUT HAJMI")}</Text>
                        <Text style={styles.text2} numberOfLines={1}>{current.clouds}%</Text>

                    </View>
                    <View >
                    <Text style={styles.text} numberOfLines={1}>{translate("NAMLIK")}</Text>
                        <Text style={styles.text2} numberOfLines={1}>{current.humidity}%</Text>

                    </View>
                    </View>
                    <Divider/>
                    <View style={styles.row}>
                    <View>
                        <Text style={styles.text} numberOfLines={1}>{translate("SHAMOL TEZLIGI")}</Text>
                        <Text style={styles.text2} numberOfLines={1}>{current.wind_speed}m/s</Text>

                    </View>
                    <View >

                        <Text numberOfLines={1} style={styles.text}>{translate("KO`RAOLISH MASOFASI")}</Text>
                        <Text numberOfLines={1} style={styles.text2}>{current.visibility/1000}km</Text>

                    </View>
                    </View>
                    <Divider/>
                    <View style={styles.row}>
                    <View>
                    <Text numberOfLines={1} style={styles.text}>{translate("ATMOSFERA BOSIMI")}</Text>
                        <Text numberOfLines={1} style={styles.text2}>{current.pressure}hPa</Text>
                        

                    </View>
                    <View >
                    <Text numberOfLines={1} style={styles.text}>{translate("ULTRABINAFSHA INDEKSI")}</Text>
                        <Text numberOfLines={1} style={styles.text2}>{current.uvi}</Text>

                    </View>                    
                    </View>

        
            </View>


    )


}


const styles = StyleSheet.create({
    text: {
        alignSelf: 'flex-start',
        color: '#eee',
        fontSize: 11,
        fontFamily: 'Jost-Regular',
        width: windowWidth/2,
        paddingLeft: 20,

        

    },
    text2: {
        alignSelf: 'flex-start',
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Jost-Regular',
        width: windowWidth/2,
        paddingLeft: 20,

        

    },
    icon: {
        justifyContent: 'center',
        paddingTop: 0,
        alignSelf: 'center',


    },
    row: {
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})
