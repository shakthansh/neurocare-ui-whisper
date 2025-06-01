
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MBTIResult } from "@/utils/mbtiCalculator";

interface MBTIResultCardProps {
  result: MBTIResult;
}

const MBTIResultCard = ({ result }: MBTIResultCardProps) => {
  return (
    <Card className="mb-8 animate-fade-in bg-gradient-to-br from-white to-neuro-background/30">
      <CardHeader className="text-center pb-4">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neuro-primary to-neuro-accent rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-white">{result.type}</span>
        </div>
        <CardTitle className="text-2xl text-neuro-primary mb-2">
          {result.nickname}
        </CardTitle>
        <p className="text-gray-600 leading-relaxed">
          {result.description}
        </p>
      </CardHeader>
    </Card>
  );
};

export default MBTIResultCard;
