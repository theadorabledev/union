import 'react-native-gesture-handler'; 
import React, { useState } from 'react';
import { 
	View, 
	Text, 
	ScrollView, 
	Button, 
	Image,
	ImageSourcePropType,  
	TouchableOpacity, 
	TouchableHighlight } 
from "react-native";
//used for  id generation
import uuid from 'react-native-uuid';
//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { withNavigation } from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
//import components to include in the navigation pages
import MainScreenComponent from './MainScreenComponent';
import MainSettingScreenComponent from './MainSettingScreenComponent';
import ChatScreenComponent from './ChatScreenComponent';
import ChatSettingScreenComponent from './ChatSettingScreenComponent';
import NewChatScreenComponent from './NewChatScreenComponent';
import SettingOptionsComponent from './SettingOptionsComponent';
//import global style
import {GlobalStyle} from './Styles.js';

//import signal components
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

//import typescript interfaces and contexts
import {
	ChatContext,
	ContactContext,
	SignalContext,
	Chat,
	Contact,
	ProcessedChatMessage} 
from './Context';




//contact creation function
function ContactCreator(map:Map<string,Contact>,id:string,username:string,profilepic:ImageSourcePropType,pronouns:string){
	map.set(id,{id,username,profilepic,pronouns})
}
//chat creation function
function ChatCreator(map:Map<string,Chat>,id:string,contactids:string[],messages:ProcessedChatMessage[],chatname:string,chatpic:ImageSourcePropType,description:string){
	map.set(id,{id,contactids,messages,chatname,chatpic,description})
}
//message creation function
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


async function save(key:string, value:any) {
	await SecureStore.setItemAsync(key, value);
}
  
async function getValueFor(key:string) {
	const result = await SecureStore.getItemAsync(key);
	if (result) {
		console.log("Here's your value \n" , result);
		return result;
	}else{
		//console.log("ayy no value");
		return undefined;
	}
  }

async function removeValue(key:string){
	await SecureStore.deleteItemAsync(key);
}


//create stack navigator
const StackNav = createNativeStackNavigator();
//create maps for contact & chat storage
const contactMap = new Map<string,Contact>();
const chatMap = new Map<string,Chat>();
//this should be generated randomly at first run 
const initialUserId = "47769a91-2d07-4580-8828-5913cf821623";
//debug id for testing purposes
const altId = "1d4070bf-7ada-46bd-8b7c-c8b8e0507dec"
//please don't doxx me.
const serverip = "68.198.220.163:8000"
//generate websocket connection on app start
const initialws = new WebSocket('ws://'+serverip+'/'+initialUserId)
//signal protocol address (currently unused)
const userAddress = new SignalProtocolAddress(initialUserId, 1);

//add user to contacts
ContactCreator(contactMap,initialUserId,"TestUser",GlobalStyle.defaultprofile,"They/Them")

//generate debug contacts
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

//generate debug chats
ChatCreator(chatMap,"0",[initialUserId,altId],[
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 1. Lorem Ipsum",initialUserId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 2. Lorem Ipsum",initialUserId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
		MessageCreator("Test Message 3. Lorem Ipsum",initialUserId,"0"),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,"0"),
	],"",GlobalStyle.defaultprofile,"")
ChatCreator(chatMap,"1",[initialUserId,"1","4"], [
		MessageCreator("Test Message 0. Lorem Ipsum","1","1"),
		MessageCreator("Test Message 1. Lorem Ipsum","4","1"),
		MessageCreator("Test Message 2. Lorem Ipsum",initialUserId,"1"),
	],"Test Group chat", GlobalStyle.defaultprofile,"A test Chat")


	
function App() {
	//save('test', '321');
	//getValueFor('test');
//generate id for signal
function makeKeyId(){
	return Math.floor(10000 * Math.random());
}
//placeholder function for signal storage
const storeSomewhereSafe = (store: SignalProtocolStore) => 
	(key: string, value: any) => {store.put(key, value)};
	// storage.set(key, value)
	
//signal id creation function
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

	/*
	Everything here needs to be reimplemented when signal server is ready


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
	//save('firsttimerun', false);
}
//call id creation function
const createUserIdentity = async () => 
{
	await createID(initialUserId, userStore);
	//console.log({ userStore });
};
	//data states
	const [contacts,setContacts] = useState<Map<string,Contact>>(contactMap);
	const [chats,setChats] = useState<Map<string,Chat>>(new Map<string,Chat>(chatMap));
	const [userid,setUserId] = useState<string>(initialUserId);
	//signal storage state
	const [userStore] = useState(new SignalProtocolStore());
	//websocket state
	const [ws,setWs] = useState<WebSocket>(initialws)
	
	//organize data for context providing
	const chatState = {chats,setChats,ws,setWs};
	const contactState = {contacts,setContacts,userid,setUserId};
	const signalState = {userStore,createUserIdentity,serverip}
	//console.log("New Web Socket Connection: ",ws);

	//on recieve message from server
	ws.onmessage = (e) => {
		//parse json string
		let msgData = JSON.parse(e.data);
		console.log("Recieved: ", msgData);
		//get chatid
		let chatId:string = msgData.chatId
		console.log(chatId)
		//push message to chat map & update state
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

	//context providers allow pages to access all relevant information
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
							options={({ route }) => ({ title: "Typescript placeholder" })}
						/>
						<StackNav.Screen 
							name="ChatSettings"
							component={ChatSettingScreenComponent}
							initialParams={{ id:userid,ischat:false,forceupdate:true}}
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

//replace typescript placeholder with this once assertion problem is fixed route.params.username
export default App;
