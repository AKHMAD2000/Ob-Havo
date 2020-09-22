import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './MainStack';
import About from '../Screens/About';
import Settings from '../Screens/Settings';
import {translate, setI18nConfig} from '../Constants/Language'




const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (

    <Drawer.Navigator initialRouteName="MainStack"

      drawerStyle={{
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: 240,

      }}
      drawerContentOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#fff'
      }
      }>
      <Drawer.Screen name={translate("Bosh sahifa")} component={MainStack} />
      <Drawer.Screen name={translate("Sozlamalar")} component={Settings} />
      <Drawer.Screen name={translate("Ilova haqida")} component={About} />

    </Drawer.Navigator>
  );
}