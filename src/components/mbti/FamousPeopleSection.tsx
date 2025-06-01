
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MBTIResult } from "@/utils/mbtiCalculator";

interface FamousPeopleSectionProps {
  result: MBTIResult;
}

const FamousPeopleSection = ({ result }: FamousPeopleSectionProps) => {
  return (
    <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <CardHeader>
        <CardTitle className="text-lg text-neuro-primary">🌟 Famous {result.type}s</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {result.famousPeople.map((person, index) => (
            <span key={index} className="px-3 py-2 bg-neuro-accent/20 text-neuro-primary rounded-full text-sm font-medium">
              {person}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FamousPeopleSection;
