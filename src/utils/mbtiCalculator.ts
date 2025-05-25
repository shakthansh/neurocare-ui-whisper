
import { mbtiQuestions } from "@/data/mbtiQuestions";
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

const mbtiProfiles: Record<string, Omit<MBTIResult, 'type' | 'dimensions'>> = {
  ISTJ: {
    nickname: "The Logistician",
    description: "ISTJs are responsible, detail-oriented, and logical. They value traditions and hard work.",
    famousPeople: ["Angela Merkel", "Jeff Bezos", "Natalie Portman"],
    strengths: ["Responsible", "Detail-oriented", "Logical"],
    challenges: ["Stubborn", "Overly cautious", "Judgmental"],
    tips: ["Create clear routines", "Practice flexibility", "Learn to accept criticism"]
  },
  ISFJ: {
    nickname: "The Defender", 
    description: "ISFJs are loyal, compassionate, and practical. They strive to protect and support others.",
    famousPeople: ["Beyoncé", "Rosa Parks", "Halle Berry"],
    strengths: ["Loyal", "Compassionate", "Practical"],
    challenges: ["Reluctant to change", "Takes things personally", "Overly selfless"],
    tips: ["Set boundaries", "Practice self-care", "Embrace change"]
  },
  INFJ: {
    nickname: "The Advocate",
    description: "INFJs are insightful, passionate, and altruistic. They seek meaning and purpose in everything.",
    famousPeople: ["Martin Luther King Jr.", "Nelson Mandela", "Lady Gaga"],
    strengths: ["Insightful", "Passionate", "Altruistic"],
    challenges: ["Perfectionistic", "Sensitive to criticism", "Private"],
    tips: ["Balance idealism with realism", "Develop healthy boundaries", "Practice self-reflection"]
  },
  INTJ: {
    nickname: "The Architect",
    description: "INTJs are strategic, independent, and confident thinkers who love solving complex problems.",
    famousPeople: ["Elon Musk", "Mark Zuckerberg", "Hillary Clinton"],
    strengths: ["Strategic", "Independent", "Confident"],
    challenges: ["Arrogant", "Judgmental", "Overly analytical"],
    tips: ["Stay open to feedback", "Practice empathy", "Avoid overthinking"]
  },
  ISTP: {
    nickname: "The Virtuoso",
    description: "ISTPs are practical, observant, and adventurous problem-solvers who thrive on action.",
    famousPeople: ["Steve Jobs", "Bear Grylls", "Clint Eastwood"],
    strengths: ["Practical", "Observant", "Adventurous"],
    challenges: ["Private", "Impulsive", "Easily bored"],
    tips: ["Develop patience", "Plan ahead", "Work on emotional expression"]
  },
  ISFP: {
    nickname: "The Adventurer",
    description: "ISFPs are flexible, artistic, and sensitive souls who live in the present moment.",
    famousPeople: ["Michael Jackson", "Marilyn Monroe", "Britney Spears"],
    strengths: ["Flexible", "Artistic", "Sensitive"],
    challenges: ["Overly private", "Avoids conflict", "Easily stressed"],
    tips: ["Practice assertiveness", "Face conflicts directly", "Manage stress proactively"]
  },
  INFP: {
    nickname: "The Mediator",
    description: "INFPs are empathetic, idealistic dreamers who deeply care about harmony and authenticity.",
    famousPeople: ["J.R.R. Tolkien", "William Shakespeare", "Audrey Hepburn"],
    strengths: ["Empathetic", "Idealistic", "Open-minded"],
    challenges: ["Overly idealistic", "Takes criticism personally", "Difficult to get to know"],
    tips: ["Balance dreams with reality", "Learn from criticism", "Open up gradually"]
  },
  INTP: {
    nickname: "The Logician",
    description: "INTPs are analytical, curious thinkers who love exploring theories and ideas.",
    famousPeople: ["Albert Einstein", "Bill Gates", "René Descartes"],
    strengths: ["Analytical", "Curious", "Open-minded"],
    challenges: ["Absent-minded", "Perfectionist", "Difficulty with practical matters"],
    tips: ["Focus on follow-through", "Accept imperfection", "Practice social skills"]
  },
  ESTP: {
    nickname: "The Entrepreneur",
    description: "ESTPs are energetic, bold, and practical doers who love excitement and taking risks.",
    famousPeople: ["Donald Trump", "Madonna", "Ernest Hemingway"],
    strengths: ["Energetic", "Bold", "Practical"],
    challenges: ["Impulsive", "Risk-taking", "Easily bored"],
    tips: ["Think before acting", "Manage risk wisely", "Cultivate patience"]
  },
  ESFP: {
    nickname: "The Entertainer",
    description: "ESFPs are sociable, spontaneous, and enthusiastic lovers of life and fun.",
    famousPeople: ["Elvis Presley", "Marilyn Monroe", "Jamie Oliver"],
    strengths: ["Sociable", "Spontaneous", "Enthusiastic"],
    challenges: ["Easily distracted", "Avoids planning", "Sensitive to criticism"],
    tips: ["Practice planning", "Handle criticism constructively", "Improve focus"]
  },
  ENFP: {
    nickname: "The Campaigner",
    description: "ENFPs are enthusiastic, creative, and sociable idealists who inspire others.",
    famousPeople: ["Robin Williams", "Walt Disney", "Jennifer Aniston"],
    strengths: ["Enthusiastic", "Creative", "Sociable"],
    challenges: ["Disorganized", "Overthinks", "Easily stressed"],
    tips: ["Create routines", "Practice mindfulness", "Prioritize tasks"]
  },
  ENTP: {
    nickname: "The Debater",
    description: "ENTPs are innovative, outgoing, and quick-witted thinkers who love challenging ideas.",
    famousPeople: ["Thomas Edison", "Leonardo DiCaprio", "Mark Twain"],
    strengths: ["Innovative", "Outgoing", "Quick-witted"],
    challenges: ["Argumentative", "Easily bored", "Insensitive at times"],
    tips: ["Practice empathy", "Stay focused", "Pick your battles"]
  },
  ESTJ: {
    nickname: "The Executive",
    description: "ESTJs are organized, practical leaders who value tradition and order.",
    famousPeople: ["Hillary Clinton", "Judge Judy", "Frank Sinatra"],
    strengths: ["Organized", "Practical", "Leader"],
    challenges: ["Stubborn", "Judgmental", "Inflexible"],
    tips: ["Stay open-minded", "Practice flexibility", "Value others' opinions"]
  },
  ESFJ: {
    nickname: "The Consul",
    description: "ESFJs are caring, social, and cooperative people who thrive on harmony.",
    famousPeople: ["Taylor Swift", "Bill Clinton", "Jennifer Lopez"],
    strengths: ["Caring", "Social", "Cooperative"],
    challenges: ["Overly sensitive", "Approval-seeking", "Avoids conflict"],
    tips: ["Develop confidence", "Accept criticism", "Address conflicts calmly"]
  },
  ENFJ: {
    nickname: "The Protagonist",
    description: "ENFJs are charismatic, empathetic leaders who inspire and motivate others.",
    famousPeople: ["Barack Obama", "Oprah Winfrey", "Ben Affleck"],
    strengths: ["Charismatic", "Empathetic", "Inspiring"],
    challenges: ["Overly idealistic", "People-pleaser", "Reluctant to delegate"],
    tips: ["Set boundaries", "Delegate tasks", "Balance idealism with realism"]
  },
  ENTJ: {
    nickname: "The Commander",
    description: "ENTJs are strategic, confident, and decisive leaders who excel at organizing.",
    famousPeople: ["Steve Jobs", "Gordon Ramsay", "Margaret Thatcher"],
    strengths: ["Strategic", "Confident", "Decisive"],
    challenges: ["Intolerant", "Stubborn", "Impatient"],
    tips: ["Practice patience", "Listen actively", "Be open to others' ideas"]
  }
};

export async function calculateMBTI(answers: Record<number, number>): Promise<MBTIResult> {
  try {
    console.log('Sending answers to Gemini for analysis:', answers);
    
    // Use Gemini AI to determine personality type
    const { data, error } = await supabase.functions.invoke('gemini-personality', {
      body: { answers, type: 'assessment' }
    });

    if (error) {
      console.error('Gemini API error:', error);
      throw error;
    }

    const geminiType = data.result.replace(/[^A-Z]/g, ''); // Clean response to get just letters
    console.log('Gemini determined type:', geminiType);

    // Validate the type is a real MBTI type
    const validTypes = Object.keys(mbtiProfiles);
    const type = validTypes.includes(geminiType) ? geminiType : 'INTJ'; // Fallback

    const profile = mbtiProfiles[type];

    // Calculate basic dimension scores for display
    const scores = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const counts = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Simple scoring for display purposes
    Object.entries(answers).forEach(([questionId, answer]) => {
      const id = parseInt(questionId);
      if ([1,3,5,21].includes(id)) { scores.I += answer; counts.I++; }
      if ([2,4,28].includes(id)) { scores.E += answer; counts.E++; }
      if ([6,8,10,23,25].includes(id)) { scores.S += answer; counts.S++; }
      if ([7,9,24,30].includes(id)) { scores.N += answer; counts.N++; }
      if ([11,13,15,27].includes(id)) { scores.T += answer; counts.T++; }
      if ([12,14,22,26,29].includes(id)) { scores.F += answer; counts.F++; }
      if ([16,18,20].includes(id)) { scores.J += answer; counts.J++; }
      if ([17,19,30].includes(id)) { scores.P += answer; counts.P++; }
    });

    return {
      type,
      ...profile,
      dimensions: {
        EI: { 
          score: Math.round((scores.E / (counts.E || 1) / (scores.I / (counts.I || 1) + scores.E / (counts.E || 1))) * 100) || 50, 
          preference: type[0] as 'E' | 'I' 
        },
        SN: { 
          score: Math.round((scores.S / (counts.S || 1) / (scores.S / (counts.S || 1) + scores.N / (counts.N || 1))) * 100) || 50, 
          preference: type[1] as 'S' | 'N' 
        },
        TF: { 
          score: Math.round((scores.T / (counts.T || 1) / (scores.T / (counts.T || 1) + scores.F / (counts.F || 1))) * 100) || 50, 
          preference: type[2] as 'T' | 'F' 
        },
        JP: { 
          score: Math.round((scores.J / (counts.J || 1) / (scores.J / (counts.J || 1) + scores.P / (counts.P || 1))) * 100) || 50, 
          preference: type[3] as 'J' | 'P' 
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
  // Initialize dimension scores
  const scores = {
    I: 0, E: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Count questions for each dimension
  const counts = {
    I: 0, E: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Map specific questions to dimensions based on your scoring rules
  const questionMapping: Record<number, { dimension: string; reverse?: boolean }> = {
    // I/E questions - Questions 1,3,5,21,28,29 relate to I/E (lower scores mean Extroversion)
    1: { dimension: 'I' }, // I prefer quiet time alone
    3: { dimension: 'I' }, // I often think before I speak
    5: { dimension: 'I' }, // I prefer deep conversations over small talk
    21: { dimension: 'I' }, // I enjoy solving complex problems more than socializing
    // Questions 2,4,28 relate to E
    2: { dimension: 'E' }, // I find it easy to start conversations
    4: { dimension: 'E' }, // I enjoy being the center of attention
    28: { dimension: 'E' }, // I feel energized after spending time with friends
    29: { dimension: 'I' }, // I often reflect on my emotions deeply

    // S/N questions - Questions 6,8,10,23,25 relate to Sensing
    6: { dimension: 'S' }, // I trust facts and details
    8: { dimension: 'S' }, // I prefer practical tasks
    10: { dimension: 'S' }, // I focus on what is happening now
    23: { dimension: 'S' }, // I am usually punctual and value schedules
    25: { dimension: 'S' }, // I prefer to work in a structured environment
    // Questions 7,9,24,30 relate to Intuition
    7: { dimension: 'N' }, // I often think about future possibilities
    9: { dimension: 'N' }, // I enjoy abstract concepts
    24: { dimension: 'N' }, // I like exploring new ideas
    30: { dimension: 'N' }, // I prefer to keep things flexible

    // T/F questions - Questions 11,13,15,17,27 relate to Thinking
    11: { dimension: 'T' }, // I make decisions based on logic
    13: { dimension: 'T' }, // I can be very objective
    15: { dimension: 'T' }, // I believe truth is more important than tact
    17: { dimension: 'T' }, // I prefer to keep my options open (originally was thinking-related)
    27: { dimension: 'T' }, // I enjoy debating ideas
    // Questions 12,14,26,29 relate to Feeling
    12: { dimension: 'F' }, // I value harmony and try to avoid conflict
    14: { dimension: 'F' }, // I consider others' feelings
    22: { dimension: 'F' }, // I trust my gut feelings
    26: { dimension: 'F' }, // I often put others' needs before my own

    // J/P questions - Questions 16,18,20,23,25 relate to Judging
    16: { dimension: 'J' }, // I like to have a plan
    18: { dimension: 'J' }, // I like to finish tasks well before deadline
    20: { dimension: 'J' }, // I feel uncomfortable when things are unorganized
    // Questions 19,21,24,28 relate to Perceiving
    19: { dimension: 'P' }, // I adapt easily to changes in plans
  };

  // Calculate scores based on the mapping
  Object.entries(answers).forEach(([questionId, answer]) => {
    const id = parseInt(questionId);
    const mapping = questionMapping[id];
    
    if (mapping) {
      const { dimension } = mapping;
      scores[dimension as keyof typeof scores] += answer;
      counts[dimension as keyof typeof counts]++;
    }
  });

  // Calculate averages and determine preferences
  const avgI = counts.I > 0 ? scores.I / counts.I : 0;
  const avgE = counts.E > 0 ? scores.E / counts.E : 0;
  const avgS = counts.S > 0 ? scores.S / counts.S : 0;
  const avgN = counts.N > 0 ? scores.N / counts.N : 0;
  const avgT = counts.T > 0 ? scores.T / counts.T : 0;
  const avgF = counts.F > 0 ? scores.F / counts.F : 0;
  const avgJ = counts.J > 0 ? scores.J / counts.J : 0;
  const avgP = counts.P > 0 ? scores.P / counts.P : 0;

  // Determine preferences (higher average wins)
  const EI = avgI > avgE ? 'I' : 'E';
  const SN = avgS > avgN ? 'S' : 'N';
  const TF = avgT > avgF ? 'T' : 'F';
  const JP = avgJ > avgP ? 'J' : 'P';

  const type = `${EI}${SN}${TF}${JP}`;
  const profile = mbtiProfiles[type] || mbtiProfiles.INTJ; // Fallback

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
