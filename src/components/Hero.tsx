
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleStartTest = () => {
    // Scroll to test section
    const testSection = document.getElementById('test-section');
    if (testSection) {
      testSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-neuro-background to-white flex flex-col justify-center items-center px-6 py-20">
      <div className="text-center max-w-md mx-auto space-y-8">
        {/* Animated Brand Name */}
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-neuro-primary animate-breathing mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-neuro-primary animate-breathing">
              NeuroCare
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">
            Understand yourself. Connect deeply.
          </p>
        </div>

        {/* Subheadline */}
        <p className="text-xl text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          AI-powered personality insights
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            onClick={handleStartTest}
            className="w-full bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 animate-pulse-glow shadow-lg"
          >
            Start My Personality Test
          </Button>
        </div>

        {/* Visual Cue */}
        <div className="animate-fade-in animate-float" style={{ animationDelay: '0.6s' }}>
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neuro-accent to-primary-light rounded-full flex items-center justify-center opacity-80">
            <div className="w-8 h-8 bg-white rounded-full animate-breathing"></div>
          </div>
          <p className="text-sm text-gray-500 mt-3 italic">
            Your mind is unique. Let's explore it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
