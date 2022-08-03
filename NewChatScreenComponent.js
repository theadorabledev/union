/* A file to hold components used within the chat settings screen. */
import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

import {ChatComponent,NewChatComponent} from './Common.js';

//import Contacts from 'react-native-contacts';
import * as Contacts from "expo-contacts";

import uuid from 'react-native-uuid';
// Gets the contacts with phone numbers and displays them in a screen, loads only visible ones for performance



const NewChatScreenComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Start a New Chat"
	});
    }, [navigation]);
    const [contacts, setContacts] = useState([]);
    // Get contacts data
    useEffect(() => {
	(async () => {
	    const { status } = await Contacts.requestPermissionsAsync();
	    if (status === "granted") {
		const { data } = await Contacts.getContactsAsync({
		    fields: [Contacts.PHONE_NUMBERS],
			fields: [Contacts.Fields.Image],
		});
		if (data.length > 0) {
		    setContacts(data);
		    console.log(data[0]);
		}
	    }
	})();
    }, []);
    // Gets the key from each item
    const keyExtractor = (item, idx) => {
	return item?.id?.toString() || idx.toString();
    };
    // Renders the contact with the item and index
    const renderItem = ({ item, index }) => {
	// Wrapper for ChatComponent that appears as a possilbe contact in the NewChatScreen
	return <NewChatComponent
		username={item.name}
		image={item.image}
		messages={[]}
	    />;
    };
    return (
	<FlatList
	    data={contacts}
	    renderItem={renderItem}
	    keyExtractor={keyExtractor}
	/>
    );

}

export default NewChatScreenComponent;
