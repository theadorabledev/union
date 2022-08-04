import 'react-native-gesture-handler'; 
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image,ImageSourcePropType,  TouchableOpacity, TouchableHighlight } from "react-native";

import MainScreenComponent from './MainScreenComponent';
import MainSettingScreenComponent from './MainSettingScreenComponent';
import ChatScreenComponent from './ChatScreenComponent';
import ChatSettingScreenComponent from './ChatSettingScreenComponent';
import NewChatScreenComponent from './NewChatScreenComponent';
import SettingOptionsComponent from './SettingOptionsComponent'
import {GlobalStyle} from './Styles.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { withNavigation } from 'react-navigation';

import Ionicons from '@expo/vector-icons/Ionicons';
import uuid from 'react-native-uuid';
const StackNav = createNativeStackNavigator();

import {
    KeyHelper,
    SignedPublicPreKeyType,
    SignalProtocolAddress,
    SessionBuilder,
    PreKeyType,
    SessionCipher,
    MessageType }
from '@privacyresearch/libsignal-protocol-typescript'

import { SignalProtocolStore } from './storage-type';

import {ChatContext,ContactContext,SignalContext,Chat,Contact,ProcessedChatMessage} from './Context';

//import { MMKV } from 'react-native-mmkv'
import * as SecureStore from 'expo-secure-store';




function ContactCreator(map:Map<string,Contact>,id:string,username:string,profilepic:ImageSourcePropType,pronouns:string){
	map.set(id,{id,username,profilepic,pronouns})
}

function TestChatCreator(map:Map<string,Chat>,id:string,contactids:string[],messages:ProcessedChatMessage[],chatname:string,chatpic:ImageSourcePropType,description:string){
	map.set(id,{id,contactids,messages,chatname,chatpic,description})
}



function MessageCreator(message:string,senderid:string,chatId:string){
	return{
		messageId:uuid.v4().toString(),
		message:message,
		senderId:senderid,
		chatId:chatId,
		recieverId:"",
		date:new Date(),
		delivered:true,
	}
}







const contactMap = new Map<string,Contact>();



const chatMap = new Map<string,Chat>();

const initialUserId = "47769a91-2d07-4580-8828-5913cf821623";
const altId = "1d4070bf-7ada-46bd-8b7c-c8b8e0507dec"
const serverip = "68.198.220.163:8000"
ContactCreator(contactMap,initialUserId,"TestUser",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,altId,"The Fool",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"1","The Magician",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"2","The High Priestess",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"3","The Empress",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"4","The Emperor",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"5","The Hierophant",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"6","The Lovers",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"7","The Chariot",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"8","Strength",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"9","The Hermit",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"10","The Wheel of Fortune",GlobalStyle.defaultprofile,"They/Them")

TestChatCreator(chatMap,"0",[initialUserId,altId],[
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 1. Lorem Ipsum",initialUserId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 2. Lorem Ipsum",initialUserId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 3. Lorem Ipsum",initialUserId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
	],"",GlobalStyle.defaultprofile,"")
TestChatCreator(chatMap,"1",[initialUserId,"1","4"], [
		MessageCreator("Test Message 0. Lorem Ipsum","1","1"),
		MessageCreator("Test Message 1. Lorem Ipsum","4","1"),
		MessageCreator("Test Message 2. Lorem Ipsum",initialUserId,"1"),
	],"Test Group chat", GlobalStyle.defaultprofile,"A test Chat")


const initialws = new WebSocket('ws://'+serverip+'/'+initialUserId)
const userAddress = new SignalProtocolAddress(initialUserId, 1);
function App() {

// storage with usr id and encryption
// export const storage = new MMKV({
// 	id: `user-${userId}-storage`,
// 	path: `${USER_DIRECTORY}/storage`,
// 	encryptionKey: 'hunter2'
//   })

// basic storage initializer
// const storage = new MMKV()
// storage.recrypt('union')
// to set key and value : storage.set('key', 'val')
// to retrieve: const val = storage.getString('key')
	
function makeKeyId(){
	return Math.floor(10000 * Math.random());
}
	
const storeSomewhereSafe = (store: SignalProtocolStore) => 
	(key: string, value: any) => {store.put(key, value)};
	// storage.set(key, value)
	
const createID = async (name: string, store: SignalProtocolStore) => 
{
	const registrationId = KeyHelper.generateRegistrationId()
	storeSomewhereSafe(store)(`registrationID`, registrationId)
	//storage.set(`registrationID`, registrationId)

	const identityKeyPair = await KeyHelper.generateIdentityKeyPair()
	storeSomewhereSafe(store)('identityKey', identityKeyPair)
	//storage.set('identityKey', JSON.stringify(identityKeyPair))

	const baseKeyId = makeKeyId()
	const preKey = await KeyHelper.generatePreKey(baseKeyId)
	store.storePreKey(`${baseKeyId}`, preKey.keyPair)
	//storage.set(`${baseKeyId}`, JSON.stringify(preKey.keyPair))

	const signedPreKeyId = makeKeyId()
	const signedPreKey = await KeyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyId)
	store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair)
	//storage.set(`${signedPreKeyId}`, JSON.stringify(signedPreKey.keyPair))
	
	// Now we register this with the server or other directory so all users can see them.
	// You might implement your directory differently, this is not part of the SDK.

	/*
	const publicSignedPreKey: SignedPublicPreKeyType = {
	keyId: signedPreKeyId,
	publicKey: signedPreKey.keyPair.pubKey,
	signature: signedPreKey.signature,
	}

	const publicPreKey: PreKeyType = {
	keyId: preKey.keyId,
	publicKey: preKey.keyPair.pubKey,
	}

	directory.storeKeyBundle(name, {
	registrationId,
	identityPubKey: identityKeyPair.pubKey,
	signedPreKey: publicSignedPreKey,
	oneTimePreKeys: [publicPreKey],
	})
	*/
}
	const createUserIdentity = async () => 
	{
		await createID(initialUserId, userStore);
		console.log({ userStore });
	};
	
	
	const [contacts,setContacts] = useState<Map<string,Contact>>(contactMap);
	const [userStore] = useState(new SignalProtocolStore());
	const [ws,setWs] = useState<WebSocket>(initialws)
	const [chats,setChats] = useState<Map<string,Chat>>(new Map<string,Chat>(chatMap));
	console.log("New Web Socket Connection: ",ws);
	const [userid,setUserId] = useState<string>(initialUserId);
	const chatState = {chats,setChats,ws,setWs};
	const contactState = {contacts,setContacts,userid,setUserId};
	const signalState = {userStore,createUserIdentity,serverip}

	ws.onmessage = (e) => {
		let msgData = JSON.parse(e.data);
		console.log("Recieved: ", msgData);
		let chatId:string = msgData.chatId
		console.log(chatId)
		setChats((chats) =>{
			const newChats = new Map(chats);
			const thischat = newChats.get(chatId);
			if (typeof thischat != undefined){
				const tschat = thischat as Chat;
				tschat.messages.push(msgData)
				newChats.set(chatId,tschat)
			}	
			return newChats;
		})
	};
	
	
    return (
	<NavigationContainer>
		<ChatContext.Provider value={chatState}>
			<SignalContext.Provider value={signalState}>
				<ContactContext.Provider value={contactState}>
					<StackNav.Navigator>
						<StackNav.Screen 
							name="Home"
							component={MainScreenComponent} 
							options={({ route }) => ({ title: (contacts.get(userid) as Contact).username })}
						/>
						<StackNav.Screen 
							name="MainSettings"
							component={MainSettingScreenComponent}
						/>
						<StackNav.Screen 
							name="ChatScreen"
							component={ChatScreenComponent}
							options={({ route }) => ({ title: "test to see if it runs" })}
						/>
						<StackNav.Screen 
							name="ChatSettings"
							component={ChatSettingScreenComponent}
						/>
						<StackNav.Screen 
							name="NewChatScreen"
							component={NewChatScreenComponent}
						/>
						<StackNav.Screen 
							name="SettingOptions"
							component={SettingOptionsComponent}
						/>
					</StackNav.Navigator>
				</ContactContext.Provider>
			</SignalContext.Provider>
		</ChatContext.Provider>
	</NavigationContainer>
    );
}

//route.params.username




export {ChatContext};
export default App;
