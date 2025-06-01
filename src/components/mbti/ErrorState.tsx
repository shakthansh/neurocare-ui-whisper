
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  buttonText?: string;
}

const ErrorState = ({ message, onRetry, buttonText = "Try Again" }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">{message}</p>
        <Button onClick={onRetry} className="mt-4">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
