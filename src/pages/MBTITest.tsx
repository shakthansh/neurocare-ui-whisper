
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mbtiQuestions } from "@/data/mbtiQuestions";
import { useToast } from "@/hooks/use-toast";

const MBTITest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [translations, setTranslations] = useState<any>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en'); // default to English

  const totalQuestions = mbtiQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const question = mbtiQuestions[currentQuestion];

  // Load translations based on selected language
  useEffect(() => {
    const loadTranslations = async () => {
      // Get language from localStorage, URL params, or default to English
      const savedLanguage = localStorage.getItem('selectedLanguage') || 
                           new URLSearchParams(window.location.search).get('lang') || 
                           'en';
      
      setCurrentLanguage(savedLanguage);

      try {
        let translationData;
        
        if (savedLanguage === 'hi') {
          // Import Hindi translations
          translationData = await import('@/locales/hi/translation.json');
        } else {
          // Default to English (you can create an English translation file or use fallback text)
          translationData = null; // Will use fallback text
        }
        
        setTranslations(translationData?.default || null);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setTranslations(null); // Fallback to English
      }
    };

    loadTranslations();
  }, []);

  // Helper to get translated text by key, fallback to fallbackText
  const getTranslatedText = (key: string, fallback: string) => {
    if (!translations) return fallback;
    
    // nested key access, e.g., "questions.1"
    const keys = key.split(".");
    let result: any = translations;
    for (const k of keys) {
      if (result && k in result) {
        result = result[k];
      } else {
        return fallback;
      }
    }
    return typeof result === "string" ? result : fallback;
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: parseInt(value)
    }));
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = mbtiQuestions.filter(q => !(q.id in answers));
    if (unansweredQuestions.length > 0) {
      const toastTitle = currentLanguage === 'hi' ? 
        "कृपया सभी प्रश्नों का उत्तर दें" : 
        "Please answer all questions";
      const toastDescription = currentLanguage === 'hi' ? 
        `आपके पास ${unansweredQuestions.length} अनुत्तरित प्रश्न हैं।` :
        `You have ${unansweredQuestions.length} unanswered questions.`;
        
      toast({
        title: toastTitle,
        description: toastDescription,
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('mbtiAnswers', JSON.stringify(answers));
    navigate('/mbti-result');
  };

  // Translate scale labels
  const getScaleLabels = () => {
    if (currentLanguage === 'hi') {
      return [
        "बिल्कुल असहमत",
        "असहमत", 
        "तटस्थ",
        "सहमत",
        "बिल्कुल सहमत"
      ];
    }
    return [
      "Strongly Disagree",
      "Disagree",
      "Neutral", 
      "Agree",
      "Strongly Agree"
    ];
  };

  const scaleLabels = getScaleLabels();

  // Show loading state while translations are loading
  if (translations === null && currentLanguage === 'hi') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neuro-primary mx-auto mb-4"></div>
          <p>Loading translations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-6 w-6 text-neuro-primary" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-neuro-primary">
              {currentLanguage === 'hi' ? 'एमबीटीआई परीक्षण' : 'MBTI Test'}
            </h1>
            <p className="text-sm text-gray-600">
              {currentLanguage === 'hi' ? 
                `प्रश्न ${currentQuestion + 1} का ${totalQuestions}` :
                `Question ${currentQuestion + 1} of ${totalQuestions}`
              }
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-8">
            <h2 className="text-lg font-medium text-gray-800 mb-6 leading-relaxed">
              {getTranslatedText(question.textKey, question.fallbackText)}
            </h2>

            <RadioGroup
              value={answers[question.id]?.toString() || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {scaleLabels.map((label, index) => (
                <div key={index + 1} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <RadioGroupItem value={(index + 1).toString()} id={`q${question.id}_opt${index + 1}`} />
                  <Label htmlFor={`q${question.id}_opt${index + 1}`}>
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft /> 
            <span>{currentLanguage === 'hi' ? 'पिछला' : 'Previous'}</span>
          </Button>
          {currentQuestion < totalQuestions - 1 ? (
            <Button
              onClick={goToNext}
              disabled={!(question.id in answers)}
              className="flex items-center space-x-2"
            >
              <span>{currentLanguage === 'hi' ? 'अगला' : 'Next'}</span> 
              <ArrowRight />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!(question.id in answers)}
            >
              {currentLanguage === 'hi' ? 'जमा करें' : 'Submit'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MBTITest;
