/* A file to hold components used within the main screen */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import {SettingsButton, ProfileButton, ChatComponent} from './Common.js';

import {GlobalStyle} from './Styles.js';




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

//Placeholder variables for debugging
const userInfo = {
    pic:GlobalStyle.defaultprofile,
    firstName:"Test",
    lastName:"Profile",
    identify:"They/Them",
    phone:"(123)456-7890"
}
let userprofilepic = GlobalStyle.defaultprofile;

const getUsername = () => {
    return userInfo.firstName+" "+userInfo.lastName;
}

const originalmessages=[
    {id:0,username:"The Fool", messages:[
	"Test Message 0. Lorem Ipsum",
	"Test Message 1. Lorem Ipsum",
	"Test Message 2. Lorem Ipsum",
	"Test Message 3. Lorem Ipsum",
	"Test Message 4. Lorem Ipsum",
	"Test Message 5. Lorem Ipsum",
	"Test Message 6. Lorem Ipsum",
	"Test Message 7. Lorem Ipsum",
	"Test Message 1. Lorem Ipsum",
	"Test Message 2. Lorem Ipsum",
	"Test Message 3. Lorem Ipsum",
	"Test Message 4. Lorem Ipsum",
	"Test Message 5. Lorem Ipsum",
	"Test Message 6. Lorem Ipsum",
	"Test Message 7. Lorem Ipsum",]},
    {id:1,username:"The Magician", messages:["Test Message 0. Lorem Ipsum"]},
    {id:2,username:"The High Priestess", messages:["Test Message 0. Lorem Ipsum"]},
    {id:3,username:"The Empress", messages:["Test Message 0. Lorem Ipsum"]},
    {id:4,username:"The Emperor", messages:["Test Message 0. Lorem Ipsum"]},
    {id:5,username:"The Hierophant", messages:["Test Message 0. Lorem Ipsum"]},
    {id:6,username:"The Lovers", messages:["Test Message 0. Lorem Ipsum"]},
    {id:7,username:"The Chariot", messages:["Test Message 0. Lorem Ipsum"]},
    {id:8,username:"Strength", messages:["Test Message 0. Lorem Ipsum"]},
    {id:9,username:"The Hermit", messages:["Test Message 0. Lorem Ipsum"]},
    {id:10,username:"The Wheel of Fortune", messages:["Test Message 0. Lorem Ipsum"]},
]

let currentmessages = originalmessages


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
    const [messages,setMessages] = useState([]);
    let empty = (messages.length == 0)
    let messageComponents = messages.map((a, i) => {
	return <ChatComponent
		   key={a.id}
		   username={a.username}
		   messages={a.messages}
	       />;
    });
    return (
	<>
	    <Button title="Reset Messages" color = {GlobalStyle.highlightcolor} onPress={()=>{
			setMessages(originalmessages);
		    }
											}/>
	    <Button title="Clear Messages" color = {GlobalStyle.highlightcolor} onPress={()=>{
			setMessages([])
		    }
											}/>
	    {empty ?
	     <NoContactsComponent/>
	     :
	     <ScrollView>
		 {messageComponents}
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
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: getUsername(),
	    headerRight: () => (
		<SettingsButton onPress={() => navigation.navigate('MainSettings',{userInfo:userInfo, profilepic:userprofilepic})}/>
	    ),
	    headerLeft: () => (
		<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={userprofilepic} onPress={()=>{alert("let user change profile picture")}}/>
	    ),
	});
    }, [navigation]);
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
