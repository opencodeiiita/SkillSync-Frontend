import React from "react";
import styles from "./ChatComponent.module.css";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${styles.messageItem} ${
            msg.sender === currentUser ? styles.sent : styles.received
          }`}
        >
          <div className={styles.messageHeader}>
            <img src={msg.avatar} alt={msg.sender} className={styles.avatar} />
            <span className={styles.senderName}>{msg.sender}</span>
          </div>
          <div className={styles.messageContent}>{msg.content}</div>
          <div className={styles.messageTimestamp}>{msg.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
