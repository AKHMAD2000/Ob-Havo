import React , { useState, useEffect }  from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Switch,
    Alert,
    Dimensions,
    Button,
    BackHandler,
    ToastAndroid,
}
    from 'react-native';
import Divider from '../Components/Divider';
import { translate } from '../Constants/Language';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



export default function SaveLocation ({ navigation }){

        
    const [IsEnabled, setIsEnabled] = useState(false)
    const [location, setLocation] = useState(null)
    const [longitude, setLongitude] = useState(69.308)
    const [latitude, setLatitude] = useState(41.318)
    const [ErrorMsg, setErrorMsg] = useState(null)
    const [City, setCity] = useState(null)

    const onSave = async () => {
        try {
            console.log("SAVED")
            await AsyncStorage.setItem(
                'LOCATION',
                JSON.stringify({
                    longitude: longitude,
                    latitude: latitude,
                    isEnabled: IsEnabled,
                    city: City,
                    signed: true,
                })
            );
            

        } catch (error) { console.log(error) }
    };
    const goToMain = async () => {
        await onSave();
       navigation.navigate("Main")
    }




    // const toggleSwitch = () => {setIsEnabled(previousState => !previousState)};

    //     if(IsEnabled === true) {
    //     if (Platform.OS === 'android' && !Constants.isDevice) {
    //         setIsEnabled(false)
    //         Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
    //       } else {
    //         (async () => {
    //           let { status } = await Location.requestPermissionsAsync();
    //           if (status !== 'granted') {
    //             Alert.alert('Permission to access location was denied');
    //             setIsEnabled(false)
    //           }
      
    //           let location = await Location.getCurrentPositionAsync({});
    //           setLongitude(location.coords.longitude)
    //           setLatitude(location.coords.latitude)
    //           setIsEnabled(true)
    //         })();
    //       }}

          useEffect(() => { SetLocation() })

  const SetLocation = () => {
        if (City === "Tashkent") {
            setLongitude(69.2163);
            setLatitude(41.2646);
            
            
        }
        if (City === "Andijan") {
            setLongitude(72.318322);
            setLatitude(40.779939);

        }
        if (City === "Bukhara") {
            setLongitude(64.419880);
            setLatitude(39.766585);
            
        }
        if (City === "Gulistan") {
            setLongitude(68.769748);
            setLatitude( 40.498821);
           
        }
        if (City === "Karshi") {
            setLongitude(65.802088);
            setLatitude(38.852289);
           
        }
        if (City === "Navoi") {
            setLongitude(65.360619);
            setLatitude(40.097400,);
          
        }
        if (City === "Namangan") {
            setLongitude(71.645987);
            setLatitude(40.983343);
           
        }
        if (City === "Nukus") {
            setLongitude(59.603821);
            setLatitude(42.489521);
            
        }
        if (City === "Samarqand") {
            setLongitude(66.939013);
            setLatitude(39.664671);
            
        }
        if (City === "Termez") {
            setLongitude(67.325926);
            setLatitude(37.262750);
           
        }
        if (City === "Fergana") {
            setLongitude(71.770540);
            setLatitude(40.380213);
           
        }
        if (City === "Khiva") {
            setLongitude(60.356181);
            setLatitude(41.387580);
            
        }
        if (City === "Jizzakh") {
            setLongitude(67.863999);
            setLatitude(40.126071);
           
        }
    }
    return(
        <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{translate("Tizimdan lokatsiya olish")}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: "space-between", alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.text1}>{translate("Lokatsiya")}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={IsEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        value={IsEnabled}
                        style={styles.switch}
                    />
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: "space-between", alignItems: 'center', }}>
                <Text style={styles.text1}>{translate("Tayor lokatsiya tanlash")}</Text>
                    <Picker
                        selectedValue={City}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setCity( itemValue )}
                        enabled={!IsEnabled}
                    >
                    <Picker.Item label={translate("Tashkent")} value="Tashkent" />
                    <Picker.Item label={translate("Andijan")} value="Andijan" />
                    <Picker.Item label={translate("Bukhara")} value="Bukhara" />
                    <Picker.Item label={translate("Gulistan")} value="Gulistan" />
                    <Picker.Item label={translate("Jizzakh")} value="Jizzakh" />
                    <Picker.Item label={translate("Karshi")} value="Karshi" />
                    <Picker.Item label={translate("Navoi")} value="Navoi" />
                    <Picker.Item label={translate("Namangan")} value="Namangan" />
                    <Picker.Item label={translate("Nukus")} value="Nukus" />
                    <Picker.Item label={translate("Samarqand")} value="Samarqand" />
                    <Picker.Item label={translate("Termez")} value="Termez" />
                    <Picker.Item label={translate("Fergana")} value="Fergana" />
                    <Picker.Item label={translate("Khiva")}  value="Khiva" />
                    </Picker>
                </View>
                <View>
                </View>
                <View style={{ marginTop: 100 }}>
                    <TouchableOpacity
                        onPress={() => goToMain()}>
                        <View style={styles.button}>
                            <Text style={{ color: '#fff', fontFamily: "Jost-Regular", fontSize: 20 }}>{translate("Saqlash")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight
    },
    picker: {
        width: windowWidth / 2.8,
        fontSize: 20,
        marginRight: 20,
        fontFamily: 'Jost-Regular'

    },
    text: {
        fontFamily: 'Jost-Regular',
        fontSize: 30,
        color: "#191970",
        marginBottom: 60

    },
    text1: {
        fontSize: 22,
        fontFamily: 'Jost-Regular',
        marginLeft: 20,

    },
    switch: {
        marginRight: 20
    },
    button: {
        backgroundColor: "#191970",
        justifyContent: 'center',
        width: 150,
        height: 40,
        alignItems: 'center',
        borderRadius: 25

    }
})

