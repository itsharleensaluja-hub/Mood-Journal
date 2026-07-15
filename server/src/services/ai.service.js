import { extractKeywords, findDominantCategory } from './ai/sentimentAnalyzer.js';
import { AI_TEMPLATES, BREATHING_EXERCISES } from './ai/aiResponses.js';
import { getRandomQuote } from './ai/quotes.js';

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

function getTemplates(category, type) {
  const catData = AI_TEMPLATES[category];
  if (!catData || !catData[type]) {
    return AI_TEMPLATES.default[type] || [];
  }
  return catData[type];
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateAiResponse({ text, moodId, userName }) {
  const name = userName || 'there';
  const keywords = extractKeywords(text);
  const dominantCategory = findDominantCategory(keywords, moodId);
  const timeOfDay = getTimeOfDay();

  const reflectionTemplates = getTemplates(dominantCategory, 'reflection');
  let reflection = pickRandom(reflectionTemplates)
    .replace(/{name}/g, name)
    .replace(/{timeOfDay}/g, timeOfDay);

  const affirmation = pickRandom(getTemplates(dominantCategory, 'affirmation'));
  const goal = pickRandom(getTemplates(dominantCategory, 'goal'));

  const breathingKey = AI_TEMPLATES[dominantCategory]?.breathing || 'simple';
  const breathing = BREATHING_EXERCISES[breathingKey] || BREATHING_EXERCISES.simple;

  const quote = getRandomQuote();

  const moodMap = {
    happy: 'joy and positivity',
    calm: 'peace and serenity',
    neutral: 'quiet reflection',
    sad: 'gentle sadness',
    angry: 'strong emotion',
    anxious: 'unease and restlessness',
    excited: 'enthusiasm and energy',
  };

  const personalReflection = `Today you're feeling ${
    moodMap[moodId] || 'a mix of emotions'
  }. ${reflection.split('.')[0]}.`;

  return {
    reflection: personalReflection,
    fullReflection: reflection,
    affirmation,
    goal,
    breathing,
    quote,
    category: dominantCategory,
  };
}
