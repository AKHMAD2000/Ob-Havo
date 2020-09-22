import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Main from '../Screens/Main';
import Daily from '../Screens/Daily';
import SaveLocation from '../Screens/SaveLocatoin';

enableScreens();
const Stack = createNativeStackNavigator();
const NavOptionHendler = () => ({
  headerShown: false
})

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} options={NavOptionHendler} />
      <Stack.Screen name="Daily" component={Daily} options={NavOptionHendler} />
      <Stack.Screen name="SaveLocation" component={SaveLocation} options={NavOptionHendler} />
    </Stack.Navigator>
  );
}