
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CompatibilityTest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [compatibilityData, setCompatibilityData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('compatibilityData');
    if (!data) {
      navigate('/');
      return;
    }
    setCompatibilityData(JSON.parse(data));
  }, [navigate]);

  const startAnalysis = async () => {
    if (!compatibilityData) return;
    
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('gemini-personality', {
        body: { 
          compatibilityData,
          type: 'compatibility' 
        }
      });

      if (error) throw error;

      // Save the result and navigate to results page
      localStorage.setItem('compatibilityResult', JSON.stringify(data.result));
      navigate('/compatibility-result');
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      toast({
        title: "Analysis Error",
        description: "Sorry, we couldn't analyze the compatibility right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!compatibilityData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-neuro-primary" />
          </Button>
          <h1 className="text-3xl font-bold text-neuro-primary">
            Personality Compatibility Analysis
          </h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {compatibilityData.type === 'couple' ? (
                <><Heart className="h-6 w-6 text-red-500" /> Couple Compatibility</>
              ) : (
                <><Users className="h-6 w-6 text-blue-500" /> Team Compatibility</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Participants:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compatibilityData.participants.map((participant: any, index: number) => (
                  <div key={index} className="bg-neuro-background/30 p-4 rounded-lg">
                    <div className="font-medium">{participant.name}</div>
                    <div className="text-neuro-primary font-bold">{participant.personalityType}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-neuro-primary to-neuro-accent hover:from-neuro-accent hover:to-neuro-primary text-white px-8 py-3 text-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Compatibility...
              </>
            ) : (
              'Start Compatibility Analysis'
            )}
          </Button>
          
          {isAnalyzing && (
            <p className="mt-4 text-gray-600">
              Our AI is analyzing the personality dynamics... This may take a moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityTest;
