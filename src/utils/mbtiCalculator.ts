
import { mbtiQuestions } from "@/data/mbtiQuestions";

export interface MBTIResult {
  type: string;
  description: string;
  strengths: string[];
  challenges: string[];
  famousPeople: string[];
  dimensions: {
    EI: { score: number; preference: 'E' | 'I' };
    SN: { score: number; preference: 'S' | 'N' };
    TF: { score: number; preference: 'T' | 'F' };
    JP: { score: number; preference: 'J' | 'P' };
  };
}

const mbtiProfiles: Record<string, Omit<MBTIResult, 'type' | 'dimensions'>> = {
  INTJ: {
    description: "The Architect - Strategic and imaginative, you see the big picture and work systematically to achieve your vision.",
    strengths: ["Strategic thinking", "Independent", "Determined"],
    challenges: ["Can be overly critical", "Difficulty with emotions", "Impatient with inefficiency"],
    famousPeople: ["Elon Musk", "Stephen Hawking", "Nikola Tesla"]
  },
  INTP: {
    description: "The Thinker - Innovative and curious, you love exploring theories and finding logical explanations.",
    strengths: ["Analytical", "Creative problem-solving", "Objective"],
    challenges: ["Procrastination", "Difficulty with routine", "Can seem detached"],
    famousPeople: ["Albert Einstein", "Bill Gates", "Marie Curie"]
  },
  ENTJ: {
    description: "The Commander - Natural leader who thrives on challenges and organizing people toward goals.",
    strengths: ["Leadership", "Strategic", "Confident"],
    challenges: ["Can be dominating", "Impatient", "Overly critical"],
    famousPeople: ["Steve Jobs", "Gordon Ramsay", "Margaret Thatcher"]
  },
  ENTP: {
    description: "The Debater - Quick-witted and clever, you love mental sparring and exploring new possibilities.",
    strengths: ["Innovative", "Enthusiastic", "Versatile"],
    challenges: ["Difficulty following through", "Can be argumentative", "Easily bored"],
    famousPeople: ["Mark Twain", "Richard Feynman", "Walt Disney"]
  },
  INFJ: {
    description: "The Advocate - Compassionate and insightful, you're driven by your values and vision for humanity.",
    strengths: ["Empathetic", "Insightful", "Determined"],
    challenges: ["Perfectionist", "Sensitive to criticism", "Can burn out"],
    famousPeople: ["Martin Luther King Jr.", "Maya Angelou", "Nelson Mandela"]
  },
  INFP: {
    description: "The Mediator - Idealistic and caring, you're guided by your values and desire to help others.",
    strengths: ["Creative", "Empathetic", "Authentic"],
    challenges: ["Overly idealistic", "Takes things personally", "Difficulty with criticism"],
    famousPeople: ["William Shakespeare", "Johnny Depp", "J.R.R. Tolkien"]
  },
  ENFJ: {
    description: "The Protagonist - Charismatic and inspiring, you're motivated to help others reach their potential.",
    strengths: ["Inspiring", "Empathetic", "Natural leader"],
    challenges: ["Can be overly idealistic", "Takes on too much", "Sensitive to conflict"],
    famousPeople: ["Oprah Winfrey", "Barack Obama", "John Lennon"]
  },
  ENFP: {
    description: "The Campaigner - Enthusiastic and creative, you see life as a big, complex puzzle with endless possibilities.",
    strengths: ["Enthusiastic", "Creative", "People-focused"],
    challenges: ["Difficulty with routine", "Can be overly emotional", "Struggles with follow-through"],
    famousPeople: ["Robin Williams", "Ellen DeGeneres", "Will Smith"]
  },
  ISTJ: {
    description: "The Logistician - Practical and responsible, you believe in getting things done through hard work and dedication.",
    strengths: ["Reliable", "Practical", "Detail-oriented"],
    challenges: ["Resistant to change", "Can be stubborn", "Difficulty expressing emotions"],
    famousPeople: ["Warren Buffett", "George Washington", "Queen Elizabeth II"]
  },
  ISFJ: {
    description: "The Protector - Warm and caring, you're always ready to protect and care for those you love.",
    strengths: ["Supportive", "Reliable", "Patient"],
    challenges: ["Difficulty saying no", "Takes things personally", "Reluctant to change"],
    famousPeople: ["Mother Teresa", "Kate Middleton", "Jimmy Carter"]
  },
  ESTJ: {
    description: "The Executive - Organized and decisive, you love bringing order to chaotic situations.",
    strengths: ["Organized", "Practical", "Loyal"],
    challenges: ["Can be inflexible", "Difficulty with emotions", "Impatient with inefficiency"],
    famousPeople: ["Judge Judy", "Frank Sinatra", "Vince Lombardi"]
  },
  ESFJ: {
    description: "The Consul - Caring and social, you gain energy from helping others and creating harmony.",
    strengths: ["Supportive", "Loyal", "Practical"],
    challenges: ["Needs approval", "Difficulty with conflict", "Can be controlling"],
    famousPeople: ["Taylor Swift", "Danny DeVito", "Hugh Jackman"]
  },
  ISTP: {
    description: "The Virtuoso - Bold and practical, you're a master of tools and techniques, both physical and theoretical.",
    strengths: ["Practical", "Flexible", "Crisis management"],
    challenges: ["Difficulty with emotions", "Can be insensitive", "Easily bored"],
    famousPeople: ["Clint Eastwood", "Bear Grylls", "Scarlett Johansson"]
  },
  ISFP: {
    description: "The Adventurer - Flexible and charming, you always seek harmony and new possibilities.",
    strengths: ["Artistic", "Flexible", "Warm"],
    challenges: ["Overly competitive", "Difficulty with planning", "Stress under pressure"],
    famousPeople: ["Michael Jackson", "Brad Pitt", "Frida Kahlo"]
  },
  ESTP: {
    description: "The Entrepreneur - Bold and perceptive, you live in the moment and dive into action.",
    strengths: ["Energetic", "Practical", "Spontaneous"],
    challenges: ["Impatient", "Risk-taking", "Difficulty with long-term planning"],
    famousPeople: ["Donald Trump", "Ernest Hemingway", "Madonna"]
  },
  ESFP: {
    description: "The Entertainer - Spontaneous and enthusiastic, you love life, new experiences, and working with others.",
    strengths: ["Enthusiastic", "Flexible", "People skills"],
    challenges: ["Difficulty with criticism", "Poor long-term planning", "Easily stressed"],
    famousPeople: ["Marilyn Monroe", "Justin Bieber", "Katy Perry"]
  }
};

export function calculateMBTI(answers: Record<number, number>): MBTIResult {
  // Initialize dimension scores
  const scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  // Calculate scores for each dimension
  mbtiQuestions.forEach(question => {
    const answer = answers[question.id];
    if (!answer) return;

    const { dimension, reverse } = question;
    const score = reverse ? 6 - answer : answer; // Reverse scoring if needed

    switch (dimension) {
      case 'EI':
        scores.E += score;
        scores.I += 6 - score;
        break;
      case 'SN':
        scores.N += score;
        scores.S += 6 - score;
        break;
      case 'TF':
        scores.F += score;
        scores.T += 6 - score;
        break;
      case 'JP':
        scores.P += score;
        scores.J += 6 - score;
        break;
    }
  });

  // Determine preferences
  const EI = scores.E > scores.I ? 'E' : 'I';
  const SN = scores.S > scores.N ? 'S' : 'N';
  const TF = scores.T > scores.F ? 'T' : 'F';
  const JP = scores.J > scores.P ? 'J' : 'P';

  const type = `${EI}${SN}${TF}${JP}`;
  const profile = mbtiProfiles[type] || mbtiProfiles.INTJ; // Fallback

  return {
    type,
    ...profile,
    dimensions: {
      EI: { score: Math.round((scores.E / (scores.E + scores.I)) * 100), preference: EI },
      SN: { score: Math.round((scores.S / (scores.S + scores.N)) * 100), preference: SN },
      TF: { score: Math.round((scores.T / (scores.T + scores.F)) * 100), preference: TF },
      JP: { score: Math.round((scores.J / (scores.J + scores.P)) * 100), preference: JP }
    }
  };
}
