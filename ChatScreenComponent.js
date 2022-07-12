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



const MessageBoxComponent = (props) => {
    const [textmessages,setMessages] = useState([props.messages]);
    let empty = (textmessages.length == 0)
    let textComponents = textmessages.map((a, i) => {
		return <Text key={i}>{a}</Text>;
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

class MessageBubble extends React.Component{
	render(){
		return(
			<View style={[
				ChatStyles.message,
				this.props.send ? CHatStyles.send : ChatStyles.recieve
			]}>
				<View
				style= {[
					ChatStyles.cloud,
					{
						backgroundColor: this.props.send ? '#dddddd' : '#007aff'
					}
				]}>
					{
						this.props.text
						?
						<Text
							style={[
								ChatStyles.text,
								{
									color: this.props.send ? 'black': 'white'
								}
							]}
						>
							{this.props.text}

						</Text>
						:
						null
					}

				</View>

			</View>
		)
	}
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

const keyboardComponent = () => {
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
	  <View style={keyboardStyle.container}>
		<TextInput
		  style={keyboardStyle.input}
		  placeholder='Click here…'
		  onSubmitEditing={Keyboard.dismiss}
		/>
		<Text style={keyboardStyle.status}>{keyboardStatus}</Text>
	  </View>
	);
  }

const keyboardStyle = StyleSheet.create({
	container: {
	  flex: 1,
	  padding: 36,
	  justifyContent: 'flex-end',
	  marginBottom: 10
	},
	input: {
	  padding: 10,
	  borderWidth: 0.5,
	  borderRadius: 4
	},
	status: {
	  padding: 10,
	  textAlign: "center"
	}
});

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
				justifyContent:'space-between',
				alignItems: 'center',
				minWidth: 80,
			}}>
				<SettingsButton onPress={() => navigation.navigate('ChatSettings')}/>
				<PhoneButton username={route.params.username}/>
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
			// render(){
			// 	return(
			// 		<>
			// 		<SafeAreaView>
			// 			<MessageBubble
			// 				send
			// 				text = "Hi!"
			// 			/>
			// 		</SafeAreaView>
			// 		</>
			// 	)
			// };
		return (
		<View>
	    <MessageBoxComponent messages={messages}/>
		</View>
    	);

}

export default ChatScreenComponent;
