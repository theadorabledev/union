/* A file to hold components used within the main settings screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

//Global Style Variables
const userProfileSize = 40
const iconSize = 20
const contactProfileSize = 50
const highlightcolor = 'deepskyblue'

const style = {
	userInfoContainer: {
		display:'flex',
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 20,
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
		marginBottom:20,
	},
	personalInfo: {
		display:'flex',
		flexDirection:'column',
		paddingLeft:10,
	},
	phone:{
		marginTop: 5,
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
		width: iconSize,
		height: iconSize,
		resizeMode: 'stretch',
		borderRadius: iconSize/2,
		paddingLeft: 5,
		marginBottom:30,
		marginLeft: 10,
		marginRight: 20,
	},
	optionText:{
		color: 'black',
	},
}

const icons = {
	account:require('./assets/account.png'),
	appearance:require('./assets/appearance.png'),
	notification:require('./assets/notification.png'),
	privacy:require('./assets/privacy.png'),
	help:require('./assets/help.png'),
}
const userInfo = {pic:icons.account, firstName:"Parva", lastName:"Ganbarian", identify:"she/her", phone:"(123)456-7890"}
const settingOptions = [
	{text: "Account", icon:icons.account},
	{text: "Appearance", icon:icons.appearance},
	{text: "Notifications", icon:icons.notification},
	{text: "Privacy", icon:icons.privacy},
	{text: "Help", icon:icons.help},
]

const User = () => {
	return(
		<View style={style.userInfoContainer}>
			<Image source={userInfo.pic} style={style.userProfileImage}/>
			<View style={style.personalInfo}>
				<Text>{userInfo.firstName} {userInfo.lastName} {userInfo.identify}</Text>
				<Text style={style.phone}>{userInfo.phone}</Text>
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
