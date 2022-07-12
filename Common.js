/*
  A file to hold components shared across different pages and library pre-reqs shared by components.
  Contains the navigation stack
*/

import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import {FontAwesome} from '@expo/vector-icons'; 

import {GlobalStyle} from './Styles.js';

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
	return(
	<TouchableOpacity onPress={()=>onPress()} >
	    <FontAwesome name="user" size={GlobalStyle.userProfileSize} color="black" />
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
	<TouchableHighlight style ={{width: props.profileSize,
				height: props.profileSize,
				borderRadius: props.profileSize/2
		}}
	onPress={props.onPress}>
	    <Image
		style ={{width: props.profileSize,
				height: props.profileSize,
				borderRadius: props.profileSize/2
		}}
		source={props.profileSource}
	    />
	</TouchableHighlight>
    );
} 


//context menu wrapper
export const ContextMenu =(props)=> {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const menuOptions = props.options.map((a,i) => {
	 return <MenuItem key={i} onPress={a.handler}>{a.text}</MenuItem>
  });
  
  return (
    <View>
      <Menu
        visible={visible}
        anchor={<Ionicons name={props.ionicon} size={GlobalStyle.iconSize} onPress={showMenu} color={GlobalStyle.highlightcolor} />}
        onRequestClose={hideMenu}
      >
	  {menuOptions}
      </Menu>
    </View>
  );
}
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
// Component to display a chat log with a user, with the most recent message previewed
export const ChatComponent = (props) => {
    const navigation = useNavigation();
    const lastMessage = () => {
	if(props.messages.length){
	    return (
		<>
		    <Text>{props.messages[props.messages.length-1]}</Text>
		    <Text>"Date"</Text>
		</>
	    );
	}
    }
    return (
	<TouchableHighlight onPress={() =>
				navigation.navigate(
				    'ChatScreen', {
					username:props.username,
					messages:props.messages,
					newChat:props.isNewChat
				    })
			    }
			    underlayColor = {GlobalStyle.highlightcolor}>
	    <View style={ChatComponentStyles.chatComp}>
		<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={GlobalStyle.defaultprofile} onPress={()=>{alert("Take user to contact's settings")}}/>
		<View style={ChatComponentStyles.miniChat}>
		    <Text style={ChatComponentStyles.userName}>{props.username}</Text>
		    {lastMessage()}
		</View>
	    </View>
	</TouchableHighlight>
    );
};

// Component to display a chat log with a user, with the most recent message previewed
export const NewChatComponent = (props) => {
    const navigation = useNavigation();
    const lastMessage = () => {
	if(props.messages.length){
	    return (
		<>
		    <Text>{props.messages[props.messages.length-1]}</Text>
		    <Text>"Date"</Text>
		</>
	    );
	}
    }
    return (
	<TouchableHighlight onPress={() =>{
					const templist = [...props.contactlist];
					templist.push({id:props.contactlist.length,username:props.username, messages:props.messages})
					props.setContactList(templist)
					
					navigation.navigate(
						'ChatScreen', {
						username:props.username,
						messages:props.messages,
						newChat:props.isNewChat
						})
					}
				}
			    underlayColor = {GlobalStyle.highlightcolor}>
	    <View style={ChatComponentStyles.chatComp}>
		<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={GlobalStyle.defaultprofile} onPress={()=>{alert("Take user to contact's settings")}}/>
		<View style={ChatComponentStyles.miniChat}>
		    <Text style={ChatComponentStyles.userName}>{props.username}</Text>
		    {lastMessage()}
		</View>
	    </View>
	</TouchableHighlight>
    );
};
