
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mbtiQuestions } from "@/data/mbtiQuestions";
import { useToast } from "@/hooks/use-toast";

// Import the Hindi translation JSON here (adjust path accordingly)
import translations from "@/locales/hi.json";

const MBTITest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalQuestions = mbtiQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const question = mbtiQuestions[currentQuestion];

  // Helper to get translated text by key, fallback to fallbackText
  const getTranslatedText = (key: string, fallback: string) => {
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
      toast({
        title: "Please answer all questions",
        description: `You have ${unansweredQuestions.length} unanswered questions.`,
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('mbtiAnswers', JSON.stringify(answers));
    navigate('/mbti-result');
  };

  const scaleLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

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
            <h1 className="text-2xl font-bold text-neuro-primary">MBTI Test</h1>
            <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {totalQuestions}</p>
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
            <ArrowLeft /> <span>Previous</span>
          </Button>
          {currentQuestion < totalQuestions - 1 ? (
            <Button
              onClick={goToNext}
              disabled={!(question.id in answers)}
              className="flex items-center space-x-2"
            >
              <span>Next</span> <ArrowRight />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!(question.id in answers)}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MBTITest;

