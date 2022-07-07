/*
  A file to hold components shared across different pages and library pre-reqs shared by components.
  Contains the navigation stack
*/

import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import Ionicons from '@expo/vector-icons/Ionicons';
import {FontAwesome} from '@expo/vector-icons'; 

const userProfileSize = 40
const highlightcolor = 'deepskyblue'



const CommonStyles = {
	profileImage: {
	resizeMode: 'stretch',
    },
    profileButton: {

	alignItems:'center',
	justifyContent:'center',
    },
    
	bottom: {
		width: 56,
		height: 56,
		alignItems:'flex-end',
		justifyContent: 'flex-end',
		bottom: 20,                                                    
		right: 20, 
		position: 'absolute',
	  },
	
}
//Settings icon which triggers menu popup
export const SettingsButton = ({onPress}) => {
    return(
	<TouchableOpacity style = {CommonStyles.profileButton} onPress={()=>onPress()} >
	    <Ionicons name='settings-outline' size={24} color={highlightcolor}/>
	</TouchableOpacity>
    );
}

export const NewChatButton = ({onPress}) => {
    return(
	<TouchableOpacity style = {CommonStyles.bottom} onPress={()=>onPress()} >
	    <Ionicons name='add-circle' size={56} color={highlightcolor}/>
	</TouchableOpacity>
    );
}

export const PhoneButton = (props) => {
	return(
	<TouchableOpacity style = {CommonStyles.profileButton} onPress={()=>{alert("Calling " + props.username)}} >
	    <FontAwesome name="phone" size={24} color="black" />
	</TouchableOpacity>
    );
}

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
        anchor={<Ionicons name={props.ionicon} size={24} onPress={showMenu} color="black" />}
        onRequestClose={hideMenu}
      >
	  {menuOptions}
      </Menu>
    </View>
  );
}
