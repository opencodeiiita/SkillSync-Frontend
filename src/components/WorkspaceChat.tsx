import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';

interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

interface SimulatedWorkspaceChatProps {
  workspaceId: string;
  username?: string;
}

const SimulatedWorkspaceChat = () => {
    const workspaceId = "123";
    const username = "Current User";
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // Simulate some initial messages
  const simulatedUsers: readonly string[] = ['Alex', 'Sarah', 'John', 'Emma'] as const;
  const simulatedMessages: readonly string[] = [
    'Hey everyone! 👋',
    'How is the project going?',
    'Making good progress on the frontend!',
    'Can someone help me with the API integration?'
  ] as const;

  // Load initial messages
  useEffect(() => {
    const initialMessages: Message[] = simulatedMessages.map((content, index) => ({
      content,
      sender: simulatedUsers[index],
      timestamp: new Date(Date.now() - (index * 60000)).toISOString()
    }));
    setMessages(initialMessages);
  }, []);

  // Simulate receiving random messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
      const randomMessages: readonly string[] = [
        'Looking good!',
        'Great work everyone!',
        'Can we schedule a quick call?',
        'I just pushed some updates',
        'Who wants to review my PR?'
      ] as const;
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      if (Math.random() > 0.7) { // 30% chance to receive a message
        setMessages(prev => [...prev, {
          content: randomMessage,
          sender: randomUser,
          timestamp: new Date().toISOString()
        }]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate typing indicator
  const simulateTyping = (): void => {
    const randomUser = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
    setTypingUsers(prev => [...prev, randomUser]);
    setTimeout(() => {
      setTypingUsers(prev => prev.filter(user => user !== randomUser));
    }, 2000);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData: Message = {
        content: newMessage,
        sender: username,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        const responseMessages: readonly string[] = [
          'Thanks for sharing!',
          'That makes sense',
          'I agree with that',
          'Interesting point!'
        ] as const;
        const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];
        const randomUser = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];
        
        const responseData: Message = {
          content: randomResponse,
          sender: randomUser,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, responseData]);
      }, 1000);
    }
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewMessage(e.target.value);
    if (Math.random() > 0.7) simulateTyping();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-xl flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Workspace Chat</h2>
      </div>

      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === username ? 'items-end' : 'items-start'
            }`}
          >
            <div className={`max-w-[70%] rounded-lg p-3 ${
              msg.sender === username
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="font-semibold text-sm mb-1">
                {msg.sender}
              </div>
              <div className="text-sm break-words">
                {msg.content}
              </div>
              <div className="text-xs mt-1 opacity-75">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {typingUsers.length > 0 && (
        <div className="px-4 py-2 text-sm text-gray-500 italic">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </div>
      )}

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulatedWorkspaceChat;