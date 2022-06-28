/* A file to hold components used within the main screen */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';


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

    profileImage: {
	width: contactProfileSize,
	height: contactProfileSize,
	resizeMode: 'stretch',
	borderRadius: contactProfileSize/2,
    },
    profileButton: {
	width: contactProfileSize, 
	height:contactProfileSize, 
	borderRadius: contactProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
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

};

//Placeholder variables for debugging
const username = "Test User";
let userprofilepic = defaultprofile;

const getUsername = () => {
    return "Test User";
}

const originalmessages=[
    {username:"The Fool", message:"Test Message 0. Lorem Ipsum"},
    {username:"The Magician", message:"Test Message 1. Lorem Ipsum"},
    {username:"The High Priestess", message:"Test Message 2. Lorem Ipsum"},
    {username:"The Empress", message:"Test Message 3. Lorem Ipsum"},
    {username:"The Emperor", message:"Test Message 4. Lorem Ipsum"},
    {username:" The Hierophant", message:"Test Message 5. Lorem Ipsum"},
    {username:"The Lovers", message:"Test Message 6. Lorem Ipsum"},
    {username:"The Chariot", message:"Test Message 7. Lorem Ipsum"},
    {username:"Strength", message:"Test Message 8. Lorem Ipsum"},
    {username:"The Hermit", message:"Test Message 9. Lorem Ipsum"},
    {username:"The Wheel of Fortune", message:"Test Message 10. Lorem Ipsum"},
]

let currentmessages = originalmessages

//Settings icon which triggers menu popup
const SettingsButton = () => {
    return(
	<TouchableOpacity style = {styles.userProfileButton} onPress={()=>alert("Take user to settings")} >
	    <Ionicons name='settings-outline' size={40} color={highlightcolor}/>
	</TouchableOpacity>
    );
}

// Button to change user icon / display current one
const ChangeUserIconButton = () => {
    return(
	<TouchableHighlight style = {styles.userProfileButton} onPress={()=>{alert("let user change profile picture")}}>
	    <Image
		style ={styles.userProfileImage}
		source={userprofilepic}
	    />
	</TouchableHighlight>
    );
}

// Navbar on the main screen
const MainScreenNavBarComponent = (props) => {
    return (
	<NavigationBar
	    title="username"
	    rightButton={<SettingsButton/>}
	    leftButton={<ChangeUserIconButton/>}
	    containerStyle={styles.navBar}
	    tintColor='white'/>
    );
}
// Component to display a chat log with a user, with the most recent message previewed
const ChatComponent = (props) => {
    return (
	<TouchableHighlight onPress={()=>{alert("Take user to text chat")}} underlayColor = {highlightcolor}>
	    <View style={styles.chatComp}>
		<ProfileButton/>
		<View style={styles.miniChat}>
		    <Text style={styles.userName}>{props.username}</Text>
		    <Text>{props.message}</Text>
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
		   username={a.username}
		   message={a.message}
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

const MainScreenComponent = (props) => {
    return (
	<View style={styles.container}>
	    <MainScreenNavBarComponent/>
	    <MessagesListComponent/>
	</View>
    );
};

export default MainScreenComponent;  
