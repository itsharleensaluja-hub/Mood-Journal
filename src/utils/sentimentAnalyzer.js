const KEYWORD_MAP = {
  stress: ['overwhelmed', 'tired', 'stressed', 'busy', 'exhausted', 'pressure', 'deadline', 'burnout', 'overworked', 'anxious', 'worried', 'panic', 'fear', 'nervous'],
  happy: ['happy', 'great', 'wonderful', 'amazing', 'grateful', 'joy', 'blessed', 'fantastic', 'beautiful', 'delighted', 'thrilled', 'wonderful'],
  lonely: ['alone', 'lonely', 'miss', 'isolated', 'distant', 'disconnected', 'solitary', 'abandoned', 'forgotten'],
  anxious: ['anxious', 'worried', 'nervous', 'scared', 'panic', 'fear', 'uneasy', 'restless', 'tense', 'on edge', 'terrified', 'overthinking'],
  motivated: ['motivated', 'inspired', 'determined', 'focused', 'productive', 'energized', 'driven', 'ambitious', 'ready', 'empowered'],
  sad: ['sad', 'down', 'cry', 'crying', 'disappointed', 'hurt', 'heartbroken', 'low', 'depressed', 'heavy', 'grief', 'melancholy'],
  calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'content', 'balanced', 'centered', 'still', 'quiet', 'mindful'],
  grateful: ['grateful', 'thankful', 'blessed', 'appreciate', 'fortunate', 'gratitude', 'thankful', 'lucky', 'blessing'],
};

const WORDS_CACHE = new Map();

function tokenize(text) {
  if (WORDS_CACHE.has(text)) return WORDS_CACHE.get(text);
  const words = text.toLowerCase()
    .replace(/[.,!?;:'"()\[\]{}]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  WORDS_CACHE.set(text, words);
  if (WORDS_CACHE.size > 100) WORDS_CACHE.clear();
  return words;
}

export function extractKeywords(text) {
  if (!text || typeof text !== 'string') return [];
  const words = tokenize(text);
  const found = new Set();

  for (const word of words) {
    for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
      for (const kw of keywords) {
        if (word.includes(kw) || kw.includes(word)) {
          found.add(category);
          break;
        }
      }
    }
  }

  return Array.from(found);
}

export function findDominantCategory(keywords, moodId) {
  if (keywords.length === 0) {
    const moodCategoryMap = {
      happy: 'happy',
      calm: 'calm',
      neutral: 'default',
      sad: 'sad',
      angry: 'stress',
      anxious: 'anxious',
      excited: 'happy',
    };
    return moodCategoryMap[moodId] || 'default';
  }

  const counts = {};
  for (const kw of keywords) {
    counts[kw] = (counts[kw] || 0) + 1;
  }

  let maxCount = 0;
  let dominant = 'default';
  for (const [cat, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      dominant = cat;
    }
  }

  return dominant;
}

export function analyzeSentiment(text) {
  const keywords = extractKeywords(text);
  const dominant = findDominantCategory(keywords);

  const sentimentScores = {
    happy: 0.8,
    grateful: 0.7,
    calm: 0.6,
    motivated: 0.7,
    default: 0.5,
    lonely: 0.3,
    sad: 0.2,
    anxious: 0.25,
    stress: 0.2,
  };

  return {
    dominant,
    score: sentimentScores[dominant] || 0.5,
    keywords,
  };
}
