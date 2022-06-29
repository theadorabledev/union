/* A file to hold components used within the main settings screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

// A component to display either all of someone's chats or the incoming (no contacts) screen





const MessageBoxComponent = (props) => {
    const [messages,setMessages] = useState([props.message]);
    let empty = (messages.length == 0)
    let textComponents = messages.map((a, i) => {
	return <Text>
		   {a.message}
	       </Text>;
    });
    return (
	<>
	    {empty ? 
	    <Text>No new messages</Text>
	     :
	     <ScrollView>
		 {textComponents}
	     </ScrollView>
	    }
	</>
    );	
}

// Returns the settings screen displayed on the main page
const MainSettingScreenComponent = () => {
    return (
	<View>
	    <Text>The setting screen component</Text>
	</View>
    );
}

export default MainSettingScreenComponent;
