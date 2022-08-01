/* A file to hold components used within the Setting option screen. */
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {HomeButton, SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';  // in Common.js create Homebutton
import {GlobalStyle} from './Styles.js';
import {ContactContext} from './Context.js';
import { LinearGradient } from 'expo-linear-gradient';

const defaultprofile = require('./assets/profilepicsquaresmall.png')  // should be Homebutton



const stylesUser = StyleSheet.create({
	outerContainer: {
	  backgroundColor: '#0e101c',
	  marginLeft: 200,
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 700,
	},
	
	image: {
	  //margin: 20,
	  borderRadius: 50,
	},
   
	
	innerContainer: {
	  display:'flex',
	  flexDirection:'column',
	  justifyContent: 'space-evenly',
	  alignItems: "center",
	  flex:1,
	  padding: 8,
	  backgroundColor: '#0e101c',
	},
	label: {
	  color: 'white',
	},
	input: {
	  height: 45,
	  width: "90%",
	  padding: 10,
	  borderRadius: 5,
	  backgroundColor: 'white',
	  },
	button: {
	  height: 50,
	  width: "100%",
	  borderRadius: 10,
	  alignItems: "center",
	  justifyContent: 'space-evenly',
	  color: GlobalStyle.highlightcolor,
	  backgroundColor: 'white',
	},
  });
// A screen which allows the user to edit personal information
const UserScreen = (props) => {
	const {contacts,setContacts,userid} = useContext(ContactContext)
	
	const [settingusername,setSettingUsername] = useState("")
	const [settingspronouns,setSettingsPronouns] = useState("")
	const onPress = () => {
		setContacts((contacts)=>{
			const newContacts = new Map(contacts);
			const usercontact = newContacts.get(userid);
			if (settingusername != ""){
				usercontact.username = settingusername;
			}
			if (settingspronouns != ""){
				usercontact.pronouns = settingspronouns;
			}
			newContacts.set(userid,usercontact);
			return newContacts;
		})
	}
	
	
    return (
	<View style={stylesUser.innerContainer}>
		<LinearGradient
		// Background Linear Gradient
		colors={[GlobalStyle.highlightcolor, GlobalStyle.pinklightcolor]}
		start={{ x: 1.0, y: 0.0 }}
		end={{ x: 0.0, y: 1.0 }}
		style={stylesUser.background}
		/>
		<View style={{flex:3,width:"80%",minHeight:100,alignItems: "center",justifyContent:"center"}}>
			<Image style={stylesUser.image} source={defaultprofile} />
		</View>
		<View style={{height:200, width:"80%",minHeight:200,justifyContent: 'space-evenly',alignItems:"center"}}>
			<Text style={stylesUser.label}>User Name</Text>
			<TextInput
			style={stylesUser.input} 
			placeholder={contacts.get(userid).username}
			onChangeText={newUserName=>setSettingUsername(newUserName)}
			/>
			<Text style={stylesUser.label}>Pronouns</Text>
			<TextInput
			style={stylesUser.input}
			placeholder={contacts.get(userid).pronouns}
			onChangeText={newUserPronouns=>setSettingsPronouns(newUserPronouns)}
			/>
		</View>
		<View style={{flex:2,width:"80%",alignItems: "center"}}>
			<TouchableOpacity style={stylesUser.button} onPress={
					onPress
			}>
			<View>
			<Text>Update</Text>
			</View>
			</TouchableOpacity>
		</View>
	</View>
    )
}


const stylesAccount = StyleSheet.create({
	innerContainer: {
	  alignItems: "center",
	  justifyContent: "space-evenly",
	  flex:4,
	},
   
	inputView: {
	  height: 45,
	  width: "70%",
	  borderRadius: 30,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "white",
	},
	
	
   
	TextInput: {
	  height: 50,
	  padding: 10,
	},

	
   
	forgot_button: {
	  height: 40,
	  width: "70%",
	  borderRadius: 30,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "white",
	},
   
	loginBtn: {
	  height: 50,
	  width: "80%",
	  borderRadius: 25,
	  alignItems: "center",
	  justifyContent: "center",
	  backgroundColor: "white"
	},
	loginText: {
		color: "#000000",
	}
});
// A screen which allows the user to edit Username & Password
export const Account = () => {
	return (
			<View style={{flex:1}}>
			
				<LinearGradient
					// Background Linear Gradient
					colors={[GlobalStyle.highlightcolor, GlobalStyle.pinklightcolor]}
					start={{ x: 1.0, y: 0.0 }}
					end={{ x: 0.0, y: 1.0 }}
					style={stylesUser.background}
				/>
				<View style={{flex:1}}/>
				
				<View style={stylesAccount.innerContainer}>
					<View style={stylesAccount.inputView}>
						<TextInput style={stylesAccount.TextInput}
							placeholder="Password."
							placeholderTextColor="#003f5c"
							secureTextEntry={true}
						/>
					</View>
			
					<TouchableOpacity style={stylesAccount.forgot_button}>
						<Text>Forgot Password?</Text>
					</TouchableOpacity>
				
					<TouchableOpacity style={stylesAccount.loginBtn}>
						<Text style={stylesAccount.loginText}>Set Password Lock</Text>
					</TouchableOpacity>
				</View>
			</View>
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


const settingsArray=[<UserScreen/>,<Account/>,<Appearance/>,<Notifications/>,<Privacy/>,<Help/>]

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
			<View style={{flex:1}}>
				{settingsArray[component]}
			</View>
	)
}


export default SettingOptionsComponent;
