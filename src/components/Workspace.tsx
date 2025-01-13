import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageCircle, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface WorkspaceChatProps {
  workspaceId: string;
  userId: string;
  username: string;
  authToken: string;  // Add auth token prop
}

const WorkspaceChat: React.FC<WorkspaceChatProps> = ({
  workspaceId,
  userId,
  username,
  authToken,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Verify workspace membership
  const verifyWorkspaceMembership = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/workspaces/${workspaceId}/verify-member`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Not authorized to access this workspace');
      }

      setIsAuthorized(true);
      setError(null);
    } catch (err) {
      setIsAuthorized(false);
      setError(err instanceof Error ? err.message : 'Failed to verify workspace membership');
    }
  };

  useEffect(() => {
    verifyWorkspaceMembership();
  }, [workspaceId, authToken]);

  useEffect(() => {
    if (!isAuthorized) return;

    socketRef.current = io('http://localhost:3000', {
      query: { workspaceId, userId },
      auth: { token: authToken },
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      socketRef.current?.emit('joinWorkspace', { 
        workspaceId, 
        username,
        token: authToken 
      });
    });

    socketRef.current.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('unauthorized', (error) => {
      setError('Unauthorized: Please check your access permissions');
      setIsConnected(false);
      socketRef.current?.disconnect();
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
      setError('Failed to connect to chat server');
    });

    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.emit('leaveWorkspace', { 
          workspaceId, 
          username,
          token: authToken 
        });
        socketRef.current.disconnect();
      }
    };
  }, [workspaceId, userId, username, authToken, isAuthorized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history
  const loadChatHistory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/workspaces/${workspaceId}/messages`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to load chat history');

      const history = await response.json();
      setMessages(history);
    } catch (err) {
      setError('Failed to load chat history');
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      loadChatHistory();
    }
  }, [isAuthorized]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !socketRef.current?.connected || !isAuthorized) return;

    try {
      const messageData = {
        id: `${Date.now()}-${userId}`,
        sender: username,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      // Emit the message through socket
      socketRef.current.emit('sendMessage', {
        workspaceId,
        message: messageData,
        token: authToken,
      });

      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthorized) {
    return (
      <div className="w-full h-[600px] bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-500 font-semibold">
            {error || 'You do not have access to this workspace chat'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-800">Workspace Chat</span>
          <div 
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} 
          />
        </div>
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === username ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === username
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{message.sender}</p>
              <p className="text-sm break-words">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={!isConnected || !isAuthorized}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSendMessage}
          disabled={!isConnected || !isAuthorized || !newMessage.trim()}
          className={`px-4 py-2 rounded-lg flex items-center justify-center ${
            !isConnected || !isAuthorized || !newMessage.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default WorkspaceChat;