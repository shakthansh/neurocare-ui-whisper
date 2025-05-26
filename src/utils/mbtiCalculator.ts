
import { supabase } from "@/integrations/supabase/client";

export interface MBTIResult {
  type: string;
  nickname: string;
  description: string;
  strengths: string[];
  challenges: string[];
  famousPeople: string[];
  tips: string[];
  dimensions: {
    EI: { score: number; preference: 'E' | 'I' };
    SN: { score: number; preference: 'S' | 'N' };
    TF: { score: number; preference: 'T' | 'F' };
    JP: { score: number; preference: 'J' | 'P' };
  };
}

export async function calculateMBTI(answers: Record<number, number>): Promise<MBTIResult> {
  try {
    console.log('Sending answers to Gemini for analysis:', answers);
    
    // Use Gemini AI to determine personality type and details
    const { data, error } = await supabase.functions.invoke('gemini-personality', {
      body: { answers, type: 'assessment' }
    });

    if (error) {
      console.error('Gemini API error:', error);
      throw error;
    }

    console.log('Raw Gemini response:', data.result);

    // Parse the JSON response from Gemini
    let geminiResult;
    try {
      // Clean the response - remove any markdown formatting if present
      const cleanedResult = data.result.replace(/```json\n?|\n?```/g, '').trim();
      geminiResult = JSON.parse(cleanedResult);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      console.log('Raw response that failed to parse:', data.result);
      // Fallback to basic calculation if JSON parsing fails
      return calculateBasicMBTI(answers);
    }

    console.log('Parsed Gemini result:', geminiResult);

    // Validate that we have the required fields
    if (!geminiResult.type || !geminiResult.nickname || !geminiResult.description) {
      console.error('Invalid Gemini response structure:', geminiResult);
      return calculateBasicMBTI(answers);
    }

    // Calculate basic dimension scores for display
    const scores = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const counts = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Simple scoring for display purposes
    Object.entries(answers).forEach(([questionId, answer]) => {
      const id = parseInt(questionId);
      if ([1,3,5,21,29].includes(id)) { scores.I += answer; counts.I++; }
      if ([2,4,28].includes(id)) { scores.E += answer; counts.E++; }
      if ([6,8,10,23,25].includes(id)) { scores.S += answer; counts.S++; }
      if ([7,9,24,30].includes(id)) { scores.N += answer; counts.N++; }
      if ([11,13,15,27].includes(id)) { scores.T += answer; counts.T++; }
      if ([12,14,22,26].includes(id)) { scores.F += answer; counts.F++; }
      if ([16,18,20].includes(id)) { scores.J += answer; counts.J++; }
      if ([17,19,30].includes(id)) { scores.P += answer; counts.P++; }
    });

    return {
      type: geminiResult.type,
      nickname: geminiResult.nickname,
      description: geminiResult.description,
      strengths: geminiResult.strengths || [],
      challenges: geminiResult.challenges || [],
      famousPeople: geminiResult.famousPeople || [],
      tips: geminiResult.tips || [],
      dimensions: {
        EI: { 
          score: Math.round((scores.E / (counts.E || 1) / (scores.I / (counts.I || 1) + scores.E / (counts.E || 1))) * 100) || 50, 
          preference: geminiResult.type[0] as 'E' | 'I' 
        },
        SN: { 
          score: Math.round((scores.S / (counts.S || 1) / (scores.S / (counts.S || 1) + scores.N / (counts.N || 1))) * 100) || 50, 
          preference: geminiResult.type[1] as 'S' | 'N' 
        },
        TF: { 
          score: Math.round((scores.T / (counts.T || 1) / (scores.T / (counts.T || 1) + scores.F / (counts.F || 1))) * 100) || 50, 
          preference: geminiResult.type[2] as 'T' | 'F' 
        },
        JP: { 
          score: Math.round((scores.J / (counts.J || 1) / (scores.J / (counts.J || 1) + scores.P / (counts.P || 1))) * 100) || 50, 
          preference: geminiResult.type[3] as 'J' | 'P' 
        }
      }
    };
  } catch (error) {
    console.error('Error calculating MBTI with Gemini:', error);
    // Fallback to basic calculation if Gemini fails
    return calculateBasicMBTI(answers);
  }
}

function calculateBasicMBTI(answers: Record<number, number>): MBTIResult {
  // Fallback basic MBTI profiles
  const mbtiProfiles: Record<string, Omit<MBTIResult, 'type' | 'dimensions'>> = {
    ISTJ: {
      nickname: "The Logistician",
      description: "ISTJs are responsible, detail-oriented, and logical. They value traditions and hard work.",
      famousPeople: ["Angela Merkel", "Jeff Bezos", "Natalie Portman"],
      strengths: ["Responsible", "Detail-oriented", "Logical", "Reliable", "Organized"],
      challenges: ["Stubborn", "Overly cautious", "Judgmental", "Inflexible"],
      tips: ["Create clear routines", "Practice flexibility", "Learn to accept criticism", "Embrace change gradually"]
    },
    INTJ: {
      nickname: "The Architect",
      description: "INTJs are strategic, independent, and confident thinkers who love solving complex problems.",
      famousPeople: ["Elon Musk", "Mark Zuckerberg", "Hillary Clinton"],
      strengths: ["Strategic", "Independent", "Confident", "Analytical", "Visionary"],
      challenges: ["Arrogant", "Judgmental", "Overly analytical", "Impatient"],
      tips: ["Stay open to feedback", "Practice empathy", "Avoid overthinking", "Collaborate more"]
    }
  };

  // Basic calculation logic
  const scores = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const counts = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId);
    if ([1,3,5,21,29].includes(id)) { scores.I += answer; counts.I++; }
    if ([2,4,28].includes(id)) { scores.E += answer; counts.E++; }
    if ([6,8,10,23,25].includes(id)) { scores.S += answer; counts.S++; }
    if ([7,9,24,30].includes(id)) { scores.N += answer; counts.N++; }
    if ([11,13,15,27].includes(id)) { scores.T += answer; counts.T++; }
    if ([12,14,22,26].includes(id)) { scores.F += answer; counts.F++; }
    if ([16,18,20].includes(id)) { scores.J += answer; counts.J++; }
    if ([17,19,30].includes(id)) { scores.P += answer; counts.P++; }
  });

  const avgI = counts.I > 0 ? scores.I / counts.I : 0;
  const avgE = counts.E > 0 ? scores.E / counts.E : 0;
  const avgS = counts.S > 0 ? scores.S / counts.S : 0;
  const avgN = counts.N > 0 ? scores.N / counts.N : 0;
  const avgT = counts.T > 0 ? scores.T / counts.T : 0;
  const avgF = counts.F > 0 ? scores.F / counts.F : 0;
  const avgJ = counts.J > 0 ? scores.J / counts.J : 0;
  const avgP = counts.P > 0 ? scores.P / counts.P : 0;

  const EI = avgI > avgE ? 'I' : 'E';
  const SN = avgS > avgN ? 'S' : 'N';
  const TF = avgT > avgF ? 'T' : 'F';
  const JP = avgJ > avgP ? 'J' : 'P';

  const type = `${EI}${SN}${TF}${JP}`;
  const profile = mbtiProfiles[type] || mbtiProfiles.INTJ;

  return {
    type,
    ...profile,
    dimensions: {
      EI: { score: Math.round((avgE / (avgE + avgI || 1)) * 100), preference: EI },
      SN: { score: Math.round((avgS / (avgS + avgN || 1)) * 100), preference: SN },
      TF: { score: Math.round((avgT / (avgT + avgF || 1)) * 100), preference: TF },
      JP: { score: Math.round((avgJ / (avgJ + avgP || 1)) * 100), preference: JP }
    }
  };
}
