/* A file to hold components used within the chat settings screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';


// Returns the settings screen displayed on the main page
const ChatSettingScreenComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Chat Settings"
	});
    }, [navigation]);
    return (
	<View>
	    <Text>The chat setting screen component</Text>
	</View>
    );
}

export default ChatSettingScreenComponent;
