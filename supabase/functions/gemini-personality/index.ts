
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, type } = await req.json();
    const apiKey = 'AIzaSyCYEPPtZ59X7W0CbVzYNChgObjNwRQknFU';

    console.log('Received request:', { type, answers: typeof answers });

    // Create prompt for Gemini based on user answers
    let prompt = '';
    
    if (type === 'assessment') {
      prompt = `Based on these MBTI test responses (1=Strongly Disagree, 5=Strongly Agree), determine the most accurate MBTI personality type and provide comprehensive personality analysis:

${Object.entries(answers).map(([questionId, answer], index) => {
  const questions = [
    "I prefer quiet time alone to recharge rather than social gatherings.",
    "I find it easy to start conversations with strangers.", 
    "I often think before I speak.",
    "I enjoy being the center of attention.",
    "I prefer deep conversations over small talk.",
    "I trust facts and details more than theories and ideas.",
    "I often think about future possibilities more than present realities.",
    "I prefer practical tasks to imaginative brainstorming.",
    "I enjoy abstract concepts and symbolism.",
    "I focus on what is happening now rather than what might happen later.",
    "I make decisions based on logic rather than emotions.",
    "I value harmony and try to avoid conflict.",
    "I can be very objective, even if it hurts someone's feelings.",
    "I consider others' feelings when making decisions.",
    "I believe truth is more important than tact.",
    "I like to have a plan rather than be spontaneous.",
    "I prefer to keep my options open as long as possible.",
    "I like to finish tasks well before the deadline.",
    "I adapt easily to changes in plans.",
    "I feel uncomfortable when things are unorganized.",
    "I enjoy solving complex problems more than socializing.",
    "I trust my gut feelings more than logical analysis.",
    "I am usually punctual and value schedules.",
    "I like exploring new ideas, even if they seem impractical.",
    "I prefer to work in a structured environment.",
    "I often put others' needs before my own.",
    "I enjoy debating ideas to find the best answer.",
    "I feel energized after spending time with friends.",
    "I often reflect on my emotions deeply.",
    "I prefer to keep things flexible and open-ended."
  ];
  return `Q${parseInt(questionId)}: ${questions[parseInt(questionId) - 1]} - Answer: ${answer}`;
}).join('\n')}

Analyze these responses and provide a comprehensive personality analysis in the following JSON format:
{
  "type": "FOUR_LETTER_TYPE",
  "nickname": "The Personality Nickname",
  "description": "Detailed description of this personality type",
  "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5"],
  "challenges": ["challenge1", "challenge2", "challenge3", "challenge4"],
  "famousPeople": ["person1", "person2", "person3"],
  "tips": ["tip1", "tip2", "tip3", "tip4"]
}

Make sure to:
- Analyze the responses carefully considering that Questions 1,3,5,21,29 lean toward Introversion, 2,4,28 toward Extroversion
- Questions 6,8,10,23,25 lean toward Sensing, 7,9,24,30 toward Intuition  
- Questions 11,13,15,27 lean toward Thinking, 12,14,22,26,29 toward Feeling
- Questions 16,18,20,23,25 lean toward Judging, 17,19,24,30 toward Perceiving
- Provide accurate personality insights based on the actual responses
- Return ONLY valid JSON, no additional text`;
    } else {
      // Chat mode - enhanced for personality-focused conversations
      prompt = `You are NeuroChat, a friendly and insightful AI personality coach specialized in MBTI psychology. Your role is to provide warm, encouraging, and personalized guidance about personality development, relationships, career insights, and self-understanding.

${answers}

Respond in a conversational, supportive tone. Focus on:
- Providing actionable insights about their personality type
- Helping them understand their strengths and growth areas
- Offering practical tips for personal development
- Discussing how their type impacts relationships and career
- Being encouraging and positive while being authentic

Keep responses under 150 words and make them feel heard and understood. Use emojis sparingly but effectively. If they mention their personality type, reference it specifically in your advice.`;
    }

    console.log('Sending request to Gemini API...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: type === 'assessment' ? 0.1 : 0.7,
          maxOutputTokens: type === 'assessment' ? 1000 : 300,
          topP: 0.8,
          topK: 10
        }
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response data:', JSON.stringify(data, null, 2));

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Unexpected Gemini API response structure:', data);
      throw new Error('Invalid response structure from Gemini API');
    }

    const result = data.candidates[0].content.parts[0].text.trim();
    console.log('Extracted result:', result);

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-personality function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
