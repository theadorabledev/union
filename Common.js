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
    userProfileButton: {
	width: userProfileSize, 
	height:userProfileSize, 
	borderRadius: userProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
    },
}
//Settings icon which triggers menu popup
export const SettingsButton = ({onPress}) => {
    return(
	<TouchableOpacity style = {CommonStyles.userProfileButton} onPress={()=>onPress()} >
	    <Ionicons name='settings-outline' size={24} color={highlightcolor}/>
	</TouchableOpacity>
    );
}
export const PhoneButton = (props) => {
	return(
	<TouchableOpacity style = {CommonStyles.userProfileButton} onPress={()=>{alert("Calling " + props.username)}} >
	    <FontAwesome name="phone" size={24} color="black" />
	</TouchableOpacity>
    );
}

