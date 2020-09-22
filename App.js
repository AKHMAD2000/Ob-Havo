/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Language from './index/Constants/Language';
import DrawerNavigation from './index/Navigation/Drawer';

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Language/>
        <DrawerNavigation/>
      </NavigationContainer>
    </>
  );
};


export default App;