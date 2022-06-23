import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from "react-native";
import NavigationBar from 'react-native-navbar';

const styles = {
    container: {
	flex: 1,
	paddingTop: 32,
	padding: 2,
	borderRadius: 32,
    },
    chatComp: {
	borderWidth: 1,
	maxHeight: 64,
	padding: 4,
    },
    miniChat: {
	flexDirection: 'row',
	justifyContent: 'space-around',
	color: "red"
	
    },
    userName: {
	fontWeight: 'bold',
	fontSize: 16,
	paddingBottom: 4,
  },

};


const rightButtonConfig = {
    title: '(Settings)',
    handler: () => alert('hello!'),
};
const leftButtonConfig = {
    title: '(User)',
    handler: () => alert('world!'),
};

const titleConfig = {
    title: 'UNI/ON',
};

function ChatComponent(props){
    return (
	<View style={styles.chatComp}>
	    <Text>(Chat Image)</Text>
	    <View style={styles.miniChat}>
		<Text style={styles.userName}>{props.username}</Text>
		<Text>{props.message}</Text>
	    </View>
	</View>
    );
};

function MainScreenNavBarComponent(){
    return (
	    <NavigationBar
                    title={titleConfig}
                    rightButton={rightButtonConfig}
                    leftButton={leftButtonConfig}
	            containerStyle={styles.navBar}
	            tintColor="silver" />
    );
}

function MessagesListComponent(props){
    const [messages] = useState([
	{username:"Luca", message:"Test Message 1. Lorem Ipsum"},
	{username:"Theadora", message:"Test Message 2. Lorem Ipsum"},
	{username:"Giuliani", message:"Test Message 3. Lorem Ipsum"},
	{username:"Parva", message:"Test Message 4. Lorem Ipsum"}]);
    let messageComponents = messages.map((a, i) => {
	return <ChatComponent
		   username={a.username}
		   message={a.message}
	       />;
    });
    return (
	<ScrollView>
	    {messageComponents}
	</ScrollView>
    );
}


function MainScreenComponent(props){
    return (
	    <View style={styles.container}>
	        <MainScreenNavBarComponent/>
		<MessagesListComponent/>
	    </View>
    );
}

export default function App() {
  return (
    <MainScreenComponent />
  );
}
