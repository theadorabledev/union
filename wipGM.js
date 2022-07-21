// pre-commit work

// Giuliani Martinez

// NewChatButtonComponent
// Big round + sign to start a new chat with a contact in your list
// Floating at bottom right, click to create alert

//chat bubble
<>
	//chat bubble
	<View style={{
		backgroundColor: "#FF60C5",
		padding: 10,
		marginLeft: '45%',
		borderRadius: 5,
		//marginBottom: 15,
		marginTop: 5,
		marginRight: "5%",
		maxWidth: '50%',
		alignSelf: 'flex-end',
		//maxWidth: 500,
		borderRadius: 20,
	}} key={index}>


		<Text style={{ fontSize: 16, color: "#fff", }} key={index}>{item.text}</Text>

		<View style={styles.rightArrow}></View>

		<View style={styles.rightArrowOverlap}></View>



	</View>


	//Recevied Message
	<View style={{
		backgroundColor: "#dedede",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginLeft: "5%",
		maxWidth: '50%',
		alignSelf: 'flex-start',
		//maxWidth: 500,
		//padding: 14,
		//alignItems:"center",
		borderRadius: 20,
	}} key={index}>



		<Text style={{ fontSize: 16, color: "#000", justifyContent: "center" }} key={index}> {item.text}</Text>
		<View style={styles.leftArrow}>

		</View>
		<View style={styles.leftArrowOverlap}></View>



	</View></>

const styles = StyleSheet.create({
	rightArrow: {
	  position: "absolute",
	  backgroundColor: "#0078fe",
	  //backgroundColor:"red",
	  width: 20,
	  height: 25,
	  bottom: 0,
	  borderBottomLeftRadius: 25,
	  right: -10
	},
	
	rightArrowOverlap: {
	  position: "absolute",
	  backgroundColor: "#eeeeee",
	  //backgroundColor:"green",
	  width: 20,
	  height: 35,
	  bottom: -6,
	  borderBottomLeftRadius: 18,
	  right: -20
	
	},
	
	/*Arrow head for recevied messages*/
	leftArrow: {
		position: "absolute",
		backgroundColor: "#dedede",
		//backgroundColor:"red",
		width: 20,
		height: 25,
		bottom: 0,
		borderBottomRightRadius: 25,
		left: -10
	},
	
	leftArrowOverlap: {
		position: "absolute",
		backgroundColor: "#eeeeee",
		//backgroundColor:"green",
		width: 20,
		height: 35,
		bottom: -6,
		borderBottomRightRadius: 18,
		left: -20
	
	},
	})

	<FlatList
        //inverted
        style={{backgroundColor:"#eeeeee"}}
        data={this.state.chat_log}
        ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
      
        
        renderItem = {({item,index})=>{

          rowId={index}
         
            if (SENT_MESSAGE) { //change as per your code logic

          
              
                return (
    
                  <View style={{
                    backgroundColor: "#0078fe",
                    padding:10,
                    marginLeft: '45%',
                    borderRadius: 5,
                   
                    marginTop: 5,
                    marginRight: "5%",
                    maxWidth: '50%',
                    alignSelf: 'flex-end',
                    borderRadius: 20,
                  }} key={index}>
  
                    
                    <Text style={{ fontSize: 16, color: "#fff", }} key={index}> {item.text}</Text>
  
                      <View style={styles.rightArrow}>
  
                      </View>
                      <View style={styles.rightArrowOverlap}></View>
                    
                    
                    
                  </View>
                )

              
              
              
            } else {

              
                return (
                  <View style={{
                    backgroundColor: "#dedede",
                    padding:10,
                    borderRadius: 5,
                    marginTop: 5,
                    marginLeft: "5%",
                    maxWidth: '50%',
                    alignSelf: 'flex-start',
                    //maxWidth: 500,
                    //padding: 14,
                    
                    //alignItems:"center",
                    borderRadius: 20,
                  }} key={index}>
  
                    
                      
                      <Text style={{ fontSize: 16, color: "#000",justifyContent:"center" }} key={index}> {item.text}</Text>
                      <View style={styles.leftArrow}>
  
                      </View>
                      <View style={styles.leftArrowOverlap}></View>
                    
                    
                    
                  </View>
                )
              
              
            }
            
          

        }
        
        keyExtractor={(item,index)=>index.toString()}
        />


		const MessageBubble = (props) => {
			_onLongPressButton() {
				alert('React or Reply')
			  }
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
					<TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
          			<View style={styles.button}>
         		 	</View>
        			</TouchableHighlight>
				{	
					props.showname
					?
						<Text
							style={[
							ChatStyles.text,
							{color: props.send ? 'white': 'white'}
							]}
						>
							{props.name}
		
						</Text>
					:
					null
				}{
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
			renderSend;
		}


		function renderSend(props) {
			return (
			  <Send {...props}>
				<View style={styles.sendingContainer}>
				  <IconButton icon='send-circle' size={32} color='#6646ee' />
				</View>
			  </Send>
			);
		  }

		  const styles = StyleSheet.create({
			sendingContainer: {
			  justifyContent: 'center',
			  alignItems: 'center'
			}
		  });

