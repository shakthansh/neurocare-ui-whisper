
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onRetakeTest: () => void;
  onExploreMore: () => void;
}

const ActionButtons = ({ onRetakeTest, onExploreMore }: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <Button 
        onClick={onRetakeTest} 
        variant="outline" 
        className="border-neuro-primary text-neuro-primary hover:bg-neuro-primary hover:text-white"
      >
        Retake Test
      </Button>
      <Button 
        onClick={onExploreMore} 
        className="bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white"
      >
        Explore More Personality Tests
      </Button>
    </div>
  );
};

export default ActionButtons;
