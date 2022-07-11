/* A file to hold components used within the main settings screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {GlobalStyle} from './Styles.js';

const settingsIconSize=35;

const style = {
	userInfoContainer: {
		display:'flex',
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 20,
		marginTop: 30,
		borderBottomColor: GlobalStyle.pinklightcolor,
		borderBottomWidth: 2,
	},
	userProfileImage: {
		width: GlobalStyle.userProfileSize,
		height: GlobalStyle.userProfileSize,
		resizeMode: 'stretch',
		borderRadius: GlobalStyle.userProfileSize/2,
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
		alignItems:'center',
		paddingLeft: 5,
		marginBottom:20,
	},
	optionVector:{
		fontSize: settingsIconSize,
		color: GlobalStyle.highlightcolor,
		marginRight: 20,

	},
}

const icons = {
	account:"hammer-sickle",
	appearance:"star-half-full",
	notification:"bell",
	privacy:"lock",
	help:"help-circle-outline",
}
const userInfo = {
	pic:GlobalStyle.defaultprofile, 
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
				<Text style={GlobalStyle.textTypes.H2}>{userInfo.firstName} {userInfo.lastName} {userInfo.identify}</Text>
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
            <MaterialCommunityIcons name={props.option.icon}style={style.optionVector}/>
            <Text style={GlobalStyle.textTypes.H3}>{props.option.text}</Text>
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
