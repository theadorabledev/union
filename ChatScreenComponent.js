/* A file to hold components used within the chat screen. */

import React, { useState,useEffect } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Keyboard, TextInput, StyleSheet } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';
import {GlobalStyle} from './Styles.js';
import { render } from 'react-dom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const MessageBubble = (props) => {
    return(
	<View style={[
		  ChatStyles.message,
		  props.send ? ChatStyles.send : ChatStyles.recieve
	      ]}>
	    <View
		style= {[
		    ChatStyles.cloud,
		    {backgroundColor: props.send ? GlobalStyle.highlightcolor : GlobalStyle.pinklightcolor}
		]}>
		{
		    props.text
			?
			<Text
			    style={[
				ChatStyles.text,
				{color: props.send ? 'white': 'white'}
			    ]}
			>
			    {props.text}

			</Text>
		    :
		    null
		}

	    </View>

	</View>
    )
}


const MessageBoxComponent = (props) => {
    const [textmessages,setMessages] = useState(props.messages);
    let empty = (textmessages.length == 0)
    let textComponents = textmessages.map((a, i) => {
		return <MessageBubble
			   send
			   key={i}
			   text = {a}
		       />;
    });
	
    return (
	<>
	    {empty ? 
	    <Text>No messages</Text>
	     :
	     <ScrollView>
		 {textComponents}
	     </ScrollView>
	    }
	</>
    );	
}


const ChatStyles = StyleSheet.create({
	message: {
		flexDirection: 'row',
		marginVertical: moderateScale(7,2)
	},
	send: {
		marginLeft: 20,
	},
	recieve: {
		alignSelf: 'flex-end',
		marginRight: 20
	},
	cloud: {
		maxWidth: moderateScale(250,2),
		paddingHorizontal: moderateScale(10,2),
		paddingTop: moderateScale(5,2),
		paddingBottom: moderateScale(7,2),
		borderRadius: 20
	},
	text: {
		paddingTop: 3,
		fontSize: 17,
		lineHeight: 22
	}
})

const KeyboardComponent = () => {
	const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  
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
  
	return (
		<TextInput
		  style={keyboardStyle.input}
		  placeholder='Press here…'
		  onSubmitEditing={Keyboard.dismiss}
		/>
	);
  }

const keyboardStyle = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'flex-end',
	  marginBottom: 10
	},
	input: {
	  padding: 10,
	  borderWidth: 0.5,
	  height:50,
	  borderRadius: 4
	},
	status: {
	  padding: 10,
	  textAlign: "center"
	}
});




const tempContainerStyle ={
	flex:1,
	flexDirection: "column",
}


const ChatScreenComponent = ({route, navigation}) => {
	
	const titlename = route.params.username.length > 15 ?  route.params.username.substring(0,14) + "..." : route.params.username
	const chatOptions = [
	{text:"Settings", handler:() => navigation.navigate('ChatSettings')},
	{text:"Search", handler:()=> {alert("Search conversation function")}},
	{text:"Add to friends", handler:()=> {alert("Add contact to friends list")}},
	]
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: titlename,
	    headerRight: () => (
			<View style={{
				flexDirection:'row',
				justifyContent:'space-evenly',
				alignItems: 'center',
				minWidth: 80,
			}}>
				<SettingsButton onPress={() => navigation.navigate('ChatSettings')}/>
				<ContextMenu options={chatOptions}ionicon="menu"/>
			</View>
	    ),
		headerLeft:()=>(
			<View style={{
				flexDirection:'row',
				flexWrap: "wrap",
				justifyContent:'flex-start',
				alignItems: 'center',
				minWidth: 30,
				paddingRight: 5,
			}}>
				<HeaderBackButton onPress={()=>{navigation.goBack()}}/>
				<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={GlobalStyle.defaultprofile} onPress={()=>{alert("let user change contact's picture")}}/>
			</View>
		),
	});
    }, [navigation]);
    const {username, messages} = route.params;
		return (
		<View style={tempContainerStyle}>
	    <MessageBoxComponent messages={messages}/>
		<KeyboardComponent />
		</View>
    	);

}

export default ChatScreenComponent;
