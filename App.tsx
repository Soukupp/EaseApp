/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { TransitionPresets, HeaderStyleInterpolators } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/component/screen/HomeScreen.tsx';
import SettingsScreen from './src/component/screen/SettingsScreen.tsx';
import CommunityScreen from './src/component/screen/CommunityScreen.tsx';
import ConsultationScreen from './src/component/screen/ConsultationScreen.tsx';
import StoreScreen from './src/component/screen/StoreScreen.tsx';
import RecordScreen from './src/component/screen/RecordScreen.tsx';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
};

function HomeTabs():JSX.Element{
  return(
    <Tab.Navigator
            screenOptions={({ route }) => ({
              headerTitle:"",
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === '首页') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === '设置') {
                  iconName = focused ? 'settings' : 'settings-outline';
                } else if(route.name === '社区'){
                    iconName = focused ? 'ice-cream': 'ice-cream-outline';
                } else if(route.name === '咨询'){
                    iconName = focused ? 'fitness': 'fitness-outline';
                } else if(route.name === '商城'){
                    iconName = focused ? 'storefront' : 'storefront-outline';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarItemStyle:{
                marginBottom: 10
              },
              tabBarStyle:{
                height: 60,
              },
              headerShown: false
            })}
          >
    <Tab.Screen name="首页" component={HomeScreen} />
    <Tab.Screen name="社区" component={CommunityScreen} />
    <Tab.Screen name="咨询" component={ConsultationScreen}/>
    <Tab.Screen name="商城" component={StoreScreen} />
    <Tab.Screen name="设置" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
  <NavigationContainer>
    <Stack.Navigator 
      initialRouteName='Home'  
      screenOptions={{ 
        headerShown: false,
      }}

      >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Record" component={RecordScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
