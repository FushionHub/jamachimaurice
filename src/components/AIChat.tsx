"use client";
import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/Card";
import { AIAvatar, useAIAvatar } from "@/components/AIAvatar";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isThinking, startSpeaking, stopSpeaking, startThinking, stopThinking } = useAIAvatar();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    startThinking();

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      stopThinking();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);

        // Handle actions
        if (data.action === 'schedule') {
          // Redirect to contact page with appointment context
          window.location.href = '/contact?context=appointment';
        } else if (data.action === 'payment') {
          // Redirect to services page
          window.location.href = '/services';
        } else if (data.action === 'email') {
          // Open email client
          window.location.href = 'mailto:jamachimauricennadi0@gmail.com';
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      stopThinking();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        stopSpeaking();
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          setIsSpeaking(false);
          stopSpeaking();
        };
        utterance.onstart = () => {
          setIsSpeaking(true);
          startSpeaking();
        };
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleClear = async () => {
    try {
      await fetch('/api/ai-chat', { method: 'DELETE' });
      setMessages([]);
    } catch (error) {
      console.error('Failed to clear conversation:', error);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-sky-500 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all"
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <span className="text-2xl">🤖</span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-md max-h-[600px]"
          >
            <Card className="flex flex-col h-[500px]">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <AIAvatar />
                  <div>
                    <h3 className="font-semibold">Jamachi AI Assistant</h3>
                    <p className="text-xs text-white/60">Always here to help</p>
                  </div>
                </div>
                <button
                  onClick={handleClear}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Clear
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-white/60 py-8">
                    <div className="text-4xl mb-2">👋</div>
                    <p>Hi! I'm Jamachi's AI assistant.</p>
                    <p className="text-sm mt-2">Ask me about services, pricing, or schedule a consultation!</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs opacity-60">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => handleSpeak(message.content)}
                            className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                          >
                            {isSpeaking ? '🔊' : '🔇'}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-4 py-3 rounded-xl hover:from-emerald-600 hover:to-sky-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">➤</span>
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
