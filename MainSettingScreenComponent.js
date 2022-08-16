/* A file to hold components used within the main settings screen. */
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {UserButton, ProfileButton} from './Common.js';
import {GlobalStyle} from './Styles.js';
import { UserScreen, Account, Appearance, Notifications, Privacy, Help } from './SettingOptionsComponent.js'
import {ContactContext} from './Context.ts'
const settingsIconSize=35;

const MainSettingStyles = {
    userInfoContainer: {
	display:'flex',
	flexDirection: 'row',
	marginLeft: 10,
	marginRight: 20,
	marginTop: 30,
	borderBottomColor: GlobalStyle.pinklightcolor,
	borderBottomWidth: 2,
    },
    personalInfo: {
	display:'flex',
	flexDirection:'column',
	paddingLeft:20,
    },
    phone:{
	marginTop: 5,
	marginBottom:10,
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

// A section which contains information about the user
const User = (props) => {
    const navigation = useNavigation();
    const {contacts,setContacts,userid} = useContext(ContactContext)
    const usercontact = contacts.get(userid)
    return(
	<View style={MainSettingStyles.userInfoContainer}>
	    <ProfileButton
		profileSize={GlobalStyle.userProfileSize}
		profileSource={contacts.get(userid).picture}/>
	    <TouchableOpacity
		style={MainSettingStyles.personalInfo}
		onPress={() => navigation.navigate('ChatSettings', {
			id:userid,
			canedit:true,
			map:contacts,
			maphandler:setContacts,
			fieldone:"username",
			fieldtwo:"pronouns",
			fieldthree:"profilepic",
		})}>
		<Text style={GlobalStyle.textTypes.H2}>{usercontact.name}  {usercontact.details}</Text>
		<Text style={MainSettingStyles.phone}>{usercontact.id}</Text>
	    </TouchableOpacity>
	</View>
    );
}

const settingOptions = [
    {text: "Account", icon:icons.account, component:0},
    {text: "Appearance", icon:icons.appearance, component:1},
    {text: "Notifications", icon:icons.notification, component:2},
    {text: "Privacy", icon:icons.privacy, component:3},
    {text: "Help", icon:icons.help, component:4},
]

// Wrapper for settings options
const Option = (props) => {
    const navigation = useNavigation();
    return (
	<TouchableOpacity
	    onPress={() =>
		navigation.navigate(
		    'SettingOptions', {
			title:props.option.text,
			component:props.option.component
		    })
	    }>
	    <View style={MainSettingStyles.optionContainer}>
		<MaterialCommunityIcons name={props.option.icon} style={MainSettingStyles.optionVector}/>
		<Text style={GlobalStyle.textTypes.H3}>{props.option.text}</Text>
	    </View>
	</TouchableOpacity>
    );
}
// Displays the various settings options
const OptionList = () => {
    const windowdetails = useWindowDimensions();
    const options = settingOptions.map((option, i )=> {
	return (
	    <Option option={option} key={i}/>
	);
    });
    return (
	<ScrollView style={MainSettingStyles.optionsContainer}>
	    {options}
	</ScrollView>
    );
}

// Returns the settings screen displayed on the main page
const MainSettingScreenComponent = ({navigation}) => {
    const {contacts,setContacts,userid} = useContext(ContactContext)
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
