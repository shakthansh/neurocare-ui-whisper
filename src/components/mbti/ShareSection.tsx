
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareSectionProps {
  personalityType: string;
  nickname: string;
}

const ShareSection = ({ personalityType, nickname }: ShareSectionProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareText = `I just discovered I'm ${personalityType} - ${nickname}! #NeuroCareMBTI #KnowYourself #PersonalityTest`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My MBTI Result',
          text: shareText,
          url: 'https://neurocare-ui-whisper.vercel.app/'
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your result with friends"
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Let's Connect",
      description: (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>Shakthansh pandey</p>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:shaktanshpandey84@gmail.com"
              style={{ color: '#1a0dab', textDecoration: 'underline' }}
            >
              shaktanshpandey84@gmail.com
            </a>
          </p>
          <p>
            💼 LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/shaktansh-pandey-7716212b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1a0dab', textDecoration: 'underline' }}
            >
              LinkedIn Profile
            </a>
          </p>
          <p>
            🌐 Website:{" "}
            <a
              href="https://www.richestman.xyz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1a0dab', textDecoration: 'underline' }}
            >
              www.richestman.xyz
            </a>
          </p>
          <p>
            📸 Instagram:{" "}
            <a
              href="https://www.instagram.com/shakthansh?igsh=dHlneGFlOGZremlh"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1a0dab', textDecoration: 'underline' }}
            >
              @shakthansh
            </a>
          </p>
          <p style={{ fontStyle: "italic", marginTop: "8px" }}>
            "Building self-awareness, one log at a time."
          </p>
        </div>
      ),
      duration: 10000,
    });
  };

  return (
    <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <CardHeader>
        <CardTitle className="text-lg text-neuro-primary">📱 Share Your Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Button 
            onClick={handleShare} 
            className="flex-1 bg-gradient-to-r from-primary-light to-neuro-primary hover:from-neuro-primary hover:to-primary-light text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            onClick={handleDownload} 
            variant="outline" 
            className="flex-1 border-neuro-accent text-neuro-primary hover:bg-neuro-accent hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Contact Us
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          #NeuroCareMBTI #KnowYourself #PersonalityTest
        </p>
      </CardContent>
    </Card>
  );
};

export default ShareSection;
