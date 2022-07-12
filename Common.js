/*
  A file to hold components shared across different pages and library pre-reqs shared by components.
  Contains the navigation stack
*/

import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import Ionicons from '@expo/vector-icons/Ionicons';
import {FontAwesome} from '@expo/vector-icons'; 

import {GlobalStyle} from './Styles.js';



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
        anchor={<Ionicons name={props.ionicon} size={GlobalStyle.iconSize} onPress={showMenu} color="black" />}
        onRequestClose={hideMenu}
      >
	  {menuOptions}
      </Menu>
    </View>
  );
}
