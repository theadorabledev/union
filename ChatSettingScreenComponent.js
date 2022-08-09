/* A file to hold components used within the chat settings screen. */
import React, { useState,useContext } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import {GlobalStyle} from './Styles.js';
import {ContactContext,ChatContext} from './Context';
import { SignalContext } from './Context';

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
	let edittext ="";
	const [image, setImage] = useState(null);
	const [settingsfieldone,setSettingsFieldOne] = useState("")
	const [settingsfieldtwo,setSettingsFieldTwo] = useState("")
	if(props.canedit){
		edittext = "Set"
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
			{props.canedit?	<ImagePickerComponent image={image} setImage={setImage} profileSource ={props.element.picture}/> : <Image style={stylesUser.image} source ={props.element.picture}/>}
		</View>
		<View style={{height:200, width:"80%",minHeight:200,justifyContent: 'space-evenly',alignItems:"center"}}>
			<Text style={stylesUser.label}>{props.fields[0].formatname}</Text>
			<TextInput editable={props.canedit}
			style={stylesUser.input} 
			placeholder={props.element.name}
			onChangeText={newFieldOne=>setSettingsFieldOne(newFieldOne)}
			/>
			<Text style={stylesUser.label}>{props.fields[1].formatname}</Text>
			<TextInput editable={props.canedit}
			style={stylesUser.input}
			placeholder={props.element.details}
			onChangeText={newFieldTwo=>setSettingsFieldTwo(newFieldTwo)}
			/>
		</View>
		<View style={{flex:2,width:"80%",alignItems: "center"}}>
		
			{props.canedit?	
			<TouchableOpacity style={stylesUser.button} onPress={()=>
					props.onPress(settingsfieldone,settingsfieldtwo,image)
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
const RegisterUserComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Create Account"
	});
    }, [navigation]);
	//const [account,SetAccount] = useState(id,name,picture,details};
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext);
	const [userinfo,setUserInfo] = useState({id:uuid.v4(),name:"",picture:GlobalStyle.defaultprofile,details:""})
	const contactfields = [{name:"username",formatname:"Username"},{name:"pronouns",formatname:"Pronouns"},{name:"profilepic",formatname:""}];
	const {userStore,createUserIdentity,serverip} = useContext(SignalContext);
	const onPress = (settingsfieldone,settingsfieldtwo,image) => {
		if (settingsfieldone != ""){
			const element = userinfo;
			setContacts((contacts)=>{
				const newMap = new Map(contacts);
				if (settingsfieldone != ""){
					element.name = settingsfieldone;
				}
				if (settingsfieldtwo != ""){
					element.details = settingsfieldtwo;
				}
				if (image != null){
					element.picture= {uri:image}
				}
				newMap.set(element.id,element);
				return newMap;
			})
			setUserId(element.id);
			createUserIdentity();
		}
	}

    return (
		
		<View style={{flex:1}}>
			{
				<UpdateSettingsScreen onPress={onPress} canedit={true} element={userinfo} fields={contactfields}/>
			}
		</View>
    );
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
	const contactfields = [{name:"username",formatname:"Username"},{name:"pronouns",formatname:"Pronouns"},{name:"profilepic",formatname:""}];
	const chatfields = [{name:"chatname",formatname:"Set Chat Name"},{name:"description",formatname:"Set Chat Description"},{name:"chatpic",formatname:""}];
	const {id,ischat} = route.params;

	let canedit = false;
	if (userid==id){
		canedit = true;
	}

	function updateMap(map,maphandler,settingsfieldone,settingsfieldtwo,image){
		maphandler((map)=>{
			console.log(settingsfieldone);
			const newMap = new Map(map);
			const element = newMap.get(id);
			if (settingsfieldone != ""){
				element.name = settingsfieldone;
			}
			if (settingsfieldtwo != ""){
				element.details = settingsfieldtwo;
			}
			if (image != null){
				element.picture= {uri:image}
			}
			newMap.set(id,element);
			return newMap;
		})
	}

	const onPress = (settingsfieldone,settingsfieldtwo,image) => {
		if(ischat){
			updateMap(chats,setChats,settingsfieldone,settingsfieldtwo,image)
		}else{
			updateMap(contacts,setContacts,settingsfieldone,settingsfieldtwo,image)
		}
		
	}

    return (
		
		<View style={{flex:1}}>
			{
				ischat
				?
				<UpdateSettingsScreen onPress={onPress} canedit={canedit} element={chats.get(id)} fields={chatfields}/>
					:
				<UpdateSettingsScreen onPress={onPress} canedit={canedit} element={contacts.get(id)} fields={contactfields}/>
			}
		</View>
    );
}
export {RegisterUserComponent,ChatSettingScreenComponent};
