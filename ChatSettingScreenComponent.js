/* A file to hold components used within the chat settings screen. */
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import {GlobalStyle} from './Styles.js';
import {ContactContext,ChatContext} from './Context.ts';

const stylesUser = StyleSheet.create(
{
	outerContainer:
	{
	  backgroundColor: '#0e101c',
	  marginLeft: 200,
	},
	background:
	{
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 700,
	},
	image: 
	{
	  //margin: 20,
	  height:128,
	  width:128,
	  borderRadius: 50,
	},
	innerContainer:
	{
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
	input:
	{
	  height: 45,
	  width: "90%",
	  padding: 10,
	  borderRadius: 5,
	  backgroundColor: 'white',
	},
	button:
	{
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

const ImagePickerComponent = (props) => {
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync(
		{
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
	  	});
		if (!result.cancelled)
		{
			props.setImage(result.uri);
	  	}
	};

	return(
		<TouchableHighlight 
			style={stylesUser.image}
			onPress={pickImage}
		>
			{
				props.image 
				?
					<Image
						style={stylesUser.image}
						source={{ uri: props.image }}
					/>
				:
					<Image
						style={stylesUser.image}
						source={props.profileSource}
					/>
			}
		</TouchableHighlight>
    );
}


const UpdateSettingsScreen = (props) => {

	const [settingsfieldone,setSettingsFieldOne] = useState("")
	const [settingsfieldtwo,setSettingsFieldTwo] = useState("")
	const [image, setImage] = useState(null);
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
			if (image != null){
				element[props.fieldthree]= {uri:image}
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
			{props.canedit?	<ImagePickerComponent image={image} setImage={setImage} profileSource ={props.map.get(props.id)[props.fieldthree]}/> : <Image style={stylesUser.image} source ={props.map.get(props.id)[props.fieldthree]}/>}
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

	const {contacts,setContacts,userid} = useContext(ContactContext);
	const {chats,setChats} = useContext(ChatContext);
	const contactfields = ["username","pronouns","profilepic"];
	const chatfields = ["chatname","description","chatpic"]
	const {id,ischat} = route.params;
	let canedit = false;
	if (userid==id){
		canedit = true;
	}
	
    return (
		
		<View style={{flex:1}}>
			{
				ischat
				?
				<UpdateSettingsScreen map={chats} maphandler={setChats} canedit={canedit} id={id} fieldone={chatfields[0]} fieldtwo={chatfields[1]} fieldthree={chatfields[2]}/>
					:
				<UpdateSettingsScreen map={contacts} maphandler={setContacts} canedit={canedit} id={id} fieldone={contactfields[0]} fieldtwo={contactfields[1]} fieldthree={contactfields[2]}/>
			}
		</View>
    );
}

export default ChatSettingScreenComponent;
