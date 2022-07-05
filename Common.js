/*
  A file to hold components shared across different pages and library pre-reqs shared by components.
  Contains the navigation stack
*/

import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";

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
    
	
}
//Settings icon which triggers menu popup
export const SettingsButton = ({onPress}) => {
    return(
	<TouchableOpacity style = {CommonStyles.profileButton} onPress={()=>onPress()} >
	    <Ionicons name='settings-outline' size={24} color={highlightcolor}/>
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

