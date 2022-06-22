import { View, Text } from "react-native";
import NavigationBar from 'react-native-navbar';

const styles = {
    container: {
	flex: 1,
	paddingTop: 32,
	padding: 2,
	borderRadius: 32,
    },
    chatComp: {
	flex: 1,
	flexDirection: 'column',
	justifyContent: 'space-between',
	borderWidth: 1,
	maxHeight: 64,
	padding: 4,
    },
	miniChat: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
	maxHeight: 64,
	paddingLeft: 2,
    }
	,userName: {
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
	<View style={styles.chatComp}w>
		<Text style={styles.userName}>{props.username}</Text>
	    <View style = {styles.miniChat}>
			<Text>{props.message}</Text>
			<Text>(Chat Image)</Text>
	    </View>
	</View>
    );
};


function ComponentWithNavigationBar() {
    return (
	    <View style={styles.container}>
	        <NavigationBar
                    title={titleConfig}
                    rightButton={rightButtonConfig}
                    leftButton={leftButtonConfig}
	            containerStyle={styles.navBar}
	            tintColor="silver"
	    />
	    <ChatComponent message="test1" username="Luca"/>
	    <ChatComponent message="test2" username="Theadora"/>
	    <ChatComponent message="test3" username="Giuliani"/>
		<ChatComponent message="test3" username="Parva"/>
	    </View>
    );
}


export default function App() {
  return (
    <ComponentWithNavigationBar />
  );
}
