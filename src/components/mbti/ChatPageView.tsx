
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NeuroChat from "@/components/NeuroChat";

interface ChatPageViewProps {
  personalityType: string;
  nickname: string;
  onBack: () => void;
}

const ChatPageView = ({ personalityType, nickname, onBack }: ChatPageViewProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-6 w-6 text-neuro-primary" />
            </Button>
            <h1 className="text-3xl font-bold text-neuro-primary">
              NeuroChat AI - Your Personal Companion
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Specialized for {personalityType} - {nickname} personalities
          </p>
        </div>
        <NeuroChat 
          personalityType={personalityType} 
          nickname={nickname} 
          mode="page" 
          onClose={onBack} 
        />
      </div>
    </div>
  );
};

export default ChatPageView;
