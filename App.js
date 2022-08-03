"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ChatContext = void 0;
require("react-native-gesture-handler");
var react_1 = require("react");
var MainScreenComponent_1 = require("./MainScreenComponent");
var MainSettingScreenComponent_1 = require("./MainSettingScreenComponent");
var ChatScreenComponent_1 = require("./ChatScreenComponent");
var ChatSettingScreenComponent_1 = require("./ChatSettingScreenComponent");
var NewChatScreenComponent_1 = require("./NewChatScreenComponent");
var SettingOptionsComponent_1 = require("./SettingOptionsComponent");
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_native_uuid_1 = require("react-native-uuid");
var StackNav = (0, native_stack_1.createNativeStackNavigator)();
var libsignal_protocol_typescript_1 = require("@privacyresearch/libsignal-protocol-typescript");
var Context_js_1 = require("./Context.js");
exports.ChatContext = Context_js_1.ChatContext;
function ReturnChat(chats, id) {
    var myChatData = chats.findIndex(function (chat) {
        return chat.chatId === id;
    });
    return myChatData;
}
//setChats((chats) =>{
//	const newChats = [...chats]
//	newChats[props.chatIndex].messages.push(addMessage(text))
//	return newChats
//})
function ContactCreator(map, id, username, profilepic, prounouns) {
    map.set(id, { id: id, username: username, profilepic: profilepic, prounouns: prounouns });
}
function TestChatCreator(map, id, contactids, messages, chatname, chatpic, description) {
    map.set(id, { id: id, contactids: contactids, messages: messages, chatname: chatname, chatpic: chatpic, description: description });
}
function MessageCreator(message, senderid, chatId) {
    return {
        messageId: react_native_uuid_1["default"].v4(),
        message: message,
        senderId: senderid,
        chatId: chatId,
        recieverId: "",
        date: new Date(),
        delivered: true
    };
}
var createID = function (name, store) { return __awaiter(void 0, void 0, void 0, function () {
    var registrationId, identityKeyPair, baseKeyId, preKey, signedPreKeyId, signedPreKey, publicSignedPreKey, publicPreKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                registrationId = libsignal_protocol_typescript_1.KeyHelper.generateRegistrationId();
                storeSomewhereSafe("registrationID", registrationId);
                return [4 /*yield*/, libsignal_protocol_typescript_1.KeyHelper.generateIdentityKeyPair()];
            case 1:
                identityKeyPair = _a.sent();
                storeSomewhereSafe('identityKey', identityKeyPair);
                baseKeyId = makeKeyId();
                return [4 /*yield*/, libsignal_protocol_typescript_1.KeyHelper.generatePreKey(baseKeyId)];
            case 2:
                preKey = _a.sent();
                store.storePreKey("".concat(baseKeyId), preKey.keyPair);
                signedPreKeyId = makeKeyId();
                return [4 /*yield*/, libsignal_protocol_typescript_1.KeyHelper.generateSignedPreKey(identityKeyPair, signedPreKeyId)];
            case 3:
                signedPreKey = _a.sent();
                store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);
                publicSignedPreKey = {
                    keyId: signedPreKeyId,
                    publicKey: signedPreKey.keyPair.pubKey,
                    signature: signedPreKey.signature
                };
                publicPreKey = {
                    keyId: preKey.keyId,
                    publicKey: preKey.keyPair.pubKey
                };
                directory.storeKeyBundle(name, {
                    registrationId: registrationId,
                    identityPubKey: identityKeyPair.pubKey,
                    signedPreKey: publicSignedPreKey,
                    oneTimePreKeys: [publicPreKey]
                });
                return [2 /*return*/];
        }
    });
}); };
var contactMap = new Map();
var chatMap = new Map();
var initialUserId = "47769a91-2d07-4580-8828-5913cf821623";
var altId = "1d4070bf-7ada-46bd-8b7c-c8b8e0507dec";
ContactCreator(contactMap, initialUserId, "TestUser", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, altId, "The Fool", require('./assets/profilepicsquaresmall.png'), "They/Them");
ContactCreator(contactMap, "1", "The Magician", require('./assets/profilepicsquaresmall.png'), "They/Them");
ContactCreator(contactMap, "2", "The High Priestess", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "3", "The Empress", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "4", "The Emperor", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "5", "The Hierophant", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "6", "The Lovers", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "7", "The Chariot", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "8", "Strength", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "9", "The Hermit", './assets/profilepicsquaresmall.png', "They/Them");
ContactCreator(contactMap, "10", "The Wheel of Fortune", './assets/profilepicsquaresmall.png', "They/Them");
TestChatCreator(chatMap, "0", [initialUserId, altId], [
    MessageCreator("Test Message 0. Lorem Ipsum", altId, "0"),
    MessageCreator("Test Message 1. Lorem Ipsum", "47769a91-2d07-4580-8828-5913cf821623", "TestUser", "0"),
    MessageCreator("Test Message 0. Lorem Ipsum", altId, "0"),
    MessageCreator("Test Message 2. Lorem Ipsum", "47769a91-2d07-4580-8828-5913cf821623", "TestUser", "0"),
    MessageCreator("Test Message 0. Lorem Ipsum", altId, "0"),
    MessageCreator("Test Message 0. Lorem Ipsum", altId, "0"),
    MessageCreator("Test Message 3. Lorem Ipsum", "47769a91-2d07-4580-8828-5913cf821623", "TestUser", "0"),
    MessageCreator("Test Message 0. Lorem Ipsum", altId, "0"),
], "", require('./assets/profilepicsquaresmall.png'), "");
TestChatCreator(chatMap, "1", [1, 4], [
    MessageCreator("Test Message 0. Lorem Ipsum", "1", "1"),
    MessageCreator("Test Message 1. Lorem Ipsum", "4", "1"),
    MessageCreator("Test Message 2. Lorem Ipsum", "47769a91-2d07-4580-8828-5913cf821623", "TestUser", "1"),
], "Test Group chat", require('./assets/profilepicsquaresmall.png'), "A test Chat");
var initialws = new WebSocket('ws://192.168.1.4:8000/' + initialUserId);
function App() {
    console.log("New Web Socket Connection: ", ws);
    var _a = (0, react_1.useState)(contactMap), contacts = _a[0], setContacts = _a[1];
    var _b = (0, react_1.useState)(initialws), ws = _b[0], setWs = _b[1];
    var _c = (0, react_1.useState)(new Map(chatMap)), chats = _c[0], setChats = _c[1];
    var _d = (0, react_1.useState)(initialUserId), userid = _d[0], setUserId = _d[1];
    var chatState = { chats: chats, setChats: setChats, ws: ws, setWs: setWs };
    var contactState = { contacts: contacts, setContacts: setContacts, userid: userid, setUserId: setUserId };
    ws.onmessage = function (e) {
        var msgData = JSON.parse(e.data);
        console.log("Recieved: ", msgData);
        var chatId = msgData.chatId;
        console.log(chatId);
        setChats(function (chats) {
            var newChats = new Map(chats);
            var thischat = newChats.get(chatId);
            thischat.messages.push(msgData);
            newChats.set(chatId, thischat);
            return newChats;
        });
    };
    return (<native_1.NavigationContainer>
		<Context_js_1.ChatContext.Provider value={chatState}>
				<Context_js_1.ContactContext.Provider value={contactState}>
					<StackNav.Navigator>
						<StackNav.Screen name="Home" component={MainScreenComponent_1["default"]}/>
						<StackNav.Screen name="MainSettings" component={MainSettingScreenComponent_1["default"]}/>
						<StackNav.Screen name="ChatScreen" component={ChatScreenComponent_1["default"]} options={function (_a) {
        var route = _a.route;
        return ({ title: route.params.username });
    }}/>
						<StackNav.Screen name="ChatSettings" component={ChatSettingScreenComponent_1["default"]}/>
						<StackNav.Screen name="NewChatScreen" component={NewChatScreenComponent_1["default"]}/>
						<StackNav.Screen name="SettingOptions" component={SettingOptionsComponent_1["default"]}/>
					</StackNav.Navigator>
				</Context_js_1.ContactContext.Provider>
		</Context_js_1.ChatContext.Provider>
	</native_1.NavigationContainer>);
}
exports["default"] = App;
