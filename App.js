import 'react-native-gesture-handler'; 
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";

import MainScreenComponent from './MainScreenComponent';
import MainSettingScreenComponent from './MainSettingScreenComponent';
//import * as MainScreen from './MainScreenComponent'; 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { withNavigation } from 'react-navigation';

import Ionicons from '@expo/vector-icons/Ionicons';

const StackNav = createNativeStackNavigator();

const userProfileSize = 40
const contactProfileSize = 50
const highlightcolor = 'deepskyblue'
const defaultprofile = require('./assets/profilepicsquaresmall.png')

const styles = {
    userProfileButton: {
	width: userProfileSize, 
	height:userProfileSize, 
	borderRadius: userProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
    }
};
// this.props.navigation.navigate('MainSettings')
const MainScreenSettingsButton= ({navigation}) => {
    return(
	<TouchableOpacity
	    style = {styles.userProfileButton}
	    onPress={() => navigation.navigate('MainSettings')} >
	    <Ionicons name='settings-outline' size={40} color={highlightcolor}/>
	</TouchableOpacity>
    );
};

const App = (props) => {
    return (
	<NavigationContainer>
            <StackNav.Navigator>
		<StackNav.Screen 
		    name="Home"
		    component={MainScreenComponent} 
		/>
		<StackNav.Screen 
		    name="MainSettings"
		    component={MainSettingScreenComponent}
		/>
		
            </StackNav.Navigator>
	</NavigationContainer>
    );
}

export default App;
