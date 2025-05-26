
import { useNavigate } from "react-router-dom";
import NeuroChat from "./NeuroChat";

interface NeuroChatPageProps {
  personalityType?: string;
  nickname?: string;
}

const NeuroChatPage = ({ personalityType, nickname }: NeuroChatPageProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <NeuroChat 
      personalityType={personalityType}
      nickname={nickname}
      mode="page"
      onClose={handleClose}
    />
  );
};

export default NeuroChatPage;
