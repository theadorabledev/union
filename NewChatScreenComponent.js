/* A file to hold components used within the chat settings screen. */
import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';

import {ChatComponent,NewChatComponent,ContactInfoComponent,ChatCreator} from './Common.js';

//import Contacts from 'react-native-contacts';
import * as Contacts from "expo-contacts";

import uuid from 'react-native-uuid';
import { ChatContext,ContactContext } from './Context';
import { GlobalStyle } from './Styles.js';

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
			fields:[Contacts.Fields.id],
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
		name={item.name}
		image={item.image}
		messages={[]}
	    />;
    };
    return (
	<FlatList
	    data={contacts}
	    renderItem={renderItem}
	    keyExtractor={keyExtractor}
		ListHeaderComponent={<Button title="Create Group Chat"onPress={()=>{navigation.navigate('NewGroupChatScreen')}}/>}
	/>
    );
}

const NewGroupChatScreenComponent = ({navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: "Start a New Group Chat"
	});
    }, [navigation]);
	
    const {chats,setChats} = useContext(ChatContext);
	const {contacts,setContacts,userid} = useContext(ContactContext);
	const [selectedcontacts,setSelectedContacts] = useState([userid]);

	const contactdata = Array.from(contacts.values()).filter(function(value){
		return value.id != userid;
	})

    // Gets the key from each item
    const keyExtractor = (item, idx) => {
	return item?.id?.toString() || idx.toString();
    };
    // Renders the contact with the item and index
    const renderItem = ({ item, index }) => {
	// Wrapper for ChatComponent that appears as a possilbe contact in the NewChatScreen
	return <ContactInfoComponent
		name={item.name}
		picture={item.picture}
		id = {item.id}
		setSelectedContacts={setSelectedContacts}
		selectedcontacts={selectedcontacts}
	    />;
    };
    return (
	<FlatList
	    data={contactdata}
	    renderItem={renderItem}
	    keyExtractor={keyExtractor}
		ListFooterComponent={<Button title="Create Chat"onPress={()=>{
			setChats((chats)=>{
				const newchats = new Map(chats);
				const newchatid = uuid.v4()
				const newchat = ChatCreator(newchatid,selectedcontacts,[],"",GlobalStyle.defaultprofile,"")
				newchats.set(newchatid,newchat);
				return newchats;
			})
			navigation.navigate('Home');
		}}/>}
	/>
    );
}


export {NewChatScreenComponent,NewGroupChatScreenComponent};
