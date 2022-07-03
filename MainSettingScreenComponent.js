/* A file to hold components used within the main settings screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

//Global Style Variables
const userProfileSize = 40
const contactProfileSize = 50
const highlightcolor = 'deepskyblue'

const style = {
	userInfoContainer: {
		display:'flex',
		flexDirection: 'row',
		margin: 5,
		marginTop: 30,
		borderBottomColor: 'grey',
		borderBottomWidth: 2,
	},
	userProfileImage: {
		width: userProfileSize,
		height: userProfileSize,
		resizeMode: 'stretch',
		borderRadius: userProfileSize/2,
		paddingLeft: 5,
		marginBottom:10,
	},
	personalInfo: {
		display:'flex',
		flexDirection:'column',
		paddingLeft:10,
	},
	optionsContainer:{
		marginTop: 30,
		marginLeft: 5,
	},
	optionContainer:{
		display:'flex',
		flexDirection:'row',
		alignItem:'flex-start',
	},
	optionImage:{
		width: userProfileSize/2,
		height: userProfileSize/2,
		resizeMode: 'stretch',
		borderRadius: userProfileSize/4,
		paddingLeft: 5,
		marginBottom:20,
		marginLeft: 10,
		marginRight: 10,
	},
	optionText:{
		color: 'green',
	},
}

const defaultprofile = require('./assets/profilepicsquaresmall.png');
const userInfo = {pic:defaultprofile, firstName:"Parva", lastName:"Ganbarian", identify:"she/her", phone:"(123)456-7890"}
const settingOptions = [
	{text: "Account", icon:defaultprofile},
	{text: "Appearance", icon:defaultprofile},
	{text: "Notifications", icon:defaultprofile},
	{text: "Privacy", icon:defaultprofile},
	{text: "Help", icon:defaultprofile},
]

const User = () => {
	return(
		<View style={style.userInfoContainer}>
			<Image source={userInfo.pic} style={style.userProfileImage}/>
			<View style={style.personalInfo}>
				<Text>{userInfo.firstName} {userInfo.lastName} {userInfo.identify}</Text>
				<Text>{userInfo.phone}</Text>
			</View>
		</View>
	);
}


const Options = () => {
	return (
		<View style={style.optionsContainer}>
			<ScrollView>
			<View>
				{settingOptions.map(option => {
					return (
						<View key={option.text} style={style.optionContainer}>
							<Image source={option.icon} style={style.optionImage}/>
							<Text style={style.optionText}>{option.text}</Text>
						</View>
					);
				})}
			</View>
			</ScrollView>
		</View>
	);
}

// Returns the settings screen displayed on the main page
const MainSettingScreenComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Settings"
	});
    }, [navigation]);
    return (
	<View>
		<User/>
		<Options/>
	</View>
    );
}

export default MainSettingScreenComponent;
