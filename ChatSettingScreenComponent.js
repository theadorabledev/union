/* A file to hold components used within the chat settings screen. */
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {HomeButton, SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';  // in Common.js create Homebutton
import {GlobalStyle} from './Styles.js';
import {ContactContext,ChatContext} from './Context.js';
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
// Update chat information
/*
props:
	id
	map
	maphandler
	fieldone
	fieldtwo
*/
const UpdateSettingsScreen = (props) => {

	const [settingsfieldone,setSettingsFieldOne] = useState("")
	const [settingsfieldtwo,setSettingsFieldTwo] = useState("")
	const onPress = () => {
		props.maphandler((map)=>{
			const newMap = new Map(props.map);
			const element = newMap.get(props.id);
			if (settingsfieldone != ""){
				element[props.fieldone] = settingsfieldone;
			}
			if (settingsfieldtwo != ""){
				element[props.fieldtwo] = settingsfieldtwo;
			}
			newMap.set(props.id,element);
			return newMap;
		})
	}
	
		console.log(props.map.get(props.id)[props.fieldone])
	
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
			<Text style={stylesUser.label}>Chat Name</Text>
			<TextInput editable={props.canedit}
			style={stylesUser.input} 
			placeholder={props.map.get(props.id)[props.fieldone]}
			onChangeText={newFieldOne=>setSettingsFieldOne(newFieldOne)}
			/>
			<Text style={stylesUser.label}>Chat Description</Text>
			<TextInput editable={props.canedit}
			style={stylesUser.input}
			placeholder={props.map.get(props.id)[props.fieldtwo]}
			onChangeText={newFieldTwo=>setSettingsFieldTwo(newFieldTwo)}
			/>
		</View>
		<View style={{flex:2,width:"80%",alignItems: "center"}}>
		
			{props.canedit?	
			<TouchableOpacity style={stylesUser.button} onPress={
					onPress
			}>
			<View>
			<Text>Update</Text>
			</View>
			</TouchableOpacity>
			:<View></View>}
		</View>
	</View>
    )
}

// Returns the settings screen displayed on the main page
const ChatSettingScreenComponent = ({route,navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Chat Settings"
	});
    }, [navigation]);
	
	const {id,map,maphandler,fieldone,fieldtwo,canedit} = route.params;
	const {contacts,setContacts,userid} = useContext(ContactContext)
	const {chats,setChats,ws,setWs} = useContext(ChatContext)
	
    return (
		<View style={{flex:1}}>
			<UpdateSettingsScreen map={map} maphandler={maphandler} canedit={canedit} id={id} fieldone={fieldone} fieldtwo={fieldtwo}/>
		</View>
    );
}

export default ChatSettingScreenComponent;
