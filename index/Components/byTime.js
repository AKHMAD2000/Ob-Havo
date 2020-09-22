import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    FlatList,
    TextPropTypes
} from 'react-native'
import moment from 'moment';
import Icons from '../Components/icons';
import {translate}from '../Constants/Language';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



const Item = ({ item, onPress, style, iconBack, }) => (
    <TouchableOpacity onPress={onPress}>

        <View style={[styles.container, style]} >
            <View>
                <Text style={[styles.time, { color: "#fff" }]} >
                    {moment.unix(item.dt).format("HH:mm")}
                </Text>
            </View>
            <View style={styles.icon} backgroundColor={"transparent"}>
                <Icons name={item.weather[0].icon} color={iconBack} size={25} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.temp, { color: "#fff" }]}>
                    {Math.round(item.temp - 273.15)}
                </Text>
                <Text style={[styles.symbol, { color: "#fff" }]}>{'\u00b0'}C</Text>
            </View>
        </View>

    </TouchableOpacity>
);


function ByTime (props){
    
   const [selectedId, setSelectedId] = useState(0)
    

   const bugun = () => {
        if (moment.unix(selectedId).format("DD") == moment.unix(props.data.daily[0].dt).format("DD")){
            return(
                <View style={styles.dot} />
            )
        }
        
    }
  const  ertaga = () => {
        if (moment.unix(selectedId).format("DD") == moment.unix(props.data.daily[1].dt).format("DD") ){
            return(
                
                <View style={styles.dot} />
            )
        }
        
    }
    const indinga = () => {       
        if (moment.unix(selectedId).format("DD") == moment.unix(props.data.daily[2].dt).format("DD") ){
            return(
                <View style={styles.dot}/>
            )
        }
              
        
    }




    
            const kunli= translate("7 kunlik")
            const renderItem = ({ item }) => {
            const backgroundColor = item.dt === selectedId ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)';
            return (
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.dt)}
                    style={{ backgroundColor }}
                />
            );
        };

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: "space-around", paddingVertical: 0 }} >
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Jost-Regular',
                                color: '#fff',
                                fontSize: windowWidth/30
                            }}>{translate("Bugun")}</Text>
                            <View style={{paddingTop:4}} >
                                {bugun()}     
                            </View>
                                                  
                    </View>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Jost-Regular',
                                color: '#fff',
                                fontSize: windowWidth/30
                            }}>{translate("Ertaga")}</Text>
                             <View style={{paddingTop:4}}>
                                {ertaga()}     
                            </View>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Jost-Regular',
                                color: '#fff',
                                fontSize: windowWidth/30
                            }}>{translate("Indinga")}</Text>
                             <View style={{paddingTop:4}} >
                                {indinga()}     
                            </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={props.navigate}
                        >
                        <View flexDirection={"row"}>
                            <Text style={{
                                fontFamily: 'Jost-Regular',
                                color: '#fff',
                                fontSize: windowWidth/30
                            }}>{kunli}</Text>
                            <Icon name={"ios-arrow-forward"} size={22} color={"#fff"} style={{marginLeft: 5, marginBottom:0}} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{paddingTop: 10}}>
                <FlatList
                    contentContainerStyle={styles.list}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={props.data.hourly}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.dt.toString()}
                    extraData={selectedId}
                    initialNumToRender={5}
                />
                </View>
            </View>
        );   
     }
                        

export default ByTime;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth / 5.2,
        marginLeft: 8,  
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20

    },
    list: {
        height: 140,
        paddingHorizontal: 6
    },
    mainIcon: {

    },
    temp: {
        fontFamily: 'Jost-Medium',
        fontSize: 18,
        paddingTop: 5,
        marginLeft: 10
    },
    symbol: {
        padding: 3,
        marginTop: 5,
        fontWeight: '400'
    },
    time: {
        fontFamily: 'Jost-Medium',
        fontSize: 16,
        paddingBottom: 5

    },
    dot: {
        backgroundColor: '#fff', width: 2, height: 2, borderRadius: 5, alignSelf: 'center', padding: 4 , 
    },
    icon: {
        alignSelf: 'center',
        padding: 0,
        borderRadius: 40,
        width: 50,
        height: 50,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },




})