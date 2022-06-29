/* A file to hold components used within the chat screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

// Returns the settings screen displayed on the main page
const ChatScreenComponent = ({route,navigation}) => {
	const {username,message} = route.params
	
    return (
	<View>
	    <Text>{message}</Text>
	</View>
    );
}

export default ChatScreenComponent;
