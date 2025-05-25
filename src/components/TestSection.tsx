
import TestCard from "./TestCard";
import { useToast } from "@/hooks/use-toast";

const TestSection = () => {
  const { toast } = useToast();

  const handleMBTIStart = () => {
    toast({
      title: "MBTI Test Starting",
      description: "Your personality journey begins now...",
      duration: 3000,
    });
    // Future: Navigate to MBTI test page
    console.log("Starting MBTI test...");
  };

  const tests = [
    {
      title: "MBTI",
      description: "Discover your personality through AI precision. Understand your cognitive preferences and how you interact with the world.",
      isAvailable: true,
      onStart: handleMBTIStart
    },
    {
      title: "Big Five",
      description: "Explore the five fundamental dimensions of personality that shape who you are.",
      isAvailable: false
    },
    {
      title: "Enneagram",
      description: "Uncover your core motivations and fears through this ancient wisdom system.",
      isAvailable: false
    },
    {
      title: "Emotional Intelligence",
      description: "Measure your ability to understand and manage emotions effectively.",
      isAvailable: false
    }
  ];

  return (
    <section id="test-section" className="py-20 px-6 bg-gradient-to-b from-white to-neuro-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-neuro-primary mb-4">
            Choose Your Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each test reveals different aspects of your personality. Start with MBTI and unlock deeper insights about yourself.
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
            More personality assessments coming soon...
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestSection;
