"use strict";
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import getDataFromAsyncStorage from './src/function/getDataFromAsyncStorage';
import BottomNavigator from './src/views/Navigator/BottomNavigator';
import RegisterNavigator from './src/views/Navigator/RegisterNavigator';

const Stack = createNativeStackNavigator();
const ref = createNavigationContainerRef();

const App = () => {
  const [isAreadyRegist, setIsAreadyRegist] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [routeName, setRouteName] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataFromAsyncStorage('@regist');
      setIsAreadyRegist(data !== null);
      setIsRender(true);
    };
    fetchData();
  }, []);
  if(!isRender){
    //Ning, You can put your beautiful animation "start page" here. This will come after splash page.
    return (
    <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
      <Text style={{fontFamily: 'LINESeedSansApp-Bold', fontSize: 50}}>Loading</Text>
    </View>)
  }
  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute().name)
      }}
      onStateChange={async () => {
        const currentRouteName = ref.getCurrentRoute().name;
        setRouteName(currentRouteName);
      }}>
        <Stack.Navigator>
        {
          isAreadyRegist ?  null :
            <Stack.Screen 
              name="RegisterNavigator" 
              component={RegisterNavigator} 
              header
              options={{
              headerShown: false
              }}
            /> 
        }
          <Stack.Screen name="BottomNavigator" options={{ headerShown: false }}>
            {() => <BottomNavigator routeName={routeName} />}
          </Stack.Screen>
        </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default App;
