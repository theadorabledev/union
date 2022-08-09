import 'react-native-gesture-handler'; 
import React, { useState,useEffect,useContext,useCallback } from 'react';
var Buffer = require("@craftzdog/react-native-buffer").Buffer;
import { 
	View, 
	Text, 
	ScrollView, 
	Button, 
	Image,
	ImageSourcePropType,  
	TouchableOpacity, 
	TouchableHighlight, 
	AsyncStorage} 
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
import {RegisterUserComponent,ChatSettingScreenComponent} from './ChatSettingScreenComponent';
import {NewChatScreenComponent,NewGroupChatScreenComponent} from './NewChatScreenComponent';
import SettingOptionsComponent from './SettingOptionsComponent';
import * as SplashScreen from 'expo-splash-screen';
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
import { SignalProtocolStore,arrayBufferToString } from './storage-type';

//import typescript interfaces and contexts
import {
	ChatContext,
	ContactContext,
	SignalContext,
	Chat,
	Contact,
	ProcessedChatMessage,
	MessageCreator} 
from './Context';




//contact creation function
function ContactCreator(map:Map<string,Contact>,id:string,name:string,picture:ImageSourcePropType,details:string){
	map.set(id,{id,name,picture,details})
}
//chat creation function
function ChatCreator(map:Map<string,Chat>,id:string,contactids:string[],messages:ProcessedChatMessage[],name:string,picture:ImageSourcePropType,details:string){
	map.set(id,{id,contactids,messages,name,picture,details})
}
//message creation function



export async function save(key:string, value:any) {
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
const serverip = "98.14.55.86:8000"
//generate websocket connection on app start
const initialws = new WebSocket('ws://'+serverip+'/'+'loading')
//signal protocol address (currently unused)
const userAddress = new SignalProtocolAddress(initialUserId, 1);

//add user to contacts
//ContactCreator(contactMap,initialUserId,"TestUser",GlobalStyle.defaultprofile,"They/Them")

ContactCreator(contactMap,"1111","The Fool",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"1112","The Magician",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"1113","The Emperor",GlobalStyle.defaultprofile,"They/Them")
ChatCreator(chatMap,"1",["1111","1112","1113"],[],"",GlobalStyle.defaultprofile,"")
function debugData(){
//generate debug contacts
ContactCreator(contactMap,"2","The High Priestess",GlobalStyle.defaultprofile,"They/Them")
ContactCreator(contactMap,"3","The Empress",GlobalStyle.defaultprofile,"They/Them")
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


}

SplashScreen.preventAutoHideAsync();

function App() {

	function makeKeyId(){
		return Math.floor(10000 * Math.random());
	}
	//stores data to signal protool store. This is probably not the best implementation of this
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
		const view = Buffer.from(identityKeyPair.privKey);
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



	function delData(){

		chats.forEach((chat:Chat)=>{

			SecureStore.deleteItemAsync(chat.id);
		})
		SecureStore.deleteItemAsync('chatids')

		contacts.forEach((contact:Contact)=>{
			SecureStore.deleteItemAsync(contact.id);
		})
		SecureStore.deleteItemAsync('contactids')
		SecureStore.deleteItemAsync('userid');
		SecureStore.deleteItemAsync('userstore');
		console.log("Cleared Save Data");
	}

	//data states
	const [contacts,setContacts] = useState<Map<string,Contact>>(contactMap);
	const [chats,setChats] = useState<Map<string,Chat>>(new Map<string,Chat>(chatMap));
	const [userid,setUserId] = useState<string>("");
	const [processedmessages,setProcessedMessages] = useState<Map<string,ProcessedChatMessage>>(new Map<string,ProcessedChatMessage>());
	//signal storage state
	const [userStore,setUserStore] = useState(new SignalProtocolStore());
	const [ws,setWs] = useState<WebSocket>(initialws)

	//creates the user identity and saves it to the persistent data
	async function createUserIdentity():Promise<void>{ 
		console.log("This actually ran")
		await createID(userid, userStore);
		//we have to override the json function to save the array buffers in a different manner. Hopefully, they still work when loaded again
		const stringifiedstore = JSON.stringify(userStore,function(k,v){
			if (k == "pubKey" || k == "privKey"){
				const buf = Buffer.from(v);
				console.log(buf.toJSON())
				return Buffer.from(v).toJSON();
			}
			return v;
		});
		await SecureStore.setItemAsync('userstore',stringifiedstore);
		console.log(stringifiedstore);
	};

	//websocket state
	
	const [appIsReady, setAppIsReady] = useState(false);
	const [firsttimerun,setFirstTimeRun] = useState(true); 
	//organize data for context providing
	const chatState = {chats,setChats,ws,setWs,processedmessages,setProcessedMessages};
	const contactState = {contacts,setContacts,userid,setUserId,resetContactData:delData};
	const signalState = {userStore,createUserIdentity,serverip}




	//console.log("New Web Socket Connection: ",ws);
	useEffect(() => {
		async function prepare(){	
			try{
				const userid = await SecureStore.getItemAsync('userid')
				if(userid!=null && userid != ""){
					setUserId(userid);
					setFirstTimeRun(false);
				}else if(userid == ""){
					setFirstTimeRun(true);
				}
				
				else{
					setFirstTimeRun(true);
				}

				const chatidjson = await SecureStore.getItemAsync('chatids')
				if(chatidjson != null){
					const chatids:string[] = JSON.parse(chatidjson);
					//console.log('chatidsload',chatids);
					for (const chatid of chatids){
						const chatjson = await SecureStore.getItemAsync(chatid);
						//console.log('chatjson',chatjson)
						if(chatjson != null){
							setChats((chats)=>{
								const newChats = new Map(chats);
								newChats.set(chatid,JSON.parse(chatjson));
								return newChats;
							})
						}
					}
				}


				const contactidjson = await SecureStore.getItemAsync('contactids');
				if(contactidjson != null){
					const contactids:string[] = JSON.parse(contactidjson);
					//console.log('contactidsload',contactids);
					for (const contactid of contactids){
						const contactjson = await SecureStore.getItemAsync(contactid)
						if(contactjson != null){
							setContacts((contacts)=>{
								const newContacts = new Map(contacts);
								newContacts.set(contactid,JSON.parse(contactjson));
								return newContacts;
							})
						}
					}
				}

				const userstorejson = await SecureStore.getItemAsync('userstore');
				//console.log(userstorejson);
				if(userstorejson!=null){
					//console.log(userstorejson);
					const newuserstore = JSON.parse(userstorejson,(key,value)=>{
						//console.log(key,value);
						if (key == "pubKey" || key == "privKey"){
							//console.log(value);
							const arraybuf = Buffer.from(value).buffer;
							//console.log(value.data)
							return arraybuf;
						}
						return value;
					})
					//console.log(newuserstore);
					setUserStore(newuserstore);
				}
				if (userid != ""){
					setWs(new WebSocket('ws://'+serverip+'/'+userid))
				}

			}catch(e){
				console.warn(e);
			}finally{
				console.log("Finishing")
				setAppIsReady(true);
			}
		}
		prepare();
	},[])
	useEffect(()=>{
		if (appIsReady) {
			const chatids:string[] = [];
			chats.forEach((chat)=>{
				chatids.push(chat.id);
				SecureStore.setItemAsync(chat.id,JSON.stringify(chat,function(key,value){
					console.log(key,typeof key,value,typeof value);
					
					return value;
				}));
			})
		
			SecureStore.setItemAsync('chatids',JSON.stringify(chatids))
			SecureStore.getItemAsync('chatids').then((chatids)=>{
				console.log("saving chatids as",chatids);
			})
		}
	},[chats])


	useEffect(()=>{
		if (appIsReady) {
			const contactids:string[] = [];
			contacts.forEach((contact)=>{
				contactids.push(contact.id);
				SecureStore.setItemAsync(contact.id,JSON.stringify(contact));
			})
			SecureStore.setItemAsync('contactids',JSON.stringify(contactids));
			if(typeof contacts.get(userid) != "undefined")
			{
				setFirstTimeRun(false);
			}
		}
	}
	,[contacts])

	useEffect(()=>{
		if (appIsReady) {
			if(userid != ""){
				//console.log('saving the userid');
				SecureStore.setItemAsync('userid',userid);
				setWs(new WebSocket('ws://'+serverip+'/'+userid))
			}else{
				setFirstTimeRun(true);
			}
		}
	},[userid])

	//not working?
	useEffect(()=>{
		if (appIsReady) {
			//console.log('saving the userstore');
			//console.log(JSON.stringify(userStore))
			SecureStore.setItemAsync('userstore',JSON.stringify(userStore));
		}
	},[userStore])


	//resets data probably should implemet it better
	//delData();

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

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
		  if (typeof contacts.get(userid) != "undefined"){
			setFirstTimeRun(false);
		  }
		  console.log("calling hideasync")
		  await SplashScreen.hideAsync();
		}
	  }, [appIsReady]);


	if (!appIsReady) {
		return null;
	}
	//context providers allow pages to access all relevant information
    return (
	<View style={{flex:1}} onLayout={onLayoutRootView}>
	<NavigationContainer>
		<ChatContext.Provider value={chatState}>
			<SignalContext.Provider value={signalState}>
				<ContactContext.Provider value={contactState}>
					<StackNav.Navigator>
						{ (firsttimerun)?

						<><StackNav.Screen 
							name="UserRegister"
							component={RegisterUserComponent}
							/>
						</>
						:
						<>
						<StackNav.Screen 
							name="Home"
							component={MainScreenComponent} 
							options={({ route }) => ({ title: (contacts.get(userid) as Contact).name })}
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
						/>
						<StackNav.Screen 
							name="NewChatScreen"
							component={NewChatScreenComponent}
						/>

						<StackNav.Screen 
							name="NewGroupChatScreen"
							component={NewGroupChatScreenComponent}
						/>

						<StackNav.Screen 
							name="SettingOptions"
							component={SettingOptionsComponent}
						/>
						</>
						}
					</StackNav.Navigator>
				</ContactContext.Provider>
			</SignalContext.Provider>
		</ChatContext.Provider>
	</NavigationContainer>
	</View>
    );
}

//replace typescript placeholder with this once assertion problem is fixed route.params.username
export default App;
