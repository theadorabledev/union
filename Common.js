/*
  A file to hold components shared across different pages and library pre-reqs shared by components.
*/

import React, { useState,useContext } from 'react';
import { View, Text, ScrollView,TextInput,Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import uuid from 'react-native-uuid';
import { format,isSameDay,parseISO} from 'date-fns'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import Ionicons from '@expo/vector-icons/Ionicons';
import { EvilIcons } from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';

import {GlobalStyle,useTheme,keyboardStyle} from './Styles.js';
import {ChatContext,ContactContext,SignalContext,PasswordContext} from './Context.ts';

// Home button to navigate to MainScreenComponent
export const HomeButton = ({onPress}) => {
    return(
	<TouchableOpacity onPress={()=>onPress()}>
	    <Ionicons name="home" size={GlobalStyle.iconSize} color={GlobalStyle.pinklightcolor} />
	</TouchableOpacity>
    )
}

// User icon
export const UserButton = ({onPress}) => {
	const {colors,isdark} = useTheme();
    return(
	<TouchableOpacity onPress={()=>onPress()} >
	    <FontAwesome name="user" size={GlobalStyle.userProfileSize} color={colors.text} />
	</TouchableOpacity>
    );
}

// Right Arrow
export const RightArrow = ({ onPress }) => {
	const {colors,isdark} = useTheme();
	return (
	  <TouchableOpacity onPress={() => onPress()} >
		<EvilIcons name="chevron-right" size={GlobalStyle.iconSize} color={colors.text} />
	  </TouchableOpacity>
	);
}

//Settings icon which triggers menu popup
export const SettingsButton = ({onPress}) => {
    return(
	<TouchableOpacity onPress={()=>onPress()} >
	    <Ionicons name='settings-outline' size={GlobalStyle.iconSize} color={GlobalStyle.highlightcolor}/>
	</TouchableOpacity>
    );
}


//call button (should this really be common?)
export const PhoneButton = (props) => {
    return(
	<TouchableOpacity onPress={()=>{alert("Calling " + props.username)}} >
	    <FontAwesome name="phone" size={GlobalStyle.iconSize} color="black" />
	</TouchableOpacity>
    );
}


//Image Button Wrapper
export const ProfileButton = (props) => {
	return(
		<TouchableHighlight style ={{width: props.profileSize, height: props.profileSize, borderRadius: props.profileSize/2}}
			onPress={props.onPress}>
			<Image
				style ={{width: props.profileSize, height: props.profileSize, borderRadius: props.profileSize/2}}
				source={props.profileSource}
			/>
		</TouchableHighlight>
    );
}


export const SettingProfileButton = (props) => {
	const {contacts,setContacts,userid} = useContext(ContactContext);
	const navigation = useNavigation();
    return(
		<ProfileButton
				profileSize={GlobalStyle.userProfileSize}
				profileSource={contacts.get(userid).picture}
				onPress={() => navigation.navigate('ChatSettings', {
				id:userid,
				ischat:false,
				})}
			/>
	)
}



//context menu wrapper
export const ContextMenu =(props)=> {
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
	const {colors,isDark} = useTheme();
    const menuOptions = props.options.map((a,i) => {
	return <MenuItem textStyle={{color:colors.text}}key={i} onPress={()=>{a.handler();hideMenu();}}>{a.text}</MenuItem>
    });

    return (
	<View >
	    <Menu
		visible={visible}
		style={{backgroundColor:colors.background}}
		anchor={<Ionicons name={props.ionicon} size={GlobalStyle.iconSize} onPress={showMenu} color={GlobalStyle.highlightcolor} />}
		onRequestClose={hideMenu}
	    >
		{menuOptions}
	    </Menu>
	</View>
    );
}

// Component to display a chat log with a user, with the most recent message previewed
// Used on main page and new chat page


//retrieve dynamically determined name from chat object, corresponding to either chat name, or name of contact if DM.
//not alphabetized correctly?
function getChatName(chat){
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	if (chat.name != ""){
		if(chat.name.length > 30){
			return chat.name.substring(0,27)+"..."
		}
		return chat.name;
	}
	else{
		const filteredcontacts = chat.contactids.filter((a)=>{
			return a!= userid;
		});
		const contactnames = filteredcontacts.map((a)=>{
				const contact = contacts.get(a);
				if(typeof contact != "undefined"){
					return contacts.get(a).name;
				}
		})
		console.log(contactnames)
		contactnames.sort(function (a, b) {
			if (a < b)
  				return -1;
			if ( b > a)
  				return 1;
			return 0;
		});
		console.log(contactnames);
		if(contactnames.toString().length > 30){
			return contactnames.toString().substring(0,27)+"..."
		}
		return contactnames.toString();
	}
}

//retrieve dynamically determined name from chat object, corresponding to either chat picture, or contact profile picture if DM.
function getChatPicture(chat){
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	let chatpic = chat.picture;
	if(chat.contactids.length==2){
		let contactnames = chat.contactids.map((a)=>{
			if (a!= userid){
				const contact = contacts.get(a);
				if(typeof contact != "undefined"){
					chatpic = contacts.get(a).picture;
				}
			}
		});
	}
	//log(chatpic);
	return chatpic;
}

//Chat Component Styling, used for chat component & new chat component
const ChatComponentStyles = {
    chatComp: {
	flexDirection:'row',
	alignItems:'center',
	padding: 4,
    },
    miniChat: {
	flex: 1,
	flexDirection: 'column',
	height:60,
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
	alignContent: 'space-between',
	paddingTop: 10,
	paddingLeft: 5,
	paddingRight:5,
    },
    userName: GlobalStyle.textTypes.H3
}


//chat component: Displays information related to chat in main screen component, as well as providing navigation options to corresponding screens
export const ChatComponent = (props) => {
    const navigation = useNavigation();
	const {chats,setChats,ws,setWs} = useContext(ChatContext)
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	const chat = chats.get(props.chatId)
	const chatname = getChatName(chat)
	const chatpic = getChatPicture(chat)
	const {colors, isDark} = useTheme();
	//provides navigation options to contact settings if DM, or chat settings if GC.
	const settingsNavigate =() => {
		if(chat.contactids.length != 2){
			navigation.navigate('ChatSettings', 
			{
				id:props.chatId,
				ischat:true,
			})
		}else{
			navigation.navigate('ChatSettings', 
			{
				id:chat.contactids.find(function(value){
					return value != userid;
				}),
				ischat:false,
			})
		}
		
	}
	//return JSX object that displays contents & time of last message
    const lastMessage = () => {
		if(chat.messages.length){
			const dateinfo = chat.messages[chat.messages.length-1].date;
			const formatdate = () => {
				if(isSameDay(Date.now(),new Date(dateinfo))){
					return format(new Date(dateinfo),'p');
				}else{
					return format(new Date(dateinfo),"MMM d")
				}
			}
			return (
			<>
				<Text style={{color:colors.text}}>{chat.messages[chat.messages.length-1].message}</Text>
				<Text style={{color:colors.text}}>{formatdate()}</Text>
			</>
			);
		}
    }
    return (
		<TouchableHighlight onPress={() =>
			navigation.navigate('ChatScreen', 
			{
				username:chatname,
				messages:chat.messages,
				newChat:props.isNewChat,
				chatId:props.chatId,
				chatpic:chatpic,
				settingsNavigate:settingsNavigate,
			})
		}
		onLongPress ={()=>{
			props.setSelectedChatId(props.chatId);
			props.setShowModal(true);
		}}
		underlayColor = {GlobalStyle.highlightcolor}>
			<View style={ChatComponentStyles.chatComp}>
				<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={chatpic} onPress={settingsNavigate}/>
				<View style={ChatComponentStyles.miniChat}>
					<Text style={{...ChatComponentStyles.userName,color:colors.text}}>{chatname}</Text>
					{lastMessage()}
				</View>
			</View>
		</TouchableHighlight>
    );
};


//used to create new contact object (needs to be replaced with typescript compatable format)
export function ContactCreator(id,name,picture,details){
	return{id,name,picture,details};
}
//used to create new chat object (needs to be replaced with typescript compatable format)
export function ChatCreator(id,contactids,messages,name,picture,details){
	return {id,contactids,messages,name,picture,details};
}

//Displays devices contact data with options to create new contact & chat if user presses
//pass props.username, props.uri 
export const NewChatComponent = (props) => {
    const navigation = useNavigation();
	const {colors,isdark} = useTheme();
	const {chats,setChats,ws,setWs} = useContext(ChatContext)
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	//display either device's contact's image if present, or default icon if not present.
	const getImage = () =>{
		if (typeof props.image == "undefined"){
			return GlobalStyle.defaultprofile;
		}else{
			return props.image;
		}
	} 
	//take the devices contact info, generate new contact data & chat data based on it, and navigate to the new chat.
	function newContactChat(){
		console.log("Create Contact");
		//create new contact id
		const newcontactid = props.id
		//add user to contact map
		setContacts((contacts) =>{
			const newContacts = new Map(contacts);
			const thiscontact = ContactCreator(newcontactid,props.name,getImage(),props.pronouns);
			newContacts.set(newcontactid,thiscontact)
			return newContacts;
		});
		//generate new chat
		const newchatid = uuid.v4().replace(/-/g,"").substring(0,24);
		//this should send information to the server to generate the actual chat and make sure the uuid's match between users, but one thing at a time.
		const getnewchat =ChatCreator(newchatid,[userid,newcontactid],[],"",GlobalStyle.defaultprofile,"");
		setChats((chats) => {
			const newChats = new Map(chats);
			newChats.set(newchatid,getnewchat);
			return newChats;
		});
		//navigate to new chat screen
		navigation.navigate('Home');
	}
    return (
	<TouchableHighlight 
		onPress={newContactChat}
			    underlayColor = {GlobalStyle.highlightcolor}>
	    <View style={{...ChatComponentStyles.chatComp,backgroundColor:colors.background}}>
			<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={getImage()}/>
			<View style={ChatComponentStyles.miniChat}>
				<Text style={{...ChatComponentStyles.userName,color:colors.text}}>{props.name}</Text>
			</View>
	    </View>
	</TouchableHighlight>
    );
};

export const MessageSearchBar = (props) =>{
	const {colors,isdark} = useTheme();
	if(props.barstate.barvisible){
	return (
		<View style = {keyboardStyle.outer}>
		<View style={{...keyboardStyle.container,backgroundColor:colors.backgroundalt}}> 
		  <TextInput
			autoCapitalize="none"
			autoCorrect={false}
			clearButtonMode="always"
			value={props.query}
			onChangeText={queryText => props.handleSearch(queryText)}
			placeholder="Search"
			placeholderTextColor={colors.textalt}
			style={{...keyboardStyle.input,color:colors.text}}
		  />
		  	<TouchableOpacity onPress={()=>{
				props.barstate.setBarVisible(false)
				props.handleSearch("");
				}}>
				<Ionicons name='close-circle' size={24} color={GlobalStyle.highlightcolor} style={keyboardStyle.icon}/>
			</TouchableOpacity>
		</View>
		</View>
	  );
	}else{
		return <View></View>
	}
}

export const ContactInfoComponent = (props) => {
	const {colors,isdark} = useTheme();
	const isSelected = ()=>{
		if(props.selectedcontacts.includes(props.id)){
			return {backgroundColor:GlobalStyle.highlightcolor}
		}else{
			return {}
		}
	}
    return (
	<TouchableHighlight 
			underlayColor = {GlobalStyle.highlightcolor}
			style={{backgroundColor:colors.background}}
			onPress={()=>{
				props.setSelectedContacts((contacts)=>{
					const newcontacts = [...contacts];
					if (newcontacts.includes(props.id)){
						const result = newcontacts.filter(function(value){return value != props.id});
						return result;
					}else{
						newcontacts.push(props.id);
						return newcontacts;
					}
				})
			}}
	>
	    <View style={[ChatComponentStyles.chatComp,isSelected()]}>
			<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={props.picture}/>
			<View style={ChatComponentStyles.miniChat}>
				<Text style={{...ChatComponentStyles.userName,color:colors.text}}>{props.name}</Text>
			</View>
	    </View>
	</TouchableHighlight>
    );
};
