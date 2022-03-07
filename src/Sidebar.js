import React, {useState, useEffect} from "react";
import "./Sidebar.css";
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from './StateProvider';



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    //run this once, when sidebar component is loads -> 2:03:02
    useEffect(()=>{
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot)=>setRooms(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            }))
        ));
        
        //2:14:08 --> Whenever components unmount or cleansup u can call unsubscribe.
        return () => { //it means u always detach the this real time listener after it's done using it //2:14:20
            unsubscribe()
        }

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/> {/**2:55:55 */}
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                    
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__search__container">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
                
            </div>

            <div className="sidebar__chats">
                < SidebarChat addNewChat/>
                {/* < SidebarChat />
                < SidebarChat />
                < SidebarChat /> */} {/* 2:06:43 */}
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}

                
            </div>
        </div>
    )
}

export default Sidebar;