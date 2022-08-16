/* A Screen to hold components used to display chat messages. */
import React, { useState,useEffect,useContext,useRef} from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Keyboard, TextInput, StyleSheet, Alert} from "react-native";
import NavigationBar from 'react-native-navbar';
import { render } from 'react-dom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

import Ionicons from '@expo/vector-icons/Ionicons';

import {SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';
import {ChatContext,ContactContext,MessageCreator,vote } from './Context';
import {GlobalStyle} from './Styles.js';

//poll stuff
import Modal from "react-native-modal";
import RNPoll, { IChoice } from "react-native-poll";
import RNAnimated from "react-native-animated-component";

import { FlatList } from 'react-native-gesture-handler';
import { set } from 'date-fns';





//Styles for the chats
const ChatStyles = StyleSheet.create(
	{
		message: 
		{
			flexDirection: 'row',
			marginVertical: moderateScale(7,2)
    	},
		send: 
		{
			marginLeft: 20,
		},
		recieve: 
		{
			alignSelf: 'flex-end',
			marginRight: 20
		},
		cloud: 
		{
			maxWidth: moderateScale(250,2),
			paddingHorizontal: moderateScale(10,2),
			paddingTop: moderateScale(5,2),
			paddingBottom: moderateScale(7,2),
			borderRadius: 20
		},
		text: 
		{
			paddingTop: 3,
			fontSize: 17,
			lineHeight: 22
		}
	}
)


// Message bubble which displays the text of a message
const MessageBubble = (props) => {
	const {contacts,setContacts,userid} = useContext(ContactContext)
	const previousindex = props.data.findIndex(function(currentValue){return currentValue == props.item})-1;
	let showname = true;
	if (previousindex > -1){
		if (props.item.senderId == props.data[previousindex].senderId){
			showname = false
		}
	}
	let username = contacts.get(props.item.senderId).name;
	const issend = (props.item.senderId ==userid)
	{	

    return(
		<View style=
		{[
		  ChatStyles.message,
		  issend ? ChatStyles.send : ChatStyles.recieve
		]}>
			<View style=
			{[
				ChatStyles.cloud,
				{backgroundColor: issend ? GlobalStyle.highlightcolor : GlobalStyle.pinklightcolor}
			]}>
				{
					showname
					?
						<Text style=
						{[
							ChatStyles.text,
							{color: issend ? 'white': 'white'}
						]}>
							{username}
						</Text>
					:
						null
				}

				{
					props.item.message
					?
						<Text style=
						{[
							ChatStyles.text,
							{color: issend ? 'white': 'white'}
						]}>
							{props.item.message}
						</Text>
					:
						null
				}
	    	</View>
		</View>
    )
}
}

const MessageSearchBar = (props) =>{
	if(props.barstate.barvisible){
	return (
		<View style = {keyboardStyle.outer}>
		<View style={keyboardStyle.container}> 
		  <TextInput
			autoCapitalize="none"
			autoCorrect={false}
			clearButtonMode="always"
			value={props.query}
			onChangeText={queryText => props.handleSearch(queryText)}
			placeholder="Search"
			style={keyboardStyle.input}
		  />
		  	<TouchableOpacity onPress={()=>{
				
				props.barstate.setBarVisible(false)
				props.handleSearch("");
				}}>
				<Ionicons name='close-circle' size={24} color={GlobalStyle.highlightcolor} style={keyboardStyle.icon}/>
			</TouchableOpacity>
		</View>
		</View>
	  );
	}else{
		return <View></View>
	}
}

// Container for the messages, updated with state variable, displays "No messages" if chat message array is empty.
const MessageBoxComponent = (props) => {
	const [filterdata,setFilterData] = useState([]);
	const [filtertext,setFilterText] = useState("");
	const {chats,setChats} = useContext(ChatContext)
	const {contacts,setContacts,userid} = useContext(ContactContext);


	//get value to determine if chat is currently empty
    let empty = (chats.get(props.chatId).messages.length == 0)
	//get scroll view reference to allow for autoscrolling the scrollview
	//const scrollViewRef = useRef();
	//create message bubble components

	const data = chats.get(props.chatId).messages;
	//const filterdata = data.filter((message)=>{
	//	if(message.message.toLowerCase().includes('h')){
	//		return true;
	//	}
	//})
	//setFilterData(data);
	useEffect(()=>{
		const newfilterdata = data.filter((message)=>{
			if(message.message.toLowerCase().includes(filtertext)){
				return true;
			}
		})
		setFilterData((data)=>{
			return newfilterdata;
		});
	},[filtertext])



	const renderItem = ({item}) =>(
		<MessageBubble
			send
			key={item.messageId}
			item={item}
			data={data}
		/>
		)

	//need fragment for ternary comparison
    return (
		<>
			{
				empty 
				?
					<ScrollView>
						<Text>No messages</Text>
					</ScrollView>
				:
					<FlatList
						data={filterdata}
						renderItem={renderItem}
						keyExtractor={item=>item.messageId}
						ListHeaderComponent={<MessageSearchBar handleSearch={setFilterText}query={filtertext}barstate ={props.barstate}/>}
					/>
			}
		</>
    );
}

// Styles for the keyboard
const keyboardStyle = StyleSheet.create(
	{
		outer:
		{
			flexDirection: 'row',
			margin: 5,
		},
		container:
		{
			backgroundColor: 'white',
			flexDirection: 'row',
			flex: 1,
			marginRight:10,
			padding: 10,
			borderRadius: 50,
		},
		input:{
			flex: 1,
			marginHorizontal:10,
		},
		status:
		{
			padding: 10,
			textAlign: "center"
		},
		icon:
		{
			marginHorizontal: 5,
		},
		pollTheme:
		{
			backgroundColor: '#e6f4f7',
			flexDirection: 'column',
			borderRadius: 15,
		},
		innerModal:
		{
			flex:1,
			flexDirection:'column',
			backgroundColor: '#def4faa',
			padding: 3 ,
			marginBottom: 300 ,
		},
		pollTitleTheme:
		{
			fontWeight: '500',
			textAlign: 'left',
			color: 'black',
			fontSize: 20
		},
		titleContainer:
		{
			backgroundColor: '#def4fa',
			flexDirection: 'row',
			marginRight:230,
			padding: 10,
			borderRadius: 30,
			margin: 5,
		},
		newPollTheme:
		{
			backgroundColor: '#edf5f7',
			flexDirection: 'column',
			marginRight:30,
			padding: 10,
			borderRadius: 30,
			margin: 4,
		},
	}
);

//function to fetch votes
function getVotes(){
	//fetch total votes from server
	return 12;
}
// //set vote count
// const TotalVotes = getVotes();

//function to fetch array data for poll
function getChoices(){
	//fetch data , constructing for now
	const Choices: Array<IChoice> = [
		{ id: 1, choice: "Choice 1", votes: 3 },
		{ id: 2, choice: "Choice 2", votes: 3 },
		{ id: 3, choice: "Choice 3", votes: 3 },
		{ id: 4, choice: "Choice 4", votes: 3 },
	  ];
	return Choices
}

// const Choices = getChoices();

function getPollTitle(){
	//fetch poll title from server
	return "Poll Title";
}
// const PollTitle = getPollTitle();


// Displays a keyboard which allows the user to write messages
// TODO: Connect to messaging API
const KeyboardComponent = (props) => {
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
	const {chats,setChats,ws} = useContext(ChatContext)
	const {contacts,setContacts,userid} = useContext(ContactContext)
	const [text,setText] = useState('');
	const [isModalVisible, setModalVisible] = useState(false); //modal show
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	  };
	//set voting state
	const [isVoted, setVoted] = useState(false);
	//new poll state
	const [isNewPoll,setNewPoll]= useState(false);
	//text input for polol title and choices
	const [textTitle,setTextTitle] = useState('');
	const [textChoices,setTextChoices] = useState('');
	//values for votes,title,data
	const [TotalVotes,setTotalVotes]= useState(getVotes());
	const [Choices, setChoices] = useState(getChoices());
	const [PollTitle, setPollTitle] = useState(getPollTitle());
	//auto hide/show keyboard 
    useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardStatus("Keyboard Shown");
		});
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardStatus("Keyboard Hidden");
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
    }, []);
	//sends message with use of send button
	const onPress = () => 
	{
		//console.warn("send", text);
		const trimtext = text.trim();
		console.log(trimtext)
		//create a message object corresponding to the contents of the keyboard, push it to the chat, then send it to each member of the chat that isn't the device user.
		if (trimtext != ""){
			setChats((chats) =>
			{
				const newChats = new Map(chats);
				const thischat = newChats.get(props.chatId)
				const message = MessageCreator(trimtext,userid,props.chatId)
				thischat.messages.push(message)
				thischat.contactids.forEach((currentValue, index, arr)=>
				{
					if (arr[index]!=userid)
					{
						message.recieverId=arr[index]
						try{
						ws.send(JSON.stringify(message))
						}catch(e){
							console.log(e);
						}
					}
				})
				newChats.set(props.chatId,thischat)
				return newChats;
			})
		}
		Keyboard.dismiss();
		setText("");
	}
	
	
	//format string input to data array
	const onPressChoices = () => {
		let choicesTemp: Array<IChoice> =[];
		let optionsArr:Array<String> = textChoices.split(",");
		optionsArr.forEach(formatHelper);
		createPoll(textTitle, choicesTemp);
		setTextChoices("");
		setTextTitle("");
		Keyboard.dismiss();
		//helper function for formatting
		function formatHelper(index, value:String, array){
			choicesTemp.push({ id: value, choice: index, votes: 0 });
		}
	}
	//function to take text data and format it into title and options
	function createPoll(pollTitle:String, choicesTemp: Array<IChoice>){
		//upload data to server
		//sends title, data array, and total votes set to 0
		//for now will directly change for testing
		setTotalVotes(0);
		setPollTitle(pollTitle);
		setChoices(choicesTemp);
		setVoted(false);
		setModalVisible(false);
		setNewPoll(false);
	}
	

    return (
		<View style ={keyboardStyle.outer}>
			<Button title="P" onPress={toggleModal} style={keyboardStyle.icon} />
			<Modal
				isVisible={isModalVisible} 
				backdropColor={"pink"} 
				backdropOpacity={.7}
				onBackdropPress={() => setModalVisible(false)}
				style= {keyboardStyle.innerModal}
				//onModalWillShow = {function} on show will construct the poll with text data
			>
        		<View style ={keyboardStyle.titleContainer}>
					<Text style = {keyboardStyle.pollTitleTheme}> {PollTitle} </Text>
				</View>
				<View style ={keyboardStyle.pollTheme}>
					<RNPoll
						totalVotes={TotalVotes}
						choices={Choices}
						hasBeenVoted = {isVoted}
						onChoicePress={(selectedChoice: IChoice) =>{
							setTotalVotes(TotalVotes + 1);
							console.log("SelectedChoice: ", selectedChoice)
							setVoted(true)
						}
						}
						appearFrom="bottom"
  						animationDuration={750}
						PollContainer={RNAnimated}
						PollItemContainer={RNAnimated}
					/>
				</View>
					
					 <Button title="Hide Poll" onPress={toggleModal} />
					 <Button title="New Poll" onPress={() => setNewPoll(!isNewPoll)} />
					 {isNewPoll && 
					 <View> 
						<View style ={keyboardStyle.newPollTheme}>
							<TextInput
							placeholder='Poll Title...'
							onChangeText={newText=>setTextTitle(newText)}
							value={textTitle}
							//onSubmitEditing = {onPressTitle}
							/>
						</View>
						<View style ={keyboardStyle.newPollTheme}>
						<TextInput
							placeholder='Options seperated by commas'
							onChangeText={newText=>setTextChoices(newText)}
							value={textChoices}
							onSubmitEditing = {onPressChoices}
						/>
						</View>
					</View> }
			</Modal>

			<View style={keyboardStyle.container}> 
			<TextInput
				style={keyboardStyle.input}
				placeholder='Press here…'
				onChangeText={newText=>setText(newText)}
				value={text}
				multiline
			/>
			<TouchableOpacity onPress={onPress}>
				<Ionicons name='paper-plane' size={24} color={GlobalStyle.highlightcolor} style={keyboardStyle.icon}/>
			</TouchableOpacity>

			</View>
		</View>
    );
}

// Displays the Chat Screen between two users
const ChatScreenComponent = ({route, navigation}) => {

    const titlename = route.params.username.length > 14 ?  route.params.username.substring(0,13) + "..." : route.params.username
	const [barvisible,setBarVisible] = useState(false);
    const chatOptions = [
	{text:"Settings", handler:() => {settingsNavigate()}},
	{text:"Search", handler:()=> {setBarVisible(true)}},
	{text:"Add to friends", handler:()=> {alert("Add contact to friends list")}},
    ]
	const {chatId,chatpic,settingsNavigate} = route.params;
    React.useLayoutEffect(() => {
		navigation.setOptions({
			title: titlename,
			headerRight: () => (
				// Settings Button
				<View style={{
					flexDirection:'row',
					justifyContent:'space-evenly',
					alignItems: 'center',
					minWidth: 80,
				}}>
					<SettingsButton onPress={settingsNavigate}/>
					<ContextMenu options={chatOptions}ionicon="menu"/>
				</View>
			),
			headerLeft:()=>(
				// Back Button
				<View style={{
					flexDirection:'row',
					flexWrap: "wrap",
					justifyContent:'flex-start',
					alignItems: 'center',
					minWidth: 30,
					paddingRight: 5,
				}}>
					<HeaderBackButton onPress={()=>{navigation.goBack()}}/>
					<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={chatpic} onPress={()=>{settingsNavigate}}/>
				</View>
			),
		});
    }, [navigation]);
    return (
		<View style={{flex:1,flexDirection: "column"}}>
			<MessageBoxComponent chatId={chatId} barstate={{barvisible,setBarVisible}}/>
			<KeyboardComponent chatId={chatId}/>
		</View>
    );
}

export default ChatScreenComponent;
