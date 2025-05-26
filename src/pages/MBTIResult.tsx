
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Lightbulb, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateMBTI, MBTIResult } from "@/utils/mbtiCalculator";
import { useToast } from "@/hooks/use-toast";
import NeuroChat from "@/components/NeuroChat";

const MBTIResultPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);

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
          variant: "destructive",
        });
        navigate('/mbti-test');
      } finally {
        setIsCalculating(false);
      }
    };

    processResults();
  }, [navigate, toast]);

  const handleShare = async () => {
    if (!result) return;

    const shareText = `I just discovered I'm ${result.type} - ${result.nickname}! ${result.description} #NeuroCareMBTI #KnowYourself #PersonalityTest`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My MBTI Result',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your result with friends",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Feature coming soon!",
      description: "Instagram Story download will be available soon",
    });
  };

  const handleRetakeTest = () => {
    localStorage.removeItem('mbtiAnswers');
    navigate('/mbti-test');
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neuro-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your personality with AI...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to calculate results</p>
          <Button onClick={() => navigate('/mbti-test')} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-6 w-6 text-neuro-primary" />
          </Button>
          <h1 className="text-2xl font-bold text-neuro-primary">Your MBTI Result</h1>
        </div>

        {/* AI Analysis Badge */}
        <div className="mb-6 text-center">
          <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            ✨ AI-Powered Analysis by Gemini
          </span>
        </div>

        {/* Main Result Card */}
        <Card className="mb-8 animate-fade-in bg-gradient-to-br from-white to-neuro-background/30">
          <CardHeader className="text-center pb-4">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neuro-primary to-neuro-accent rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">{result.type}</span>
            </div>
            <CardTitle className="text-2xl text-neuro-primary mb-2">
              {result.nickname}
            </CardTitle>
            <p className="text-gray-600 leading-relaxed">
              {result.description}
            </p>
          </CardHeader>
        </Card>

        {/* Chat with AI Call-to-Action */}
        <Card className="mb-6 animate-fade-in bg-gradient-to-r from-neuro-primary/10 to-neuro-accent/10 border-2 border-neuro-primary/20" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-lg text-neuro-primary flex items-center justify-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat with NeuroChat AI about your {result.type} personality!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Get personalized insights, ask questions about your strengths, and explore how to maximize your {result.type} potential.
            </p>
            <div className="bg-white/50 rounded-lg p-3 border border-neuro-primary/20">
              <p className="text-sm text-neuro-primary font-medium">
                💬 Look for the chat button in the bottom right corner!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-neuro-primary">✨ Your Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-neuro-accent rounded-full mr-3"></div>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="text-lg text-neuro-primary">🎯 Growth Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-neuro-coral rounded-full mr-3"></div>
                    {challenge}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-lg text-neuro-primary flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Personalized Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.tips.map((tip, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Famous People */}
        <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-lg text-neuro-primary">🌟 Famous {result.type}s</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {result.famousPeople.map((person, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-neuro-accent/20 text-neuro-primary rounded-full text-sm font-medium"
                >
                  {person}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share Section */}
        <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-lg text-neuro-primary">📱 Share Your Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Button 
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="flex-1 border-neuro-accent text-neuro-primary hover:bg-neuro-accent hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Instagram Story
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              #NeuroCareMBTI #KnowYourself #PersonalityTest
            </p>
          </CardContent>
        </Card>

        {/* Call to Actions */}
        <div className="flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Button
            onClick={handleRetakeTest}
            variant="outline"
            className="border-neuro-primary text-neuro-primary hover:bg-neuro-primary hover:text-white"
          >
            Retake Test
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white"
          >
            Explore More Personality Tests
          </Button>
        </div>
      </div>

      {/* NeuroChat AI Assistant */}
      <NeuroChat personalityType={result.type} nickname={result.nickname} />
    </div>
  );
};

export default MBTIResultPage;
