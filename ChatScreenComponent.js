/* A file to hold components used within the chat screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import {SettingsButton,PhoneButton} from './Common.js';

const MessageBoxComponent = (props) => {
    const [textmessages,setMessages] = useState([props.messages]);
    let empty = (textmessages.length == 0)
    let textComponents = textmessages.map((a, i) => {
	return <Text>
	{a}
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
const ChatScreenComponent = ({route, navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: route.params.username,
	    headerRight: () => (
		<View style={{
			flexDirection:'row',
			flexWrap: "wrap",
			justifyContent:'space-between',
			alignItems: 'center',
			minWidth: 30,
		}}>
			<SettingsButton onPress={() => navigation.navigate('ChatSettings')}/>
			<PhoneButton username={route.params.username}/>
			<Ionicons name="ellipsis-vertical" size={24} color="black" />
		</View>
	    ),
	});
    }, [navigation]);
    const {username, messages} = route.params;
    return (
	    <MessageBoxComponent messages={messages}/>
    );
}

export default ChatScreenComponent;
