import React, { Component } from 'react'
import  { I18nManager, View } from 'react-native'
import i18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import memoize from "lodash.memoize"; 

const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    uz: () => require("../Constants/laguage/uz.json"),
    ru: () => require("../Constants/laguage/ru.json"),
    en: () => require("../Constants/laguage/en.json")
  };
  
  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );
  
  const setI18nConfig = () => {
    // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };
  
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };
  
  export {translate, setI18nConfig}
  

class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
        };
        setI18nConfig();}

        handleLocalizationChange = () => {
            setI18nConfig();
            this.forceUpdate();
          };
    render(){
      return (
        <>
        </>
      )
    }
}
 
export default Language;