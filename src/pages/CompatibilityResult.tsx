
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Heart, Star, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import NeuroChat from "@/components/NeuroChat";

const CompatibilityResult = () => {
  const navigate = useNavigate();
  const [compatibilityResult, setCompatibilityResult] = useState<any>(null);
  const [compatibilityData, setCompatibilityData] = useState<any>(null);

  useEffect(() => {
    const result = localStorage.getItem('compatibilityResult');
    const data = localStorage.getItem('compatibilityData');
    
    if (!result || !data) {
      navigate('/');
      return;
    }

    try {
      const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;
      setCompatibilityResult(parsedResult);
      setCompatibilityData(JSON.parse(data));
    } catch (error) {
      console.error('Error parsing compatibility result:', error);
      navigate('/');
    }
  }, [navigate]);

  if (!compatibilityResult || !compatibilityData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading compatibility results...</p>
        </div>
      </div>
    );
  }

  const isCouple = compatibilityData.type === 'couple';

  return (
    <div className="min-h-screen bg-gradient-to-b from-neuro-background to-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="h-6 w-6 text-neuro-primary" />
          </Button>
          <h1 className="text-3xl font-bold text-neuro-primary">
            {isCouple ? 'Couple' : 'Team'} Compatibility Results
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Participants Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isCouple ? (
                  <><Heart className="h-6 w-6 text-red-500" /> Relationship Partners</>
                ) : (
                  <><Users className="h-6 w-6 text-blue-500" /> Team Members</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {compatibilityData.participants.map((participant: any, index: number) => (
                  <div key={index} className="bg-neuro-background/30 p-3 rounded-lg flex justify-between items-center">
                    <span className="font-medium">{participant.name}</span>
                    <span className="text-neuro-primary font-bold">{participant.personalityType}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compatibility Score */}
          {compatibilityResult.compatibilityScore && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Compatibility Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-neuro-primary mb-2">
                    {compatibilityResult.compatibilityScore}%
                  </div>
                  <p className="text-gray-600">{compatibilityResult.scoreDescription}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Strengths */}
        {compatibilityResult.strengths && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Star className="h-6 w-6" />
                {isCouple ? 'Shared Strengths' : 'Team Synergies'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compatibilityResult.strengths.map((strength: string, index: number) => (
                  <div key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-green-800">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Challenges/Conflicts */}
        {compatibilityResult.challenges && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-6 w-6" />
                {isCouple ? 'Possible Conflicts' : 'Potential Challenges'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compatibilityResult.challenges.map((challenge: string, index: number) => (
                  <div key={index} className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <p className="text-orange-800">{challenge}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Individual Insights for Teams */}
        {!isCouple && compatibilityResult.individualInsights && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                Individual Team Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {compatibilityResult.individualInsights.map((insight: any, index: number) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      {compatibilityData.participants[index]?.name} ({compatibilityData.participants[index]?.personalityType})
                    </h4>
                    <div className="space-y-2">
                      <p><strong>Strength:</strong> {insight.strength}</p>
                      <p><strong>Team Role:</strong> {insight.teamRole}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {compatibilityResult.tips && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Lightbulb className="h-6 w-6" />
                {isCouple ? 'Growth Tips' : 'Collaboration Tips'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {compatibilityResult.tips.map((tip: string, index: number) => (
                  <div key={index} className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <p className="text-purple-800">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* NeuroChat for Compatibility */}
        <div className="mt-8">
          <NeuroChat 
            personalityType={`${isCouple ? 'Couple' : 'Team'} Compatibility`}
            nickname={`${compatibilityData.participants.map((p: any) => p.personalityType).join(' & ')}`}
            mode="widget"
          />
        </div>
      </div>
    </div>
  );
};

export default CompatibilityResult;
