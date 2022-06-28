// pre-commit work

// Giuliani Martinez

// NewChatButtonComponent
// Big round + sign to start a new chat with a contact in your list
// Floating at bottom right, click to create alert

userProfileButton: {
	width: userProfileSize, 
	height:userProfileSize, 
	borderRadius: userProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
    }

const NewChatButton = () => {
    return(
	<TouchableOpacity style = {styles.userProfileButton} onPress={()=>{alert("Take user to contact list")}} >
	    <Ionicons name='add-circle' size={40} color={highlightcolor}/>
	</TouchableOpacity>
    );
}

// to-dos:
// connect to contacts list
// visual fix
// style check
