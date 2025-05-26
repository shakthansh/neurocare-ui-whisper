
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
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
}

const NeuroChat = ({ personalityType, nickname }: NeuroChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: personalityType 
        ? `Hi there, ${personalityType} - ${nickname}! 🎉 I'm NeuroChat, your personal AI companion. I'm here to help you explore your unique personality traits, understand your strengths, and navigate your personal growth journey. What aspect of being ${personalityType} would you like to dive into?`
        : "Hi! I'm NeuroChat, your AI companion for exploring personality insights. I'm here to help you understand yourself better. What's on your mind today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      const { data, error } = await supabase.functions.invoke('gemini-personality', {
        body: { 
          answers: `User is ${personalityType ? `${personalityType} - ${nickname}` : 'exploring their personality'}. User message: ${messageToSend}`, 
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white rounded-full w-16 h-16 shadow-lg animate-pulse hover:animate-none transition-all duration-300 hover:scale-105"
        >
          <div className="flex flex-col items-center">
            <Sparkles className="h-5 w-5 mb-1" />
            <MessageCircle className="h-4 w-4" />
          </div>
        </Button>
        {personalityType && (
          <div className="absolute -top-12 right-0 bg-white rounded-lg shadow-lg p-2 text-xs text-neuro-primary font-medium whitespace-nowrap">
            Chat about your {personalityType} traits!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="h-96 flex flex-col shadow-xl border-2 border-neuro-primary/20">
        <CardHeader className="p-4 bg-gradient-to-r from-primary-light to-neuro-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
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
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
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
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-neuro-background/30 to-white">
            <div className="flex space-x-2">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={personalityType ? `Ask about your ${personalityType} traits...` : "Ask about your personality..."}
                className="flex-1 p-2 border border-neuro-primary/30 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-neuro-primary focus:border-transparent"
                rows={2}
              />
              <Button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="bg-neuro-primary hover:bg-neuro-primary/90 text-white p-2 transition-all duration-200 hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuroChat;
