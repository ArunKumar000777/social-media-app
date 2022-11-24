import React, { useEffect, useRef, useState } from "react";
import LogoSearch from "../../componernts/LogoSearch/LogoSearch";
import "./chat.css";
import CommentIcon from "@mui/icons-material/MarkUnreadChatAlt";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import useAuth from "../../hooks/useAuth";
import { useGetChatsQuery } from "../../features/Chat/chatApiSlice";
import Conversation from "../../componernts/Conversation/Conversation";
import { NavLink } from "react-router-dom";
import ChatBox from "../../componernts/ChatBox/ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
    const { user } = useAuth();
    const id = user._id;
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const { data, isSuccess, isError } = useGetChatsQuery(user._id);

    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [id]);
    // sendMessage to the socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);
    // receive the message from the socket server
    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setReceiveMessage(data);
        });
    }, []);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <div className="Chat">
            {/* left side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {data
                            ? data.map((chat) => (
                                  <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                                      <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
            {/* right side */}
            <div className="Right-side-chat">
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "20px",
                        }}
                    >
                        <div className="icon">
                            <NavLink to={"/home"}>
                                <HomeIcon />
                            </NavLink>
                        </div>
                        <div className="icon">
                            <SettingsIcon />
                        </div>
                        <div className="icon">
                            <NotificationsIcon />
                        </div>
                        <div className="icon">
                            <NavLink to={"/chat"}>
                                <CommentIcon />
                            </NavLink>
                        </div>
                    </div>
                </div>
                {data && (
                    <ChatBox
                        chat={currentChat}
                        currentUserId={user?._id}
                        setSendMessage={setSendMessage}
                        receiveMessage={receiveMessage}
                    />
                )}
            </div>
        </div>
    );
};

export default Chat;

