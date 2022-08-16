/* A file to hold components used within the Setting option screen. */
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {HomeButton, SettingsButton,PhoneButton,ProfileButton,ContextMenu,RightArrow } from './Common.js';  // in Common.js create Homebutton
import {GlobalStyle,useTheme} from './Styles.js';
import {ContactContext,PasswordContext} from './Context';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
const defaultprofile = require('./assets/profilepicsquaresmall.png')  // should be Homebutton

const stylesAccount = StyleSheet.create({

	background:
	{
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 700,
	},


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
	const {ispasswordlock,setLockState,password,setPassword} = useContext(PasswordContext);
	const [temppassword,setTempPassword] = useState("");
	const {colors,isdark} = useTheme();
	return (
			<View style={{flex:1}}>
			
				<LinearGradient
					// Background Linear Gradient
					colors={[GlobalStyle.highlightcolor, GlobalStyle.pinklightcolor]}
					start={{ x: 1.0, y: 0.0 }}
					end={{ x: 0.0, y: 1.0 }}
					style={stylesAccount.background}
				/>
				<View style={{flex:1}}/>
				
				<View style={stylesAccount.innerContainer}>
					<View style={{...stylesAccount.inputView,backgroundColor:colors.background}}>
						<TextInput style={{...stylesAccount.TextInput,color:colors.text}}
							placeholder="enter password"
							placeholderTextColor={colors.text}
							textAlign="center"
							secureTextEntry={true}
							value={temppassword}
							onChangeText={newpassword=>setTempPassword(newpassword)}
						/>
					</View>
					{
						ispasswordlock?
					<TouchableOpacity style={{...stylesAccount.forgot_button,backgroundColor:colors.background}}onPress={()=>{
						setLockState(false);
						setTempPassword("");
						setPassword("")
						SecureStore.deleteItemAsync('password')
					}}>
						<Text style={{color:colors.text}}>Disable lock</Text>
					</TouchableOpacity>:<></>
					}
					<TouchableOpacity style={{...stylesAccount.loginBtn,backgroundColor:colors.background}}
						onPress={()=>{
							if(temppassword.length > 4){
							setLockState(true);
							setPassword(temppassword);
							SecureStore.setItemAsync('password',temppassword)
							alert("Password Saved")
							}else{
								alert("Password cannot be less than 4 characters")
							}
						}}>
						{ispasswordlock?<Text style={{...stylesAccount.loginText,color:colors.text}}>Change Password</Text>:<Text style={{...stylesAccount.loginText,color:colors.text}}>Set Password Lock</Text>}
						
					</TouchableOpacity>
				</View>
			</View>
	);
}
export const PasswordUnlockScreen = ({navigation}) =>{
	const {ispasswordlock,setLockState,isapplock,setAppLock,password,setPassword} = useContext(PasswordContext);
	const [temppassword,setTempPassword] = useState("");
	const {colors,isdark} = useTheme();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Unlock UNI/ON",
			headerStyle:{backgroundColor:colors.backgroundalt},
			headerTintColor:colors.text,
		})
	});
	return(
		<View style={{flex:1}}>
			<LinearGradient
				// Background Linear Gradient
				colors={[GlobalStyle.highlightcolor, GlobalStyle.pinklightcolor]}
				start={{ x: 1.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				style={stylesAccount.background}
			/>
			<View style={{flex:1}}/>
			
			<View style={stylesAccount.innerContainer}>
				<View style={{...stylesAccount.inputView,backgroundColor:colors.background}}>
					<TextInput
						placeholder="enter password"
						placeholderTextColor={colors.textalt}
						style={{color:colors.text}}
						textAlign="center"
						secureTextEntry={true}
						value={temppassword}
						onChangeText={newpassword=>setTempPassword(newpassword)}
								/>
				</View>
				<TouchableOpacity style={{...stylesAccount.loginBtn,backgroundColor:colors.background}}
					onPress={()=>{
						if(temppassword == password){
							setAppLock(false);
						}else{
							alert("WRONG PASSWORD")
						}
					}}>
					{<Text style={{...stylesAccount.loginText,color:colors.text}}>Unlock UNI/ON</Text>}
				</TouchableOpacity>
				
			</View>
		</View>
	)
}



const options = {
	appearance: { theme: 'Theme', chatColor: 'Chat Color & Wallpaper' },
	notifications: { sound: 'Message Sound', show: 'Show', register: 'Re-register push notifications' },
	privacy: { blocked: 'Blocked', defaultTimer: 'Default Timer for new chats', advanced: 'Advanced' },
	help: { supportCenter: 'Support Center', contactUs: 'Contact Us', terms: 'Terms & Privacy Policy' }
};
  
const stylesCommonComponent = StyleSheet.create({
	horizontalAlign: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: GlobalStyle.pinklightcolor,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 20
	}
})
  
export const Appearance = () => {
	const { appearance } = options;
	const {colors,isdark} = useTheme();
	return (
	  <View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{appearance.theme}</Text>
		  <RightArrow onPress={() => alert('Change app Theme')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{appearance.chatColor}</Text>
		  <RightArrow onPress={() => alert('Change Chat Color & Wallpaper')} />
		</View>
	  </View>
	)
}

export const Notifications = () => {
	const { notifications } = options;
	const {colors,isdark} = useTheme();
	return (
	  <View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{notifications.sound}</Text>
		  <RightArrow onPress={() => alert('Change Message Sound')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{notifications.show}</Text>
		  <RightArrow onPress={() => alert('Show or Update Notifications')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{notifications.register}</Text>
		  <RightArrow onPress={() => alert('Update or Re-register push notifications')} />
		</View>
	  </View>
	)
}

export const Privacy = () => {
	const { privacy } = options;
	const {colors,isdark} = useTheme();
	return (
	  <View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{privacy.blocked}</Text>
		  <RightArrow onPress={() => alert('Show list of Blocked Users')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{privacy.defaultTimer}</Text>
		  <RightArrow onPress={() => alert('Update or Show Default Timer for new chats')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{privacy.advanced}</Text>
		  <RightArrow onPress={() => alert('Advanced Privacy Settings')} />
		</View>
	  </View>
	)
}

export const Help = () => {
	const {colors,isdark} = useTheme();
	const { help } = options;
	return (
	  <View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{help.supportCenter}</Text>
		  <RightArrow onPress={() => alert('Support Center Information')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{help.contactUs}</Text>
		  <RightArrow onPress={() => alert('Contact Us for Help')} />
		</View>
		<View style={stylesCommonComponent.horizontalAlign}>
		  <Text style={{color:colors.text}}>{help.terms}</Text>
		  <RightArrow onPress={() => alert('Read Terms & Privacy Policy')} />
		</View>
	  </View>
	)
}


const settingsArray=[<Account/>,<Appearance/>,<Notifications/>,<Privacy/>,<Help/>]

const SettingOptionsComponent = ({route, navigation}) => {
	const {title, component} = route.params;
	const {colors,isdark} = useTheme();
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: title,
		headerStyle:{backgroundColor:colors.backgroundalt},
		headerTintColor:colors.text,
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
			<View style={{flex:1,backgroundColor:colors.background}}>
				{settingsArray[component]}
			</View>
	)
}


export default SettingOptionsComponent;
