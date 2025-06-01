
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart } from "lucide-react";

interface CompatibilityTestStartDialogProps {
  open: boolean;
  onClose: () => void;
  onStart: (data: any) => void;
}

const mbtiTypes = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ"
];

export const CompatibilityTestStartDialog = ({ open, onClose, onStart }: CompatibilityTestStartDialogProps) => {
  const [step, setStep] = useState(1);
  const [testType, setTestType] = useState<"couple" | "team" | null>(null);
  const [teamSize, setTeamSize] = useState<number>(2);
  const [participants, setParticipants] = useState<{ name: string; personalityType: string }[]>([]);

  const resetDialog = () => {
    setStep(1);
    setTestType(null);
    setTeamSize(2);
    setParticipants([]);
  };

  const handleClose = () => {
    resetDialog();
    onClose();
  };

  const handleTypeSelection = (type: "couple" | "team") => {
    setTestType(type);
    if (type === "couple") {
      setParticipants([
        { name: "", personalityType: "" },
        { name: "", personalityType: "" }
      ]);
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handleTeamSizeSelection = () => {
    const newParticipants = Array.from({ length: teamSize }, () => ({
      name: "",
      personalityType: ""
    }));
    setParticipants(newParticipants);
    setStep(3);
  };

  const updateParticipant = (index: number, field: "name" | "personalityType", value: string) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  const canProceed = participants.every(p => p.name.trim() && p.personalityType);

  const handleStart = () => {
    onStart({
      type: testType,
      participants,
      teamSize: testType === "team" ? teamSize : undefined
    });
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neuro-primary">
            Personality Compatibility Test
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <p className="text-gray-600 text-center">
              Choose what type of compatibility you'd like to explore:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className="cursor-pointer hover:border-neuro-primary transition-colors"
                onClick={() => handleTypeSelection("couple")}
              >
                <CardHeader className="text-center">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Couple Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    Discover how two personalities work together in a romantic relationship
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-neuro-primary transition-colors"
                onClick={() => handleTypeSelection("team")}
              >
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Team Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    Analyze how multiple personalities collaborate in a team setting
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && testType === "team" && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Team Size</h3>
              <p className="text-gray-600">How many team members? (2-8 people)</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setTeamSize(Math.max(2, teamSize - 1))}
                disabled={teamSize <= 2}
              >
                -
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{teamSize}</span>
              <Button
                variant="outline"
                onClick={() => setTeamSize(Math.min(8, teamSize + 1))}
                disabled={teamSize >= 8}
              >
                +
              </Button>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleTeamSizeSelection} className="bg-neuro-primary hover:bg-neuro-primary/90">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                {testType === "couple" ? "Couple Information" : `Team Information (${teamSize} members)`}
              </h3>
              <p className="text-gray-600">
                Enter the name and MBTI personality type for each {testType === "couple" ? "person" : "team member"}
              </p>
            </div>

            <div className="space-y-4">
              {participants.map((participant, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {testType === "couple" ? (index === 0 ? "Partner 1 Name" : "Partner 2 Name") : `Member ${index + 1} Name`}
                      </label>
                      <Input
                        value={participant.name}
                        onChange={(e) => updateParticipant(index, "name", e.target.value)}
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        MBTI Personality Type
                      </label>
                      <Select
                        value={participant.personalityType}
                        onValueChange={(value) => updateParticipant(index, "personalityType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select MBTI type" />
                        </SelectTrigger>
                        <SelectContent>
                          {mbtiTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => setStep(testType === "couple" ? 1 : 2)}>
                Back
              </Button>
              <Button 
                onClick={handleStart}
                disabled={!canProceed}
                className="bg-neuro-primary hover:bg-neuro-primary/90"
              >
                Start Compatibility Analysis
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
