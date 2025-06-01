
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateMBTI, MBTIResult } from "@/utils/mbtiCalculator";
import { useToast } from "@/hooks/use-toast";
import NeuroChat from "@/components/NeuroChat";
import LoadingState from "@/components/mbti/LoadingState";
import ErrorState from "@/components/mbti/ErrorState";
import ChatPageView from "@/components/mbti/ChatPageView";
import MBTIResultHeader from "@/components/mbti/MBTIResultHeader";
import MBTIResultCard from "@/components/mbti/MBTIResultCard";
import StrengthsChallengesGrid from "@/components/mbti/StrengthsChallengesGrid";
import TipsSection from "@/components/mbti/TipsSection";
import FamousPeopleSection from "@/components/mbti/FamousPeopleSection";
import ShareSection from "@/components/mbti/ShareSection";
import ActionButtons from "@/components/mbti/ActionButtons";

const MBTIResultPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const [showChatPage, setShowChatPage] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('mbtiAnswers');
    if (!savedAnswers) {
      navigate('/mbti-test');
      return;
    }

    const processResults = async () => {
      try {
        const answers = JSON.parse(savedAnswers);
        console.log('Processing MBTI answers with Gemini AI...');
        const mbtiResult = await calculateMBTI(answers);
        console.log('MBTI result calculated:', mbtiResult);
        setResult(mbtiResult);
      } catch (error) {
        console.error('Error calculating MBTI result:', error);
        toast({
          title: "Error calculating results",
          description: "Please try taking the test again.",
          variant: "destructive"
        });
        navigate('/mbti-test');
      } finally {
        setIsCalculating(false);
      }
    };

    processResults();
  }, [navigate, toast]);

  const handleRetakeTest = () => {
    localStorage.removeItem('mbtiAnswers');
    navigate('/mbti-test');
  };

  if (isCalculating) {
    return (
      <LoadingState 
        message="Analyzing your personality with AI..." 
        submessage="This may take a moment"
      />
    );
  }

  if (!result) {
    return (
      <ErrorState 
        message="Unable to calculate results" 
        onRetry={() => navigate('/mbti-test')}
      />
    );
  }

  if (showChatPage) {
    return (
      <ChatPageView 
        personalityType={result.type}
        nickname={result.nickname}
        onBack={() => setShowChatPage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <MBTIResultHeader onBackClick={() => navigate('/')} />

        {/* AI Analysis Badge */}
        <div className="mb-6 text-center">
          <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            ✨ AI-Powered Analysis by NeuroChat AI
          </span>
        </div>

        <MBTIResultCard result={result} />

        {/* Prominent NeuroChat Call-to-Action */}
        <div onClick={() => setShowChatPage(true)}>
          <NeuroChat personalityType={result.type} nickname={result.nickname} mode="widget" />
        </div>

        <StrengthsChallengesGrid result={result} />

        <TipsSection result={result} />

        <FamousPeopleSection result={result} />

        <ShareSection personalityType={result.type} nickname={result.nickname} />

        <ActionButtons 
          onRetakeTest={handleRetakeTest}
          onExploreMore={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default MBTIResultPage;
