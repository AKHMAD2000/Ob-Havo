import React , { useState, useEffect }  from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Switch, Alert, Dimensions, Button, ImageBackground } from 'react-native';
import Divider from '../Components/Divider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate, setI18nConfig} from '../Constants/Language';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Settings (props) {

    
    const [IsEnabled, setIsEnabled] = useState(false)
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
        props.navigation.navigate("Main")
    }

    const  getLocation = async () => {
        try {
            const Value = await AsyncStorage.getItem('LOCATION');
            const value = await JSON.parse(Value)
            if (value !== null) {
                setCity(value.city)
                setIsEnabled(value.isEnabled)
                console.log(value.city)
            }
        } catch (error) { console.log(error) }
    }


    const toggleSwitch = () => {setIsEnabled(previousState => !previousState)};

        if(IsEnabled === true) {      
            setIsEnabled(false)
            Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!')
       
            (async () => {
              let { status } = await Location.requestPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                setIsEnabled(false)
              }
      
              let location = await Location.getCurrentPositionAsync({});
              setLongitude(location.coords.longitude)
              setLatitude(location.coords.latitude)
              setIsEnabled(true)
            })();
          }

          useEffect(() => { getLocation() }, [])
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
			<View style={{ paddingHorizontal: 20, alignSelf: "flex-start", paddingTop: 20 }}>
				<TouchableOpacity onPress={() => props.navigation.openDrawer()} style={{ justifyContent: 'flex-start' }} >
					<Icon
						name={'text-short'}
						size={45}
						style={{ justifyContent: 'center', padding: 5 }}
						color={"#fff"}
					/>
				</TouchableOpacity>
		</View>
        <View style={styles.container}>
                <View>
                    <Text style={styles.text}>{translate("Sozlamalar")}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: "space-between", alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.text1}>{translate("Lokatsiya")}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff0" }}
                        thumbColor={IsEnabled ? "#f4f3f4" : "#f4f3f4"}
                        value={IsEnabled}
                        style={styles.switch}
                        onValueChang={toggleSwitch}
                    />
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', width: windowWidth, justifyContent: "space-between", alignItems: 'center'}}>
                <Text style={styles.text1}>{translate("Tayor lokatsiya tanlash")}</Text>
                    <Picker
                        selectedValue={City}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setCity( itemValue )}
                        enabled={!IsEnabled}
                        mode={"dropdown"}
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
                <View style={{ marginTop: windowHeight/20 }}>
                    <TouchableOpacity
                        onPress={() => goToMain()}>
                        <View style={styles.button}>
                            <Text style={{ color: '#003867', fontFamily: "Jost-Regular", fontSize: 20 }}>{translate("Saqlash")}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
    )
}

 
export default Settings;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#003867",
		height: windowHeight,
        alignItems: 'center',
        flex: 1 
    },
    picker: {
        width: windowWidth/2.8,
        fontSize: windowWidth/70,
        marginRight: 20,
        fontFamily: 'Jost-Regular',
        color: "#fff",
        tintColor: '#fff'
        //900281143 Boburjon
    },
    text: {
        fontFamily: 'Jost-Regular',
        fontSize: 30,
        color: "#fff",
		marginBottom: 60,
		marginTop: 30
        
    },
    text1 : {
        fontSize: windowWidth/22,
        fontFamily: 'Jost-Regular',
        marginLeft: 20,
        color: '#fff'
     
    },
    switch: {
        marginRight: 20
    },
    button: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        width: 150,
        height: 40,
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.48,
        shadowRadius: 16.00,

        elevation: 24,

    },
    image : {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        position: 'relative',
 
    }
})