import React, { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import styles from "./ChatComponent.module.css";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ChatComponentProps {
  chatTitle: string; // Name of the recipient or group
  chatAvatar: string; // Avatar for the recipient or group
  messages: Message[]; // List of messages passed as a prop
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // State updater function for messages
}

const ChatComponent: React.FC<ChatComponentProps> = ({ chatTitle, chatAvatar, messages, setMessages }) => {
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      sender: "You",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      avatar: "https://as1.ftcdn.net/jpg/02/30/60/82/1000_F_230608264_fhoqBuEyiCPwT0h9RtnsuNAId3hWungP.jpg",
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    // Auto-scroll to the latest message
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <img src={chatAvatar} alt={`${chatTitle}'s avatar`} className={styles.chatAvatar} />
        <h3 className={styles.chatTitle}>{chatTitle}</h3>
      </div>

      {/* Message List */}
      <div className={styles.messageList} ref={messageListRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.messageItem} ${
              message.sender === "You" ? styles.sent : styles.received
            }`}
          >
            <div className={styles.messageHeader}>
              <img src={message.avatar} alt={`${message.sender}'s avatar`} className={styles.avatar} />
              <span className={styles.senderName}>{message.sender}</span>
            </div>
            <div className={styles.messageContent}>{message.content}</div>
            <div className={styles.messageTimestamp}>{message.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatComponent;
