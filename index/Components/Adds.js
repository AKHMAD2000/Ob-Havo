import {
    AdMobBanner,
    AdMobInterstitial,
    AdMobRewarded,
  } from 'expo-ads-admob';
  
  import React from "react";
  import {StyleSheet, Text, View } from "react-native";





  export default class Adds extends React.Component {
  componentDidMount() {
      AdMobInterstitial.setTestDeviceID("EMULATOR");
      
  }
    componentWillUnmount() {
      AdMobInterstitial.removeAllListeners();
      AdMobRewarded.removeAllListeners();
    }
    
    bannerError() {
      console.log("An error");
      return;
    }
    

    
    render() {
      return (
        <View>
         <AdMobBanner
            style={styles.bottomBanner}
            bannerSize="banner"
            adUnitID="ca-app-pub-1153402532149274/8784009515"
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    bottomBanner: {
      position: "absolute",
      bottom: 0
    },
  });