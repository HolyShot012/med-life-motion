import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'bot' },
  ]);
  
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      // GSAP pulsing animation instead of anime.js for now
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      if (isOpen) {
        gsap.fromTo(chatRef.current,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
        );
      }
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen && chatRef.current) {
      setIsOpen(true);
    } else {
      if (chatRef.current) {
        gsap.to(chatRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => setIsOpen(false)
        });
      } else {
        setIsOpen(false);
      }
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user' as const
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thank you for your message! Our pharmacy team will assist you shortly.",
          sender: 'bot' as const
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card 
          ref={chatRef}
          className="absolute bottom-16 right-0 w-80 h-96 p-0 overflow-hidden shadow-xl border"
        >
          {/* Header */}
          <div className="gradient-primary p-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">MedLife Support</h3>
                  <p className="text-xs opacity-90">Online now</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-64">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button size="icon" onClick={sendMessage} className="btn-medical">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Chat Button */}
      <Button
        ref={buttonRef}
        size="icon"
        onClick={toggleChat}
        className="w-14 h-14 rounded-full gradient-primary shadow-lg hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
};