
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface MBTIResultHeaderProps {
  onBackClick: () => void;
}

const MBTIResultHeader = ({ onBackClick }: MBTIResultHeaderProps) => {
  return (
    <div className="flex items-center mb-8">
      <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-4">
        <ArrowLeft className="h-6 w-6 text-neuro-primary" />
      </Button>
      <h1 className="text-2xl font-bold text-neuro-primary">Your MBTI Result</h1>
    </div>
  );
};

export default MBTIResultHeader;
