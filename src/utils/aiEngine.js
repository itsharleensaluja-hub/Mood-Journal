import { extractKeywords, findDominantCategory } from './sentimentAnalyzer';
import { AI_TEMPLATES, BREATHING_EXERCISES } from '../data/aiResponses';
import { getRandomQuote } from '../data/quotes';

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

function extractTopics(text) {
  if (!text) return [];
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  if (sentences.length < 2) return [];

  const topicIndicators = ['work', 'family', 'friend', 'love', 'health', 'project', 'school', 'hobby', 'food', 'travel', 'money', 'goal', 'dream'];
  const words = text.toLowerCase().split(/\s+/);
  const topics = [];

  for (const indicator of topicIndicators) {
    if (words.includes(indicator) && !topics.includes(indicator)) {
      topics.push(indicator);
    }
  }

  return topics.slice(0, 2);
}

export function generateAiResponse({ text, moodId, userName }) {
  const name = userName || 'there';
  const keywords = extractKeywords(text);
  const dominantCategory = findDominantCategory(keywords, moodId);
  const timeOfDay = getTimeOfDay();
  const topics = extractTopics(text);

  const reflectionTemplates = getTemplates(dominantCategory, 'reflection');
  let reflection = pickRandom(reflectionTemplates)
    .replace(/{name}/g, name)
    .replace(/{timeOfDay}/g, timeOfDay);

  if (topics.length > 0 && !reflection.includes('{topic}')) {
    const topicRefs = {
      work: 'your work',
      family: 'your family',
      friend: 'your friendships',
      love: 'love and relationships',
      health: 'your health',
      project: 'your projects',
      school: 'your studies',
      hobby: 'your hobbies',
      food: 'food',
      travel: 'travel',
      money: 'finances',
      goal: 'your goals',
      dream: 'your dreams',
    };
    const topicName = topicRefs[topics[0]] || topics[0];
    if (!reflection.includes(topicName)) {
      reflection += ` I noticed you mentioned ${topicName} — that's an important part of your story right now.`;
    }
  }

  const affirmation = pickRandom(getTemplates(dominantCategory, 'affirmation'));
  const goal = pickRandom(getTemplates(dominantCategory, 'goal'));

  const breathingKey = AI_TEMPLATES[dominantCategory]?.breathing || 'simple';
  const breathing = BREATHING_EXERCISES[breathingKey] || BREATHING_EXERCISES.simple;

  const quote = getRandomQuote();

  const moodMap = {
    happy: "joy and positivity",
    calm: "peace and serenity",
    neutral: "quiet reflection",
    sad: "gentle sadness",
    angry: "strong emotion",
    anxious: "unease and restlessness",
    excited: "enthusiasm and energy",
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
