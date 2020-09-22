import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate, setI18nConfig} from '../Constants/Language';



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function About(props) {


  return (
    <View style={styles.container}>

    	<View style={{ paddingHorizontal: 20, alignSelf: "flex-start", paddingTop: 20 }}>
				<TouchableOpacity onPress={() => { props.navigation.openDrawer() }} style={{ justifyContent: 'flex-start' }} >
					<Icon
						name={'text-short'}
						size={45}
						style={{ justifyContent: 'center', padding: 5 }}
						color={"#fff"}
					/>
				</TouchableOpacity>
		</View>
    <View>  
         <Text style={styles.text}>{translate("Ilova haqida")}</Text>
         </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#003867',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Jost-Regular',
    fontSize: 30,
    color: "#fff",
    marginBottom: 60,
    marginTop: 30
    
},
image : {
  flex: 1,
  resizeMode: "cover",
  position: 'relative',
  width: windowWidth,
  alignItems: 'center',

}
});