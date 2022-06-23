# Project Outline
## Next Steps: June 22
### [ ] TemplateScreenComponent
#### [ ] NavBarComponent (Thea)
- [ ] Make extendable
  - pass components as arguments to standard positions (far left/right, left/right, center) 
  - ie left=UserIconComponent
#### [ ] BodyComponent (Thea)
- [ ] Just a place to put the app body for a particular page
### [ ] MainScreenComponent
#### [ ] MainScreenNavBarComponent (Luca)
- [ ] Contain username in Center
- [ ] User picture on left
  - Click to change
- [ ] User settings on right (gear icon)
  - For now, do nothing, 
- [ ] Styling
#### [ ] ChatComponent (Luca)
- [ ] Contains contact picture of other chat user on left
  - For now, default image until we have real ones set up
- [ ] Contains username in bold above the last message
  - Last message a state variable and updatable
- [ ] Click to open chat screen.
  - For now just alert, until chat screen component created
- [ ] Styling
#### [ ] MessagesListComponent (Luca)
- [ ] Show all active chats as ChatComponents. 
- [ ] Takes up most of page
- [ ] Background says try contacting someone on first load
- [ ] Styling
#### [ ] NewChatButtonComponent (Giulani)
- [ ] Big round + sign to start a new chat with a contact in your list
- [ ] Floating at bottom right, click to create alert
#### [ ] ContactsService (Thea)
- [ ] Read local contacts
- [ ] Store contacts within the app itself. 
  - For now just store username and phone number and image.
  - Create a few dummies
### [ ] ChatService (Thea)
- [ ] Maintains it's side of the web socket between the two phones
  - SMS Socket?
- [ ] Integrate signal-encryption protocol
- [ ] Recieve function:
  - [ ] Write message locally
  - [ ] Update Relevant ChatComponent
	- [ ] Create MessageComponent marked unread 
- [ ] Send function:
  - [ ] Write message locally
  - [ ] pass text to send to relevant chat service
#### Styling (Parva)
- [ ] Style all the components for the app so far
### [ ] ChatScreenComponent
#### [ ] NavBarComponent
- [ ] Back button on far left, takes you to main screen
- [ ] User picture on left
- [ ] contact's username in middle, 
- [ ] phone icon on right
- [ ] Hamburger icon on far right
  - [ ] Dropdown to list of setting
	- Just a list of random alert buttons for now
- [ ] Styling (this is a rough draft, we need it pretty so we'll have to tweak it alot)

#### [ ] MessageComponent
- [ ] Bubble surrounding message text, 
- [ ] Has state of type {unread, read}
- [ ] Eventually we add emojis and reactions
- [ ] Can be replied to/a reply to
  - [ ] If a reply, display link to original post

#### [ ] MessagesBoxComponent
- [ ] Comprises most of screen, shows messages within the chat. 
  - Most recent messages loaded, more called when scrolling

#### [ ] MessageWritingComponent
- [ ] Textbox to enter messages
- [ ] Send button 
- [ ] On send:
  - [ ] Send text via Chat Service
  - [ ] create MessageComponent and add to chat with status unread

## Next Steps: Some Future Date
### Flesh out Settings Components
- [ ] We'll think of some good ones to add
### Group Messaging
- Build all services to have multiple connections from the beginning?
- [ ] Update messaging service and chats service to handle multiple people
### Group Poll Component
- [ ] Special type of message
- [ ] parent class for the following:
#### Consensus Poll
- [ ] Proposal announced
- [ ] People can vote to support or object, encouraged to explain why
- [ ] Can be edited, must reflect group consensus, ie general trend of all votes and reasons
  - [ ] Edit history is visible and edits can be reverted

  



