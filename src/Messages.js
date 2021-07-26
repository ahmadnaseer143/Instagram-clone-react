import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./messages.css";
import {BsSearch} from "react-icons/bs";
import {FiSend} from 'react-icons/fi';
import {db} from "./firebase";
import firebase from "firebase";
const Messages = ({user}) => {
    console.log(user,"Hello");
    const [messageWindow, setMessageWindow] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    // const [messageRecieved, setMessageRecieved] = useState([{user:"Nas",text:"Hello"},{user:"Nas",text:"how are you sexy?"}]);
    // const [messageSent, setMessageSent] = useState([{user:"Bandi",text:"Hello brotha"},{user:"Bandibandi",text:"with a brother like you, i am always fine"},{user:"Bandi",text:"how are you brotha?"}]);


    useEffect(()=>{

        db.collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot =>{
          setMessages(snapshot.docs.map(doc=>({
            id:doc.id,
            message: doc.data()
          })
          )); 
        })
      },[])
    



    const showMessageWindow=()=>{
        setMessageWindow(true);
    }

    const handleSend=(e)=>{
        e.preventDefault();
        // setMessages([...messages, {user: userName, text: newMessage}]);
        db.collection("messages").add({
            text: newMessage,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setNewMessage("");

    }

    return (
        <div className="messages-container">
            <div className="messages-users">
                <div className="messages-username">
                    <h2>{user}</h2>
                </div>
                <div className="messages-searchbar">
                    <BsSearch className="messages-searchbar-icon"/>
                    <input type="text" placeholder="Search" />
                </div>
                <div onClick={showMessageWindow} className="messages-user">
                <Avatar className="messages-avatar"  style={{ height: '50px', width: '50px' }}  alt="username" src="https://pbs.twimg.com/profile_images/1327313310547664896/WXDzuC4P_400x400.jpg">
                </Avatar>
                <h3>{user}</h3>
                </div>
                {/* <div onClick={showMessageWindow} className="messages-user">
                <Avatar className="messages-avatar"  style={{ height: '50px', width: '50px' }} alt="username" src="https://pbs.twimg.com/profile_images/1327313310547664896/WXDzuC4P_400x400.jpg">
                </Avatar>
                <h3>username</h3>
                </div>
                <div onClick={showMessageWindow} className="messages-user">
                <Avatar className="messages-avatar"  style={{ height: '50px', width: '50px' }}  alt="username" src="https://pbs.twimg.com/profile_images/1327313310547664896/WXDzuC4P_400x400.jpg">
                </Avatar>
                <h3>username</h3>
                </div> */}
            </div>
            {
                messageWindow?(
                    <div className="messages-inbox">
                        <div className="messages-message-shown">
                            {messages.map((msg)=>{
                                const {id, message}=msg;
                                const boole=message.user===user;
                                return(
                                    <div className={boole?"messages-sent":"messages-recieved"}>
                                        <h3> {message.user}: {message.text}</h3>
                                    </div>
                                )
                            })
                            }
                            </div>
                        <div className="messages-message-send">
                            <input type="text" placeholder="Type your Message.." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </div>
                        
                ):(
                    <div className="messages-message">
                        <FiSend className="messages-message-icon"/>
                        <h3>Your Messages</h3>
                        <p>Send private photos and messages to a friend or group</p>
                        <button>Send message</button>
                    </div>
                )
            }
        </div>
    )
}

export default Messages
