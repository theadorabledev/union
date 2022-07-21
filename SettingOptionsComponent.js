/* A file to hold components used within the Setting option screen. */
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {HomeButton, SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';  // in Common.js create Homebutton
const defaultprofile = require('./assets/profilepicsquaresmall.png')  // should be Homebutton
import {GlobalStyle} from './Styles.js';


const stylesUser = StyleSheet.create({
	outerContainer: {
	  backgroundColor: '#0e101c',
	  marginLeft: 200,
	},
	innerContainer: {
	  display:'flex',
	  flexDirection:'column',
	  justifyContent: 'center',
	  padding: 8,
	  backgroundColor: '#0e101c',
	},
	label: {
	  color: 'white',
	  margin: 20,
	  marginLeft: 20,
	  marginTop: 40,
	},
	input: {
	  height: 45,
	  width: "90%",
	  padding: 10,
	  marginLeft: 20,
	  borderRadius: 5,
	  backgroundColor: 'white',
	  },
	button: {
	  height: 50,
	  width: "90%",
	  borderRadius: 5,
	  marginLeft: 20,
	  marginTop: 60,
	  alignItems: "center",
	  justifyContent: "center",
	  color: 'black',
	  backgroundColor: GlobalStyle.pinklightcolor,
	},
  });
// A screen which allows the user to edit personal information
export const UserScreen = () => {
    return (
		<ScrollView style={stylesUser.outerContainer}>
			<View style={stylesUser.innerContainer}>
				<Text style={stylesUser.label}>First name</Text>
				<TextInput
					style={stylesUser.input} 
					placeholder='Leonardo'
				/>
				<Text style={stylesUser.label}>Last name</Text>
				<TextInput
					style={stylesUser.input}
					placeholder='DiCaprio'
				/>
				<Text style={stylesUser.label}>Phone number</Text>
				<TextInput
					style={stylesUser.input}
					placeholder='(123)-456-7890'
				/>
				<View style={stylesUser.button}>
					<Button title='Submit' color={"#000"}/>
				</View>
			</View>
		</ScrollView>
    )
}


const stylesAccount = StyleSheet.create({
	outerContainer: {
	  backgroundColor: "#0ff",
	  marginLeft: 200,
	},
	innerContainer: {
	  backgroundColor: "#0ff",
	  alignItems: "center",
	},
   
	image: {
	  marginTop: 40,
	  marginBottom: 40,
	  borderRadius: "50%",
	},
   
	inputView: {
	  height: 45,
	  width: "70%",
	  borderRadius: 30,
	  marginBottom: 20,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "#FFC0CB",
	},
   
	TextInput: {
	  height: 50,
	  flex: 1,
	  padding: 10,
	  marginLeft: 20,
	},
   
	forgot_button: {
	  height: 30,
	  marginTop: 20,
	  marginBottom: 30,
	},
   
	loginBtn: {
	  height: 50,
	  width: "80%",
	  borderRadius: 25,
	  marginTop: 40,
	  marginBottom: 20,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: GlobalStyle.pinklightcolor,
	},
	loginText: {
		color: "#000000",
	}
});
// A screen which allows the user to edit Username & Password
export const Account = () => {
	return (
		<ScrollView style={stylesAccount.outerContainer}>
			<View style={stylesAccount.innerContainer}>
				<Image style={stylesAccount.image} source={defaultprofile} />
			
				<View style={stylesAccount.inputView}>
					<TextInput
						style={stylesAccount.TextInput}
						placeholder="Email."
						placeholderTextColor="#003f5c"
					/>
				</View>
			
				<View style={stylesAccount.inputView}>
					<TextInput
					style={stylesAccount.TextInput}
						placeholder="Password."
						placeholderTextColor="#003f5c"
						secureTextEntry={true}
					/>
				</View>
			
				<TouchableOpacity>
					<Text style={stylesAccount.forgot_button}>Forgot Password?</Text>
				</TouchableOpacity>
			
				<TouchableOpacity style={stylesAccount.loginBtn}>
					<Text style={stylesAccount.loginText}>LOGIN</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}


export const Appearance = () => {
    return (
	<View>
	    <Text> This is the Appearance inner component</Text>
	</View>
    )
}
export const Notifications = () => {
    return (
	<View>
	    <Text> This is the Notifications inner component</Text>
	</View>
    )
}
export const Privacy = () => {
    return (
	<View>
	    <Text> This is the Privacy inner component</Text>
	</View>
    )
}
export const Help = () => {
    return (
	<View>
	    <Text> This is the Help inner component</Text>
	</View>
    )
}

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
			}}>
				<HomeButton onPress={() => navigation.navigate('Home')}/>
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
