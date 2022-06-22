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
	flexDirection: 'row',
	justifyContent: 'space-between',
	borderWidth: 1,
	maxHeight: 64,
	
    }

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

function ChatComponent(){
    return (
	    <View style={styles.chatComp}>
	    <Text>(Chat Image)</Text>
	    <Text>Most Recent Sender: Some Text. More text. Wow someones speaking a lot. Lorem Ipsum</Text>
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
	    <ChatComponent/>
	    <ChatComponent/>
	    <ChatComponent/>
	    </View>
    );
}


export default function App() {
  return (
    <ComponentWithNavigationBar />
  );
}
