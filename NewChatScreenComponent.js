/* A file to hold components used within the chat settings screen. */
import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

import {ChatComponent} from './Common.js';

//import Contacts from 'react-native-contacts';
import * as Contacts from "expo-contacts";


const Contact = ({contact}) => {
    return (
	    <ChatComponent
		username={contact?.name}
	    />
    );
};

// Returns the settings screen displayed on the main page
const NewChatScreenComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Start a New Chat"
	});
    }, [navigation]);
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
	(async () => {
	    const { status } = await Contacts.requestPermissionsAsync();
	    if (status === "granted") {
		const { data } = await Contacts.getContactsAsync({
		    fields: [Contacts.PHONE_NUMBERS],
		});
		if (data.length > 0) {
		    setContacts(data);
		    console.log(data[0]);
		}
	    }
	})();
    }, []);
    const keyExtractor = (item, idx) => {
	return item?.id?.toString() || idx.toString();
    };
    const renderItem = ({ item, index }) => {
	return <Contact contact={item} />;
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
