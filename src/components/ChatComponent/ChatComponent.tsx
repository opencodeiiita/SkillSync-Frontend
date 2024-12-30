import React, { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatComponentProps {
  chatTitle: string;
  chatAvatar: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ chatTitle, chatAvatar, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    const newMessageObj: Message = {
      id: Date.now().toString(),
      sender: 'Current User',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={chatAvatar} alt="Chat Avatar" className="chat-avatar" />
        <h3>{chatTitle}</h3>
      </div>
      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-item ${msg.sender === 'Current User' ? 'sent' : 'received'}`}>
            <div className="message-header">
              <span className="sender-name">{msg.sender}</span>
              <span className="message-timestamp">{msg.timestamp}</span>
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;