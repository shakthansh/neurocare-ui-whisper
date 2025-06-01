
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MBTIResult } from "@/utils/mbtiCalculator";

interface StrengthsChallengesGridProps {
  result: MBTIResult;
}

const StrengthsChallengesGrid = ({ result }: StrengthsChallengesGridProps) => {
  return (
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
  );
};

export default StrengthsChallengesGrid;
