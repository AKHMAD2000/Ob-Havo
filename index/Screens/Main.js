import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    Animated,
    ScrollView,
    RefreshControl,
    Platform,
    Alert,
} from 'react-native'
import Icons from '../Components/icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import ByTime from '../Components/byTime';
import AddInfo from '../Components/AddInfo';
import Feather from '../Components/FeatherIcons';
import NetInfo from "@react-native-community/netinfo";
import 'moment/min/moment-with-locales';
import { translate, setI18nConfig } from '../Constants/Language';
import { Backgorund } from '../Components/Background';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(info => console.log(info));






const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Main({navigation}){

    moment.locale(translate("uz"))
    const [icon, setIcon] = useState("01d")
    const [Current, setCurrent] = useState(null)
    const [Data, setData] = useState(Object)
    const [Latitude, setLatitude] = useState(41.320)
    const [Longitude, setLongitude] = useState(69.281)
    const [Animation, setAnimation] = useState(new Animated.Value(0))
    const [Signed, setSigned] = useState(false)
    const [Connection, setConnection] = useState(true)
    const [IsLoading, setIsLoading] = useState(true)    
    animation = new Animated.Value(0);
    
    Animated.timing(
        animation,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false  
      }
    ).start()

    const spin = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    useEffect(() => { 
        async function fetchMyAPI(){
                    console.log("Start")
                    checkNetConnection()
                    await getSigned();
                    checkSigned();
                    await getData();
                    getFromApi();
                    
                    console.log("End")}
        fetchMyAPI();
     }, [])
    

    checkNetConnection = () => {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });
    }

    getFromApi = () => {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + Latitude + "&lon=" + Longitude + "&%20exclude=hourly,daily&appid=305cb80d13e3b43e0df35431c0642307")
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => Alert.alert("Internet connection failed!"))
            .finally(() => {
                setCurrent( new Date())
                onSave();
                setIsLoading(false)
                setIcon(Data.current.weather[0].icon)
            });
    }

     onRefresh = async () => {
        setIsLoading(true)
        await getSigned();
        getFromApi();
    }

    onSave = async () => {
        try {
            await AsyncStorage.setItem(
                'DATA',
                JSON.stringify({
                    data: Data,
                    today: Current
                })
            );
            
        } catch (error) {
            console.log(error)
        }
    };
    getData = async () => {
        try {
            const Value = await AsyncStorage.getItem('DATA');
            const value = await JSON.parse(Value)
            if (value !== null) {
                setData(value.data),
                setCurrent(value.today)
                setIsLoading(false)
                setIcon(value.data.current.weather[0].icon)
            }
        } catch (error) { console.log(error) }
    };
    getSigned = async () => {
        try {
            const Value = await AsyncStorage.getItem('LOCATION');
            const value = await JSON.parse(Value)
            if (value !== null) {
                setSigned(value.signed)
                setLatitude(value.latitude)
                setLongitude(value.longitude)
            }
        } catch (error) { console.log(error) }
    }

    checkSigned = () => {
        if (Signed == false) {
           navigation.navigate("SaveLocation")
            console.log("CheckSigned")
        }
    }

    if (IsLoading == true) {
        var image = Backgorund(icon)
        return (
            
            <View style={{ height: windowHeight, width: windowWidth, }} >

                <ImageBackground source={image} style={styles.image} width={windowWidth} >
                <Animated.View style={{ transform: [{ rotate: spin }] }} >
                    <Feather
                        name={'sun'}
                        size={90}
                        style={{ justifyContent: 'center', padding: 5, alignSelf: 'center' }}
                        color={"#fff"}
                    />
                </Animated.View>
                </ImageBackground>
            </View>
            
        );
    }
    else if (IsLoading == false) {
        const daily = Data.daily
        const today = Data.current.dt;
        const today2 = Current;
        const date = moment.unix(today).format("MMM DD");
        const time = moment(today2).format("HH:mm");
        var image = Backgorund(icon)
        

        return (
    
            <ImageBackground source={image} style={styles.image} >
    
                <ScrollView
                    refreshControl={<RefreshControl refreshing={IsLoading} onRefresh={() => onRefresh()} />} showsHorizontalScrollIndicator={false}>
                    
                    <View style={styles.container} >

            <View style={{marginBottom: 40}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',paddingTop: 20 }}>
                            <View style={{ paddingHorizontal: 20, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => { navigation.openDrawer() }} style={{ justifyContent: 'flex-start' }} >
                                    <Icon
                                        name={'text-short'}
                                        size={45}
                                        style={{ justifyContent: 'center', padding: 5 }}
                                        color={"#fff"}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                            </View>

                        </View>
                     
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Icons name={Data.current.weather[0].icon} style={styles.mainIcon} size={45} color={'#ffff00'} />

                                </View>
                                <View>
                                    <Text style={styles.bugun}>{translate("Bugun")}</Text>
                                    <Text style={styles.bugunChislo}>{date}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', height: windowHeight / 5.5 }}>
                            <View style={{ flexDirection: 'row', marginLeft: 23 }}>
                                <Text style={styles.temp}>{Math.round(Data.current.temp - 273.15)}</Text>
                                <Text style={styles.symbol}>{'\u00b0'}C</Text>
                            </View>

                        </View>
                        <View>
                            <Text style={styles.text1}>{translate("His qilinadi")} {parseInt(Data.current.feels_like - 273.15)}{'\u00b0'}C</Text>
                        </View>
                        <Text style={styles.text}>{Data.timezone}</Text>



                        <View style={{ paddingTop: 15 }}>
                            <ByTime data={Data} navigate={() => navigation.navigate('Daily', { daily, icon })} />
                        </View>

                        <AddInfo data={Data.current} />
                        <Text style={styles.time}>{translate("Oxirgi marta yangilandi")} {time}</Text>
                        </View>  
                    </View>
                </ScrollView>
                </ImageBackground> 
        );

    }

    
}

const styles = StyleSheet.create({
    container: {
    
    },
    time: {
        alignSelf: 'center',
        fontFamily: 'Jost-Medium',
        fontSize: 10,
        color: '#fff',
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Jost-Medium'

    },
    text1: {

        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 8,
        fontFamily: 'Jost-Medium'

    },
    loading: {
        fontSize: 30,
        color: '#fff',



    },
    label: {

        fontFamily: 'Jost-Medium',
        fontSize: 14,
        color: '#fff',

    },
    bugun: {
        paddingLeft: 16,
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Jost-Medium'
    },
    bugunChislo: {
        paddingLeft: 15,
        color: '#fff',
        fontSize: 13
    },
    temp: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: windowWidth/5,
        fontFamily: 'Jost-ExtraLight'
    },
    symbol: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 25,
        marginBottom: 30,
        fontFamily: 'Jost-Regular',
        paddingHorizontal: 4,
    },
    bottomBanner: {
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
    },
    image : {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        position: 'relative',
        height: windowHeight,
        width: windowWidth,
 
    }

})





