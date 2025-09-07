'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/lib/types';
import { generateHealthcareAdvice } from '@/lib/openai';
import { Send, Bot, User } from 'lucide-react';

interface AgentChatProps {
  variant?: 'compact' | 'full';
  initialMessage?: string;
  onResponse?: (response: string) => void;
}

export function AgentChat({ 
  variant = 'compact',
  initialMessage,
  onResponse 
}: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await generateHealthcareAdvice(inputValue);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (onResponse) {
        onResponse(response);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="glass-card">
      {/* Messages */}
      <div className={`space-y-4 mb-4 ${variant === 'compact' ? 'max-h-64' : 'max-h-96'} overflow-y-auto`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`p-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-primary-500 bg-opacity-20' 
                : 'bg-white bg-opacity-20'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div className={`flex-1 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}>
              <div className={`inline-block p-3 rounded-lg max-w-xs ${
                message.role === 'user'
                  ? 'bg-primary-500 bg-opacity-30 text-white'
                  : 'bg-white bg-opacity-20 text-white'
              }`}>
                <p className="text-sm whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              <p className="text-xs text-white text-opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-white bg-opacity-20">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="inline-block p-3 rounded-lg bg-white bg-opacity-20">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about healthcare, benefits, or appointments..."
          className="flex-1 input-field text-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="p-3 bg-primary-500 bg-opacity-30 hover:bg-opacity-40 disabled:bg-opacity-20 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
