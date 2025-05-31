import { useState } from "react";
import { useTranslation } from "react-i18next";
import TestCard from "./TestCard";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { PersonalityTestStartDialog } from "./PersonalityTestStartDialog";

const TestSection = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showStartDialog, setShowStartDialog] = useState(false);

  const handleMBTIStart = () => {
    setShowStartDialog(true);
  };

  const handleTestStart = (name: string, language: string) => {
    // Save user preferences
    localStorage.setItem('userPreferences', JSON.stringify({ name, language }));
    
    // Change language if different from current
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }

    toast({
      title: t("testStart.toast.title"),
      description: t("testStart.toast.description", { name }),
      duration: 3000,
    });

    setShowStartDialog(false);
    navigate("/mbti-test");
  };

  const tests = [
    {
      title: t("testSection.tests.mbti.title"),
      description: t("testSection.tests.mbti.description"),
      isAvailable: true,
      onStart: handleMBTIStart
    },
    {
      title: t("testSection.tests.bigFive.title"),
      description: t("testSection.tests.bigFive.description"),
      isAvailable: false
    },
    {
      title: t("testSection.tests.enneagram.title"),
      description: t("testSection.tests.enneagram.description"),
      isAvailable: false
    },
    {
      title: t("testSection.tests.eq.title"),
      description: t("testSection.tests.eq.description"),
      isAvailable: false
    }
  ];

  return (
    <section id="test-section" className="py-20 px-6 bg-gradient-to-b from-white to-neuro-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-neuro-primary mb-4">
            {t("testSection.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("testSection.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {tests.map((test, index) => (
            <div key={test.title} style={{ animationDelay: `${0.1 * index}s` }}>
              <TestCard {...test} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-500 italic">
            {t("testSection.comingSoon")}
          </p>
        </div>
      </div>

      <PersonalityTestStartDialog
        open={showStartDialog}
        onClose={() => setShowStartDialog(false)}
        onStart={handleTestStart}
      />
    </section>
  );
};

export default TestSection;