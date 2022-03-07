import React, {useState,useEffect} from 'react';
import "./SidebarChat.css";
import {Avatar} from "@material-ui/core";
import db from "./firebase";
import {Link} from "react-router-dom";


function SidebarChat({addNewChat, id, name}) {

  const [seed, setSeed] = useState("");
  //useEffect -> it run some code. when components load ->1:08:00
  useEffect (()=>{
      setSeed(Math.floor(Math.random() * 5000))
  }, []) //1:08:54 --> Whenever sidebar chat loads it will calcullate some random one

const createChat = () => {
  const roomName = prompt("Enter your name for chat");

  if(roomName) { //if u enter the name --->2:09:41
    // Do some clever database stuff....
    db.collection("rooms").add({
      name: roomName,
    });
  }
};

//If it's not the addNewChat  //-> 1:15:56
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}> {/**2:23:42 */} {/*so if u click sidebar chat, then url will change, without refresh*/}
    <div className='sidebarChat'>
        {/* <Avatar src="https://avatars.dicebear.com/api/human/gdhdhdj.svg"/>  * 1:06:55 */}
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>{/** 1:06:55 */}
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
    </div>

    </Link>
    ) : (
      <div onClick={createChat} className='sidebarChat'>
          <h2>Add new chat</h2>
      </div>
    )
}

export default SidebarChat;
