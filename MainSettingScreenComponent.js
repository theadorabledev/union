/* A file to hold components used within the main settings screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

//Global Style Variables
const userProfileSize = 40
const iconSize = 20
const contactProfileSize = 50
const highlightcolor = '#4CDBFF'

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
const userInfo = {
	pic:icons.account, 
	firstName:"Parva", 
	lastName:"Ganbarian", 
	identify:"she/her", 
	phone:"(123)456-7890"
}


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

const settingOptions = [
	{text: "Account", icon:icons.account, component:Account()},
	{text: "Appearance", icon:icons.appearance, component:Appearance()},
	{text: "Notifications", icon:icons.notification, component:Notifications()},
	{text: "Privacy", icon:icons.privacy, component:Privacy()},
	{text: "Help", icon:icons.help, component:Help()},
]


const Option = (props) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity  onPress={() =>
			navigation.navigate(
				'SettingOptions', {
					title:props.option.text,
					component:props.option.component
				})
			}>
			<View style={style.optionContainer}>
				<Image source={props.option.icon} style={style.optionImage}/>
				<Text style={style.optionText}>{props.option.text}</Text>
			</View>
		</TouchableOpacity>
	);
}

const OptionList = () => {
	const options = settingOptions.map((option, i )=> {
		return (
			<Option option={option} key={i}/>
		);
	});
	return (
		<ScrollView style={style.optionsContainer}>
			{options}
		</ScrollView>
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
		<OptionList/> 
	</View>
    );
}

export default MainSettingScreenComponent;
