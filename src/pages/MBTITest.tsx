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
import { useTranslation } from "react-i18next";

const MBTITest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalQuestions = mbtiQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const question = mbtiQuestions[currentQuestion];

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
    // Check if all questions are answered
    const unansweredQuestions = mbtiQuestions.filter(q => !(q.id in answers));
    if (unansweredQuestions.length > 0) {
      toast({
        title: t("mbtiTest.toast.unansweredTitle"),
        description: t("mbtiTest.toast.unansweredDescription", { count: unansweredQuestions.length }),
        variant: "destructive",
      });
      return;
    }

    // Save answers to localStorage and navigate to results
    localStorage.setItem('mbtiAnswers', JSON.stringify(answers));
    navigate('/mbti-result');
  };

  const scaleLabels = [
    t("mbtiTest.scale.stronglyDisagree"),
    t("mbtiTest.scale.disagree"),
    t("mbtiTest.scale.neutral"),
    t("mbtiTest.scale.agree"),
    t("mbtiTest.scale.stronglyAgree")
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
            <h1 className="text-2xl font-bold text-neuro-primary">{t("mbtiTest.title")}</h1>
            <p className="text-sm text-gray-600">
              {t("mbtiTest.questionProgress", { current: currentQuestion + 1, total: totalQuestions })}
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
              {t(`questions.${question.id}`)}
            </h2>

            <RadioGroup
              value={answers[question.id]?.toString() || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {scaleLabels.map((label, index) => (
                <div key={index + 1} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={`${index + 1}`} id={`option-${index + 1}`} />
                  <Label 
                    htmlFor={`option-${index + 1}`}
                    className="flex-1 cursor-pointer text-sm font-medium"
                  >
                    <span className="text-neuro-primary font-semibold mr-2">{index + 1}.</span>
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t("mbtiTest.navigation.previous")}</span>
          </Button>

          {currentQuestion === totalQuestions - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!answers[question.id]}
              className="bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white px-8"
            >
              {t("mbtiTest.navigation.submit")}
            </Button>
          ) : (
            <Button
              onClick={goToNext}
              disabled={!answers[question.id]}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white"
            >
              <span>{t("mbtiTest.navigation.next")}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MBTITest;