
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Sparkles, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface NeuroChatProps {
  personalityType?: string;
  nickname?: string;
  mode?: "widget" | "page";
  onClose?: () => void;
}

const NeuroChat = ({ personalityType, nickname, mode = "widget", onClose }: NeuroChatProps) => {
  const [isOpen, setIsOpen] = useState(mode === "page");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: personalityType 
        ? `Hi there, ${personalityType} - ${nickname}! 🎉 I'm NeuroChat, your personal AI companion. I understand your unique ${personalityType} traits and I'm here to help you explore your personality, understand your strengths, and navigate your personal growth journey. What aspect of being ${personalityType} would you like to dive into today?`
        : "Hi! I'm NeuroChat, your AI companion for exploring personality insights. I'm here to help you understand yourself better and grow as a person. What's on your mind today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const contextualPrompt = personalityType 
        ? `User is ${personalityType} - ${nickname}. Focus on their ${personalityType} personality traits and provide personalized advice. User message: ${messageToSend}`
        : `User is exploring their personality. User message: ${messageToSend}`;

      const { data, error } = await supabase.functions.invoke('gemini-personality', {
        body: { 
          answers: contextualPrompt, 
          type: 'chat' 
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.result,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: "Sorry, I'm having trouble responding right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    if (mode === "page" && onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  // Widget mode - prominent center call-to-action
  if (mode === "widget" && !isOpen) {
    return (
      <div className="w-full flex justify-center mb-8">
        <Card className="max-w-lg w-full bg-gradient-to-r from-neuro-primary/10 to-neuro-accent/10 border-2 border-neuro-primary/30 hover:border-neuro-primary/50 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => setIsOpen(true)}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-neuro-primary to-neuro-accent rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-neuro-primary mb-2">
              Get Your Personalized AI Companion
            </h3>
            <h4 className="text-lg font-semibold text-neuro-accent mb-3">
              NeuroChat AI
            </h4>
            <p className="text-gray-600 mb-4">
              {personalityType 
                ? `Chat with AI about your ${personalityType} personality traits, get personalized insights, and discover how to maximize your potential!`
                : "Chat with AI to explore your personality, get insights, and discover your potential!"
              }
            </p>
            <Button className="bg-gradient-to-r from-neuro-primary to-neuro-accent hover:from-neuro-accent hover:to-neuro-primary text-white font-semibold py-2 px-6 rounded-full transition-all duration-300">
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Chat interface (both widget and page mode)
  const chatInterface = (
    <Card className={`flex flex-col shadow-xl border-2 border-neuro-primary/20 ${mode === "page" ? "h-[80vh] max-w-4xl mx-auto" : "h-96 w-80 max-w-[calc(100vw-2rem)]"}`}>
      <CardHeader className="p-4 bg-gradient-to-r from-primary-light to-neuro-primary text-white rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">NeuroChat AI</CardTitle>
              {personalityType && (
                <p className="text-xs opacity-90">Your {personalityType} companion</p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            {mode === "page" ? <ArrowLeft className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm break-words ${
                  message.isUser
                    ? 'bg-neuro-primary text-white'
                    : 'bg-gradient-to-r from-neuro-background to-gray-100 text-gray-800 border border-neuro-primary/10'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-neuro-background to-gray-100 p-3 rounded-lg text-sm text-gray-600 border border-neuro-primary/10">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neuro-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neuro-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neuro-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-neuro-background/30 to-white flex-shrink-0">
          <div className="flex space-x-2">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={personalityType ? `Ask about your ${personalityType} traits...` : "Ask about your personality..."}
              className="flex-1 p-3 border border-neuro-primary/30 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary focus:border-transparent"
              rows={mode === "page" ? 3 : 2}
            />
            <Button
              onClick={sendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="bg-neuro-primary hover:bg-neuro-primary/90 text-white p-3 transition-all duration-200 hover:scale-105 self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (mode === "page") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-neuro-primary mb-2">
              NeuroChat AI - Your Personal Companion
            </h1>
            {personalityType && (
              <p className="text-lg text-gray-600">
                Specialized for {personalityType} - {nickname} personalities
              </p>
            )}
          </div>
          {chatInterface}
        </div>
      </div>
    );
  }

  // Widget mode when open
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {chatInterface}
    </div>
  );
};

export default NeuroChat;
