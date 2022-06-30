/* A file to hold components used within the chat screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';


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
const ChatScreenComponent = ({route,navigation}) => {
	const {username,messages} = route.params
	
	React.useLayoutEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		<Text>Temp Setting Label</Text>
	    ),
	});
    }, [navigation]);
	
    return (
	<View>
	    <MessageBoxComponent messages={messages}/>
	</View>
    );
}

export default ChatScreenComponent;
