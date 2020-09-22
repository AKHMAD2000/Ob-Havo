import React from 'react';
import {View, Text, Dimensions} from 'react-native'

const windowWidth = Dimensions.get("window").width;

export default function Divider(props) {


    return(
       <View style={{width: windowWidth-30, height: 1 , backgroundColor: "#eee", alignSelf: 'center', marginVertical: 3}} >

        </View>
    )
}