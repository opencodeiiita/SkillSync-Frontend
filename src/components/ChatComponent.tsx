import React, { useState, useEffect, useRef } from 'react';
import './ChatComponent.css';
import EmojiPicker from 'emoji-picker-react'; // Install using `npm install emoji-picker-react`

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatComponentProps {
  isMember: boolean;
  onJoinWorkspace: () => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ isMember, onJoinWorkspace }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const initialMessages: Message[] = [
        { sender: 'Alice', content: 'Hello, team!', timestamp: '10:00 AM' },
        { sender: 'Bob', content: 'Hi Alice!', timestamp: '10:01 AM' },
      ];
      setMessages(initialMessages);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() && !filePreview) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessageObject: Message = {
      sender: 'You',
      content: newMessage || `Shared File: ${fileName}`,
      timestamp,
    };

    setMessages((prev) => [...prev, newMessageObject]);
    setNewMessage('');
    setFilePreview(null);
    setFileName(null);
    setIsUploading(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size < 5 * 1024 * 1024) {
      setFilePreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      alert('File is too large or invalid. Please try again.');
    }
  };

  const handleUploadClick = () => {
    if (filePreview) {
      setIsUploading(true);
      setTimeout(() => {
        alert('File uploaded successfully!');
        setIsUploading(false);
      }, 1000); // Simulates file upload
    }
  };

  const handleShareMeetingLink = () => {
    const meetingLink = prompt('Enter your meeting link:');
    if (meetingLink && /^https?:\/\/\S+$/.test(meetingLink)) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { sender: 'You', content: `Meeting Link: ${meetingLink}`, timestamp },
      ]);
    } else {
      alert('Please enter a valid meeting link.');
    }
  };

  if (!isMember) {
    return (
      <div className="chat-component">
        <p>You must join the workspace to access the chat.</p>
        <button onClick={onJoinWorkspace}>Join Workspace</button>
      </div>
    );
  }

  
return (
    <div className="chat-component">
      <div className="message-list" ref={messageListRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
            <div className="message-header">
              <span className="sender">{msg.sender}</span>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
            <div className="content">{msg.content}</div>
          </div>
        ))}
      </div>

      {filePreview && (
        <div className="file-preview">
          <p>Preview: {fileName}</p>
          <div className="file-preview-window">
            <img src={filePreview} alt="Preview" />
          </div>
          <button onClick={handleUploadClick}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}

      <div className="message-input">
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
        {showEmojiPicker && (
          <div className="emoji-picker-window">
            <EmojiPicker 
              onEmojiClick={(emojiData) => {
                setNewMessage((prev) => prev + emojiData.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
        <button onClick={handleShareMeetingLink}>Share Meeting Link</button>
        <label htmlFor="file-upload">Upload File</label>
        <input id="file-upload" type="file" onChange={handleFileUpload} accept="image/*,application/pdf" />
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend} disabled={!newMessage.trim() && !filePreview}>
          Send
        </button>
      </div>
    </div>
  );
  
};

export default ChatComponent;
