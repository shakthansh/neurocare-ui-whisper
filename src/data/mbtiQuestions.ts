
export interface MBTIQuestion {
  id: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  reverse?: boolean;
}

export const mbtiQuestions: MBTIQuestion[] = [
  // Extraversion vs Introversion (EI)
  { id: 1, text: "I enjoy being the center of attention at social gatherings.", dimension: 'EI' },
  { id: 2, text: "I prefer working alone rather than in a team.", dimension: 'EI', reverse: true },
  { id: 3, text: "I feel energized after spending time with a large group of people.", dimension: 'EI' },
  { id: 4, text: "I need quiet time to recharge after social interactions.", dimension: 'EI', reverse: true },
  { id: 5, text: "I often speak before thinking things through.", dimension: 'EI' },
  { id: 6, text: "I prefer to think carefully before speaking in meetings.", dimension: 'EI', reverse: true },
  { id: 7, text: "I make friends easily in new environments.", dimension: 'EI' },
  { id: 8, text: "I prefer having a few close friends rather than many acquaintances.", dimension: 'EI', reverse: true },

  // Sensing vs Intuition (SN)
  { id: 9, text: "I focus on concrete facts and details when making decisions.", dimension: 'SN', reverse: true },
  { id: 10, text: "I enjoy exploring new possibilities and future potential.", dimension: 'SN' },
  { id: 11, text: "I prefer practical, hands-on learning over theoretical concepts.", dimension: 'SN', reverse: true },
  { id: 12, text: "I often get lost in my imagination and ideas.", dimension: 'SN' },
  { id: 13, text: "I value tradition and established ways of doing things.", dimension: 'SN', reverse: true },
  { id: 14, text: "I enjoy brainstorming and generating creative solutions.", dimension: 'SN' },
  { id: 15, text: "I prefer step-by-step instructions over general guidelines.", dimension: 'SN', reverse: true },
  { id: 16, text: "I'm more interested in the big picture than specific details.", dimension: 'SN' },

  // Thinking vs Feeling (TF)
  { id: 17, text: "I make decisions based on logical analysis rather than personal values.", dimension: 'TF', reverse: true },
  { id: 18, text: "I consider how my decisions will affect other people's feelings.", dimension: 'TF' },
  { id: 19, text: "I believe being honest is more important than being tactful.", dimension: 'TF', reverse: true },
  { id: 20, text: "I try to maintain harmony in my relationships.", dimension: 'TF' },
  { id: 21, text: "I critique ideas objectively, even if it might hurt someone's feelings.", dimension: 'TF', reverse: true },
  { id: 22, text: "I'm naturally empathetic and sensitive to others' emotions.", dimension: 'TF' },
  { id: 23, text: "I value fairness and justice over compassion.", dimension: 'TF', reverse: true },
  { id: 24, text: "I often put others' needs before my own.", dimension: 'TF' },

  // Judging vs Perceiving (JP)
  { id: 25, text: "I prefer to plan my day in advance rather than be spontaneous.", dimension: 'JP', reverse: true },
  { id: 26, text: "I enjoy keeping my options open and being flexible.", dimension: 'JP' },
  { id: 27, text: "I feel stressed when I have too many unfinished tasks.", dimension: 'JP', reverse: true },
  { id: 28, text: "I work well under pressure and close to deadlines.", dimension: 'JP' },
  { id: 29, text: "I like to have a clear schedule and stick to it.", dimension: 'JP', reverse: true },
  { id: 30, text: "I enjoy exploring different approaches to solve problems.", dimension: 'JP' }
];
