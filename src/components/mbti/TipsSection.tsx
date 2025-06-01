
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { MBTIResult } from "@/utils/mbtiCalculator";

interface TipsSectionProps {
  result: MBTIResult;
}

const TipsSection = ({ result }: TipsSectionProps) => {
  return (
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
  );
};

export default TipsSection;
