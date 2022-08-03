/* A file to hold components used within the main screen */
import React, { useState,useContext,useEffect } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown-v2'

import * as Contacts from "expo-contacts";

import uuid from 'react-native-uuid';

import {SettingsButton, ProfileButton, ChatComponent} from './Common.js';

import {GlobalStyle} from './Styles.js';



import {ChatContext,ContactContext,SignalContext} from './Context.js';

const MainScreenStyles = {
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

    userProfileImage: {
	width: GlobalStyle.userProfileSize,
	height: GlobalStyle.userProfileSize,
	resizeMode: 'stretch',
	borderRadius: GlobalStyle.userProfileSize/2,
    },

    userProfileButton: {
	width: GlobalStyle.userProfileSize,
	height:GlobalStyle.userProfileSize,
	borderRadius: GlobalStyle.userProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
    },

    userName: GlobalStyle.textTypes.H3,

    navBar: {
	paddingLeft: 4,
	paddingRight: 4,
    },

    newChat: {
	width: 56,
	height: 56,
	alignItems:'flex-end',
	justifyContent: 'flex-end',
	bottom: 20,
	right: 20,
	position: 'absolute',
    },
};

let userprofilepic = GlobalStyle.defaultprofile;





// A View to Dispay a default message for incoming users
const NoContactsComponent = () => {
    return (
	<View>
	    <Text>It looks like you're all alone.</Text>
	    <Text>Time to Uni/onize!</Text>
	</View>
    );
}

// A component to display either all of someone's chats or the incoming (no contacts) screen
const MessagesListComponent = (props) => {
    const {chats,setChats,ws,setWs} = useContext(ChatContext)
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	
	const {userStore,createUserIdentity,serverip} = useContext(SignalContext)
	const display = "Change Account"
    let empty = (chats.size == 0)
    let chatComponents = []
	chats.forEach((a, i) => {
		chatComponents.push(<ChatComponent
		   key={a.id}
		   chatId={a.id}
	       />)
    });
	
	let contactArray = [];
	contacts.forEach((a,i)=>{
		contactArray.push({value: a.id});
	})
	
    return (
	<>											
	   <Dropdown
        label={display}
        data={contactArray}
		onChangeText= {
			(value,index,data)=>{
			setUserId((userid)=>{
					return value
			})
		    }
											
		}
      />
	    <Button title="Reset Websocket" color = {GlobalStyle.highlightcolor} onPress={()=>{setWs(new WebSocket('ws://'+serverip+'/'+userid))}}/>		
		
	    {empty ?
	     <NoContactsComponent/>
	     :
	     <ScrollView>
		 {chatComponents}
	     </ScrollView>
	    }
	</>
    );
}

// Button in the lower right corner which directs users to the NewChatScreen
export const NewChatButton = (props) => {
    const navigation = useNavigation();
    return(
	<TouchableOpacity style = {MainScreenStyles.newChat} onPress={() => navigation.navigate('NewChatScreen')} >
	    <Ionicons name='add-circle' size={56} color={GlobalStyle.pinklightcolor}/>
	</TouchableOpacity>
    );
}

// Displays the main screen, all the chats the user is engaged in
const MainScreenComponent = ({navigation}) => {
    useEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		<SettingsButton onPress={() => navigation.navigate('MainSettings')}/>
	    ),
	    headerLeft: () => (
		<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={userprofilepic}onPress={() => navigation.navigate('ChatSettings', {
			id:userid,
			canedit:true,
			map:contacts,
			maphandler:setContacts,
			fieldone:"username",
			fieldtwo:"pronouns",
			})
								 }/>
	    ),
	});
    }, [navigation]);
	const {contacts,setContacts,userid} = useContext(ContactContext)
    return (
	<>
	    <View>
		<MessagesListComponent/>
	    </View>
	    <NewChatButton/>
	</>
    );

};

export default MainScreenComponent;
