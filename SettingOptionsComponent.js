/* A file to hold components used within the chat screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';  // in Common.js create Homebutton
const defaultprofile = require('./assets/profilepicsquaresmall.png')  // should be Homebutton


const OptionText = (props) => {
    return (
			<View><Text>OptionText</Text></View>
    );	
}


const Account = () => {
	return (
		<View>
			<Text> This is the Acount inner component</Text>
		</View>
	)
}

const Appearance = () => {
	return (
		<View>
			<Text> This is the Appearance inner component</Text>
		</View>
	)
}
const Notifications = () => {
	return (
		<View>
			<Text> This is the Notifications inner component</Text>
		</View>
	)
}
const Privacy = () => {
	return (
		<View>
			<Text> This is the Privacy inner component</Text>
		</View>
	)
}
const Help = () => {
	return (
		<View>
			<Text> This is the Help inner component</Text>
		</View>
	)
}

const components = [Account, Appearance, Notifications, Privacy, Help];




const SettingOptionsComponent = ({route, navigation}) => {
	const {title, component} = route.params;
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: title,
	    headerRight: () => (
			<View style={{
				flexDirection:'row',
				justifyContent:'space-between',
				alignItems: 'center',
				minWidth: 80,
			}}>
				<SettingsButton onPress={() => navigation.navigate('Home')}/>
			</View>
	    ),
		headerLeft:()=>(
			<View style={{
				flexDirection:'row',
				flexWrap: "wrap",
				justifyContent:'flex-start',
				alignItems: 'center',
				minWidth: 30,
				paddingRight: 10,
			}}>
				<HeaderBackButton onPress={()=>{navigation.goBack()}}/>
			</View>
		),
	});
    }, [navigation]);
    return (
		<Text>
			{component}
		</Text>
		
    );
}


export default SettingOptionsComponent;