
interface LoadingStateProps {
  message: string;
  submessage?: string;
}

const LoadingState = ({ message, submessage }: LoadingStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neuro-primary mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
        {submessage && <p className="text-sm text-gray-500 mt-2">{submessage}</p>}
      </div>
    </div>
  );
};

export default LoadingState;
