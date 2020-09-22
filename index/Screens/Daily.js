import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Animated,
    NativeModules,
    ScrollView,
    ImageBackground,

} from 'react-native'
import moment from 'moment';
import Icons from '../Components/icons';
import Icon from 'react-native-vector-icons/Fontisto';
import Feather from '../Components/FeatherIcons';
import {translate, setI18nConfig} from '../Constants/Language';
import { Backgorund } from '../Components/Background';
import 'moment/min/locales'






const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Daily({navigation, route}){
  

    useEffect(() => {
        moment.locale(translate("uz"))
    })
        
        
    
      const [selected, setselected] = useState(1)
      const [fade, setFade] = useState(new Animated.Value(1))


   



 const fadeIn = () => {
      
        Animated.timing(fade, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    const fadeOut = () => {
       setTimeout(() => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 200,  
            useNativeDriver: false
        }).start()
    }, 200 ) }





    const select = async (num) => {
        
       fadeIn();
       await  setTimeout(() => {setselected(num)} , 200)
       await  fadeOut()
    }

 
        var image = Backgorund(route.params.icon)
        const { daily } = route.params;
        const avarage = Math.round(((((daily[1].temp.min + daily[1].temp.max) / 2) + ((daily[2].temp.min + daily[2].temp.max) / 2) + ((daily[3].temp.min + daily[3].temp.max) / 2) + ((daily[4].temp.min + daily[4].temp.max) / 2) + ((daily[5].temp.min + daily[5].temp.max) / 2) + ((daily[6].temp.min + daily[6].temp.max) / 2) + ((daily[7].temp.min + daily[7].temp.max) / 2)) / 7) - 273.15)
        var graphMin = []
        var graphMax = []
        for (var i = 1; i <= 7; i++) {
            graphMin[i] = Math.round(avarage - (daily[i].temp.min - 273.15))
        }
        for (var i = 1; i <= 7; i++) {
            graphMax[i] = Math.round((daily[i].temp.max - 273.15) - avarage)
            if (graphMax[i] > 10) {
                graphMax[i] = 10
            }
            if (graphMax[i] < 1) {
                graphMax[i] = 1
            }
        }


        return (

            <View style={styles.container}>        
            <ImageBackground source={image} style={styles.image} >     
                <TouchableOpacity width={20} height={20} onPress={() => navigation.goBack()}>
                    <Icon
                        style={styles.iconBack}
                        color={'#fff'}
                        size={22}
                        name={'angle-left'}
                    />
                </TouchableOpacity>

                <View flexDirection={'row'} paddingHorizontal={20} marginTop={10}>
                    <Text style={styles.kevotkan}>{translate('Kelayotgan')}</Text><Text style={styles.kunlik}>{translate(' 7 kunlik')}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{justifyContent: "center", alignItems: 'center', marginTop: 20,   }}>
                <View style={{paddingBottom: 15}}>
                    <Animated.View style={[styles.animated, { width: windowWidth - 40, height: 200, opacity: fade }]}  >
                        <View flexDirection={'row'} marginTop={12} height={35} justifyContent={'center'} alignItems={'flex-end'} >
                            <View >
                                <Text style={styles.cardDay}>
                                    {moment.unix(daily[selected].dt).format("dddd")}
                                </Text>
                            </View>
                            <View style={styles.cardIcon}>
                                <Icons name={daily[selected].weather[0].icon} style size={28} />
                            </View>
                            <View width={windowWidth/3.5} flexDirection={'row'} alignItems={'flex-end'}>
                                <Text style={styles.cardTempMax}> {Math.round(daily[selected].temp.max - 273.15)}{'\u00b0'}C </Text>
                                <Text style={styles.cardTempMin} > {Math.round(daily[selected].temp.min - 273.15)}{'\u00b0'}C </Text>
                            </View>
                        </View>
                        <View flexDirection={'row'} style={{ justifyContent: "space-around", height: 20, marginTop: 15 }}>
                            <View alignItems={'center'}>
                                <Feather color={"#fff"} name={"sunrise"} size={20} />
                                <Text style={styles.cardTime}>  {moment.unix(daily[selected].sunrise).format("HH:mm")} </Text>
                            </View>
                            <View alignItems={'center'}>
                                <Feather color={"#fff"} name={"sunset"} size={20} />
                                <Text style={styles.cardTime}>  {moment.unix(daily[selected].sunset).format("HH:mm")} </Text>
                            </View>
                        </View>
                        <View style={{ height: 80, marginTop: 30, }} >
                            <View style={{ height: 40, alignItems: 'center', flexDirection: 'row' }} >
                                <Text style={styles.cardName}>{translate('Shamol')}</Text>
                                <Text style={styles.cardInfo}>{daily[selected].wind_speed}m/s</Text>
                                <Text style={styles.cardName}>{translate('Namlik')}</Text>
                                <Text style={styles.cardInfo}>{daily[selected].humidity}%</Text>
                            </View>
                            <View style={{ height: 30, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={styles.cardName}>{translate('Bulut hajmi')}</Text>
                                <Text style={styles.cardInfo}>{daily[selected].clouds}%</Text>
                                <Text style={styles.cardName}>{translate('Bosim')}</Text>
                                <Text style={styles.cardInfo}>{daily[selected].pressure}hPa</Text>
                            </View>
                        </View>
                    </Animated.View>
                    </View>
                </View>
                
                    <View paddingTop={0} style={styles.list} >
                        <TouchableOpacity onPress={() => select(1)} style={styles.touchable}>
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[1].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[1].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[1].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[1].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[1] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[1] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[1].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => select(2)} style={styles.touchable}>
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[2].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[2].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[2].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[2].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[2] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[2] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[2].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => select(3)} style={styles.touchable} >
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[3].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[3].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[3].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[3].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[3] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[3] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[3].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => select(4)} style={styles.touchable}>
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[4].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[4].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[4].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center',}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[4].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[4] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[4] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[4].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => select(5)} style={styles.touchable}>
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[5].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[5].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[5].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center',}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[5].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[5] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[5] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[5].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => select(6)} style={styles.touchable}>
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[6].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[6].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[6].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center'}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[6].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[6] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[6] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[6].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.list}>
                        <TouchableOpacity onPress={() => select(7)} style={styles.touchable}>
                            <View style={{ flexDirection: 'row', height: 60, }}>
                                <View width={windowWidth * 0.2} justifyContent={'center'} paddingLeft={20}   >
                                    <Text style={styles.week}>{moment.unix(daily[7].dt).format("ddd").toUpperCase()}</Text>
                                    <View flexDirection={'row'}>
                                        <Icon name={'blood-drop'} color={'#fff'} size={15} style={styles.dropIcon} />
                                        <Text style={styles.precent}>{daily[7].humidity}%</Text>
                                    </View>

                                </View>
                                <Icons name={daily[7].weather[0].icon} style={styles.mainIcon} size={30} />
                                <View width={windowWidth * 0.56} alignItems={'flex-end'} paddingRight={20}>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center',}}>

                                        <Text style={styles.maxTemp}>{Math.round(daily[7].temp.min - 273.15)}{'\u00b0'}C</Text>
                                        <View style={{ flexDirection: 'row', width: 110, justifyContent: "center" }} >
                                            <View style={{ width: 50, height: 30, }} >
                                                <View style={[{ width: graphMin[7] * 6, height: 30, }, styles.grey]}></View>
                                            </View>

                                            <View style={{ width: 50, height: 30, }}>
                                                <View style={[{ width: graphMax[7] * 6, height: 30 }, styles.red]}></View>
                                            </View>

                                        </View>

                                        <Text style={styles.minTemp}>{Math.round(daily[7].temp.max - 273.15)}{'\u00b0'}C</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
</ImageBackground> 
            </View>
        );
    
}



const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    red: {
        backgroundColor: '#FF0000',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        alignSelf: 'flex-start'
    },
    grey: {
        backgroundColor: '#d3e5f2',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        alignSelf: 'flex-end'
    },
    minTemp: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        color: "#fff",
        textAlign: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        width: windowWidth / 7.5

    },
    maxTemp: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        color: "#ddd",
        textAlign: 'center',
        justifyContent: 'center',
        paddingRight: 5,
        width: windowWidth / 7.5

    },
    week: {
        fontFamily: 'Jost-Regular',
        fontSize: 13,
        color: '#fff'
    },
    mainIcon: {
        width: windowWidth * 0.2,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 13
    },
    precent: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Jost-Regular',
        fontSize: 12,
        color: "#fff",

    },
    dropIcon: {
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 3
    },
    animated: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,

    },
    iconBack: {
        paddingHorizontal: 20,
        marginTop: 35
    },
    cardDay: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
        width: windowWidth/3,
        // paddingLeft: 20
    },
    cardIcon: {
        width: windowWidth/8,
        marginBottom: 5,
        alignItems: 'flex-start',
        marginLeft: 5,


    },
    cardTempMax: {
        fontFamily: 'Jost-Medium',
        color: '#fff',
        fontSize: 18
    },
    cardTempMin: {
        fontFamily: 'Jost-Regular',
        color: '#ddd',
        fontSize: 16
    },
    cardTime: {
        fontFamily: 'Jost-Regular',
        fontSize: 12,
        color: '#fff'
    },
    cardName: {
        width: (windowWidth - 40) / 4 + 1,
        fontSize: 14,
        color: "#fff",
        fontFamily: 'Jost-Medium',
        paddingLeft: 10
    },
    cardInfo: {
        width: (windowWidth - 50) / 4,
        fontSize: 14,
        color: "#fff",
        fontFamily: 'Jost-Medium',
        paddingLeft: 10
    },
    kevotkan: {
        fontFamily: 'Jost-Regular',
        fontSize: 20,
        color: '#fff'
    },
    kunlik: {
        fontFamily: 'Jost-Medium',
        fontSize: 20,
        color: '#fff'
    },
    image : {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        position: 'relative',
    },
    touchable: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: windowWidth - 20,
        borderRadius: 10
    },
    list: {
        alignSelf: 'center',
        marginTop: 5
    }
    

})

