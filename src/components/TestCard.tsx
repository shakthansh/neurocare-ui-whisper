
import { Brain, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestCardProps {
  title: string;
  description: string;
  isAvailable?: boolean;
  icon?: React.ReactNode;
  onStart?: () => void;
}

const TestCard = ({ title, description, isAvailable = false, icon, onStart }: TestCardProps) => {
  return (
    <Card 
      className={`
        transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer
        ${isAvailable 
          ? 'bg-white border-neuro-accent shadow-md hover:border-neuro-primary' 
          : 'bg-gray-50 border-gray-200 opacity-70'
        }
      `}
      onClick={isAvailable ? onStart : undefined}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-2">
          {isAvailable ? (
            icon || <Brain className="w-12 h-12 text-neuro-primary" />
          ) : (
            <Lock className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <CardTitle className={`text-xl font-bold ${isAvailable ? 'text-neuro-primary' : 'text-gray-400'}`}>
          {title}
          {!isAvailable && (
            <span className="block text-sm font-normal text-neuro-accent mt-1">
              Coming Soon
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription className="text-gray-600 mb-4">
          {description}
        </CardDescription>
        {isAvailable && (
          <Button 
            variant="outline" 
            className="w-full border-neuro-accent text-neuro-primary hover:bg-neuro-accent hover:text-white transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onStart?.();
            }}
          >
            Start Test
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TestCard;
