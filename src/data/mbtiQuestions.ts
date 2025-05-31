export interface MBTIQuestion {
  id: number;
  textKey: string;
  fallbackText: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  reverse?: boolean;
}

export const mbtiQuestions: MBTIQuestion[] = [
  { id: 1, textKey: "questions.1", fallbackText: "I prefer quiet time alone to recharge rather than social gatherings.", dimension: 'EI' },
  { id: 2, textKey: "questions.2", fallbackText: "I find it easy to start conversations with strangers.", dimension: 'EI', reverse: true },
  { id: 3, textKey: "questions.3", fallbackText: "I often think before I speak.", dimension: 'EI' },
  { id: 4, textKey: "questions.4", fallbackText: "I enjoy being the center of attention.", dimension: 'EI', reverse: true },
  { id: 5, textKey: "questions.5", fallbackText: "I prefer deep conversations over small talk.", dimension: 'EI' },
  
  { id: 6, textKey: "questions.6", fallbackText: "I trust facts and details more than theories and ideas.", dimension: 'SN', reverse: true },
  { id: 7, textKey: "questions.7", fallbackText: "I often think about future possibilities more than present realities.", dimension: 'SN' },
  { id: 8, textKey: "questions.8", fallbackText: "I prefer practical tasks to imaginative brainstorming.", dimension: 'SN', reverse: true },
  { id: 9, textKey: "questions.9", fallbackText: "I enjoy abstract concepts and symbolism.", dimension: 'SN' },
  { id: 10, textKey: "questions.10", fallbackText: "I focus on what is happening now rather than what might happen later.", dimension: 'SN', reverse: true },
  
  { id: 11, textKey: "questions.11", fallbackText: "I make decisions based on logic rather than emotions.", dimension: 'TF', reverse: true },
  { id: 12, textKey: "questions.12", fallbackText: "I value harmony and try to avoid conflict.", dimension: 'TF' },
  { id: 13, textKey: "questions.13", fallbackText: "I can be very objective, even if it hurts someone's feelings.", dimension: 'TF', reverse: true },
  { id: 14, textKey: "questions.14", fallbackText: "I consider others' feelings when making decisions.", dimension: 'TF' },
  { id: 15, textKey: "questions.15", fallbackText: "I believe truth is more important than tact.", dimension: 'TF', reverse: true },
  
  { id: 16, textKey: "questions.16", fallbackText: "I like to have a plan rather than be spontaneous.", dimension: 'JP', reverse: true },
  { id: 17, textKey: "questions.17", fallbackText: "I prefer to keep my options open as long as possible.", dimension: 'TF', reverse: true },
  { id: 18, textKey: "questions.18", fallbackText: "I like to finish tasks well before the deadline.", dimension: 'JP', reverse: true },
  { id: 19, textKey: "questions.19", fallbackText: "I adapt easily to changes in plans.", dimension: 'JP' },
  { id: 20, textKey: "questions.20", fallbackText: "I feel uncomfortable when things are unorganized.", dimension: 'JP', reverse: true },
  
  { id: 21, textKey: "questions.21", fallbackText: "I enjoy solving complex problems more than socializing.", dimension: 'EI' },
  { id: 22, textKey: "questions.22", fallbackText: "I trust my gut feelings more than logical analysis.", dimension: 'TF' },
  { id: 23, textKey: "questions.23", fallbackText: "I am usually punctual and value schedules.", dimension: 'JP', reverse: true },
  { id: 24, textKey: "questions.24", fallbackText: "I like exploring new ideas, even if they seem impractical.", dimension: 'JP' },
  { id: 25, textKey: "questions.25", fallbackText: "I prefer to work in a structured environment.", dimension: 'JP', reverse: true },
  
  { id: 26, textKey: "questions.26", fallbackText: "I often put others' needs before my own.", dimension: 'TF' },
  { id: 27, textKey: "questions.27", fallbackText: "I enjoy debating ideas to find the best answer.", dimension: 'TF', reverse: true },
  { id: 28, textKey: "questions.28", fallbackText: "I feel energized after spending time with friends.", dimension: 'EI', reverse: true },
  { id: 29, textKey: "questions.29", fallbackText: "I often reflect on my emotions deeply.", dimension: 'TF' },
  { id: 30, textKey: "questions.30", fallbackText: "I prefer to keep things flexible and open-ended.", dimension: 'JP' }
];
