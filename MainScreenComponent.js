/* A file to hold components used within the main screen */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import {SettingsButton,ProfileButton} from './Common.js';

//import StackNav from './Common.js';

//Global Style Variables
const userProfileSize = 40
const contactProfileSize = 50
const highlightcolor = 'deepskyblue'
const defaultprofile = require('./assets/profilepicsquaresmall.png')

const styles = {
    container: {
	flex: 1,
	paddingTop: 32,
	padding: 2,
	borderRadius: 32,
    },
    chatComp: {
	flexDirection:'row',
	flexWrap: "wrap",
	alignItems:'center',
	maxHeight: 100,
	padding: 4,
    },
    miniChat: {
	flexDirection: 'column',
	justifyContent: 'space-around',
	color: "red",
	padding: 4,
	paddingTop: 10,
	paddingBottom: 10,
    },
    userProfileImage: {
	width: userProfileSize,
	height: userProfileSize,
	resizeMode: 'stretch',
	borderRadius: userProfileSize/2,
    },
    
    userProfileButton: {
	width: userProfileSize, 
	height:userProfileSize, 
	borderRadius: userProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
    },
	
    userName: {
	fontWeight: 'bold',
	fontSize: 16,
    },
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
const username = "Test User";
let userprofilepic = defaultprofile;

const getUsername = () => {
    return "Test User";
}

const originalmessages=[
    {id:0,username:"The Fool", messages:["Test Message 0. Lorem Ipsum","Test Message 1. Lorem Ipsum"]},
    {id:1,username:"The Magician", messages:["Test Message 0. Lorem Ipsum"]},
    {id:2,username:"The High Priestess", messages:["Test Message 0. Lorem Ipsum"]},
    {id:3,username:"The Empress", messages:["Test Message 0. Lorem Ipsum"]},
    {id:4,username:"The Emperor", messages:["Test Message 0. Lorem Ipsum"]},
    {id:5,username:" The Hierophant", messages:["Test Message 0. Lorem Ipsum"]},
    {id:6,username:"The Lovers", messages:["Test Message 0. Lorem Ipsum"]},
    {id:7,username:"The Chariot", messages:["Test Message 0. Lorem Ipsum"]},
    {id:8,username:"Strength", messages:["Test Message 0. Lorem Ipsum"]},
    {id:9,username:"The Hermit", messages:["Test Message 0. Lorem Ipsum"]},
    {id:10,username:"The Wheel of Fortune", messages:["Test Message 0. Lorem Ipsum"]},
]

let currentmessages = originalmessages

//Settings icon which triggers menu popup
// const SettingsButton = ({onPress}) => {
//     return(
// 	<TouchableOpacity style = {styles.userProfileButton} onPress={()=>onPress()} >
// 	    <Ionicons name='settings-outline' size={40} color={highlightcolor}/>
// 	</TouchableOpacity>
//     );
// }

// A user's profile image in chat component, can be used to view contact info for person

// Button to change user icon / display current one

// Component to display a chat log with a user, with the most recent message previewed
const ChatComponent = (props) => {
    const navigation = useNavigation();
    return (
	<TouchableHighlight onPress={() =>
				navigation.navigate(
				    'ChatScreen', {
					username:props.username,
					messages:props.messages
				    })
			    }
			    underlayColor = {highlightcolor}>
	    <View style={styles.chatComp}>
		<ProfileButton profileSize={50} profileSource={defaultprofile} onPress={()=>{alert("Take user to contact's settings")}}/>
		<View style={styles.miniChat}>
		    <Text style={styles.userName}>{props.username}</Text>
		    <Text>{props.messages[props.messages.length-1]}</Text>
		</View>
	    </View>
	</TouchableHighlight>
    );
};

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
	    <Button title="Reset Messages" color = {styles.highlightcolor} onPress={()=>{
			setMessages(originalmessages);
		    }
										   }/>
	    <Button title="Clear Messages" color = {styles.highlightcolor} onPress={()=>{
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

export const NewChatButton = ( ) => {
    return(
	<TouchableOpacity style = {styles.newChat} onPress={() => navigation.navigate('NewChatScreen')} >
	    <Ionicons name='add-circle' size={56} color={highlightcolor}/>
	</TouchableOpacity>
    );
}

const MainScreenComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: getUsername(),
	    headerRight: () => (
		<SettingsButton onPress={() => navigation.navigate('MainSettings')}/>
	    ),
	    headerLeft: () => (
		<ProfileButton profileSize={40} profileSource={userprofilepic} onPress={()=>{alert("let user change profile picture")}}/>
	    ),
	});
    }, [navigation]);
    return (
	<View style={styles.container}>
	    <MessagesListComponent/>
		<NewChatButton/>
	</View>
    );

};

export default MainScreenComponent;
