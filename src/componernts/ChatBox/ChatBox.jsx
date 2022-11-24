import React, { useEffect, useRef, useState } from "react";
import { useGetMessagesQuery } from "../../features/Chat/chatApiSlice";
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { useCreateMessageMutation } from "../../features/message/messageApiSlice";
import "./chatBox.css";
const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {

    const [createMessage, { isLoading, isError, isSuccess }] = useCreateMessageMutation();
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    // fetch data for header
    const receiverId = chat?.members?.find((ids) => currentUserId !== ids);
    const { data, refetch } = useGetUserQuery(receiverId);
    const { data: messages, refetch: again } = useGetMessagesQuery(chat?._id);

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessage([...message, receiveMessage]);
        }
    }, [receiveMessage]);

    useEffect(() => {
        setMessage(messages);
    }, [messages]);
    useEffect(() => {
        if (chat !== null) refetch();
    }, [chat, currentUserId]);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    //  fetch data for messages
    useEffect(() => {
        if (chat !== null) again();
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id,
        };
        // send the message to the database
        const res = await createMessage(message);
        again();
        setNewMessage("");
        // send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUserId);
        setSendMessage({ ...message, receiverId });
    };
    // always scroll to the bottom message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <div style={{ position: "relative" }}>
                                        <div  style={{ position: "absolute" }}></div>
                                        <img
                                            src={
                                                data?.profilePicture
                                                    ? serverPublic + data?.profilePicture
                                                    : serverPublic + "defaultProfile.png"
                                            }
                                            alt="profilepic"
                                            className="followerImage"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    </div>
                                    <div className="name" style={{ fontSize: "0.8rem" }}>
                                        <span>
                                            {data?.firstname} {data?.lastname}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                        </div>
                        {/* chatbox Messages */}
                        <div className="chat-body">
                            {message?.map((message) => (
                                <>
                                    <div
                                        ref={scroll}
                                        key={message._id}
                                        className={message?.senderId === currentUserId ? "message own" : "message"}
                                        style={{ display: "flex", flexDirection: "column" }}
                                    >
                                        <span>{message?.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat sender */}
                        <div className="chat-sender">
                            <div className="add">+</div>
                            <InputEmoji value={newMessage} placeholder="Type a message" onChange={handleChange} />
                            <div className="send-button button" onClick={handleSend}>
                                Send
                            </div>
                        </div>
                    </>
                ) : (
                    <span className="tap-toChat">Tap on chat to start Conversation</span>
                )}
            </div>
        </>
    );
};

export default ChatBox;
