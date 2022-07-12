/* A file to hold components used within the chat settings screen. */
import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

import {NewChatComponent} from './Common.js';

//import Contacts from 'react-native-contacts';
import * as Contacts from "expo-contacts";


const Contact = (props) => {
    return (
	    <NewChatComponent
		username={props.contact?.name}
		messages={[]}
		contactlist={props.contactlist}
		setContactList={props.setContactList}
	    />
    );
};

// Returns the settings screen displayed on the main page
const NewChatScreenComponent = ({route,navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Start a New Chat"
	});
    }, [navigation]);
	
	const {contactlist, setContactList} = route.params;
	
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
	return <Contact contact={item} contactlist={contactlist} setContactList={setContactList} />;
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
