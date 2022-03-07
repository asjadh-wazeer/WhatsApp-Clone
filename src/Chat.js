import React, {useState, useEffect} from 'react';
import "./Chat.css";
import {Avatar, IconButton} from "@material-ui/core";
import {SearchOutlined, AttachFile, MoreVert} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom";
import db from "./firebase" //2:22:32

import {useStateValue} from "./StateProvider";
import firebase from 'firebase';


function Chat() {

    const [input, setInput] = useState("")//{/*1:52:12*/}
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    //show messages based on room -> 2:26:00
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]); //3:00:00

    const [{user}, dispatch] = useStateValue(); //3:06:30

    // useEffect(()=>{
    //     if(roomId) { //if it's room id --> 2:26:14
    //        db.collection('rooms').doc(roomId).onSnapshot(snapshot =>( //go inside the room('rooms'), go inside the specific document(doc), use the 
    //            setRoomName(snapshot.data().name)//room id inside the url (roomId), snapshot make a real time listener for that,
    //            //on snapshot, whenever u get that snapshot go head & set the room name
    //            // data().name --> pull the data and they will get their room name
    //         });

    //         db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(
    //                setMessages(snapshot.docs.map(doc=>doc.data()))
    //             });
           
    //     }
    // }, [roomId])

    useEffect(()=>{
        if(roomId){  //if it's room id --> 2:26:14
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => { //go inside the room('rooms'), go inside the specific document(doc), use the 
                setRoomName(snapshot.data().name); //room id inside the url (roomId), snapshot make a real time listener for that,
                //on snapshot, whenever u get that snapshot go head & set the room name
               // data().name --> pull the data and they will get their room name
            });

            //3:01:10
            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data())) // asy - ascending order
            });
            // Now go to the chat.js -> className: chat__body
        }
    },[roomId])

    
  //useEffect -> it run some code. when components load 
  useEffect (()=>{
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId]) // Whenever sidebar chat loads it will calcullate some random one
  //[roomId] --> so now avatar chat image also change in chat component

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Tou typed : ", input) //1:54:10


    //// When we send the message  - 3:05:54
    db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName, //3:06:30 -> we want to import user from data layer //"user.displayName" is from google authentication - 3:06:55
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), // bcz I want server's timestamp
    })


    setInput(""); //1:55:56 -> Whenever we press enter, It will cleanup our input
  }

  return (
  <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

        <div className='chat__headerInfo'>
            {/* <h3>room name</h3>
            <p>Last seen at ...</p> 2:28:45*/}
            <h3>{roomName}</h3>
            <p>Last seen at ...</p>
        </div>

        <div className='chat__headerRight'>
            <IconButton>
                <SearchOutlined />
            </IconButton>

            <IconButton>
                <AttachFile />
            </IconButton>

            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
      </div>

      <div className='chat__body'>

            {messages.map(message => ( //3:01:48

            <p className= {`chat__message ${true && "chat__reciver"}`}> {/* 1:41:45 */}
            {/* <p className= {`chat__message ${message.name === user.displayName && "chat__reciver"}`}> */} {/*1:43:32*/}
                {/* <span className='chat__name'>Asjadh</span>
                Hey Guys
                <span className='chat__timestamp'>3:52pm</span> */}

                {/* 3:01:57 */}
                <span className="chat__name">{message.name}</span>
                        {message.message}
                <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
            </p>
             ))}
            
      </div>

      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
            <input value={input} type="text" placeholder='Send a message'
            onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
  </div>
  );
}

export default Chat;
