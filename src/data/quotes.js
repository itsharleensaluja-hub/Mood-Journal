export const QUOTES = [
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "Almost everything will work again if you unplug it for a few minutes. Including you.", author: "Anne Lamott" },
  { text: "Feelings are just visitors, let them come and go.", author: "Mooji" },
  { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "Stars can't shine without darkness.", author: "Unknown" },
  { text: "Every storm runs out of rain.", author: "Maya Angelou" },
  { text: "You are not your feelings. You are the sky. Everything else is just the weather.", author: "Pema Chödrön" },
  { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black" },
  { text: "The emotion that can break your heart is sometimes the very one that heals it.", author: "Nicholas Sparks" },
  { text: "Nothing can dim the light that shines from within.", author: "Maya Angelou" },
  { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
  { text: "Feelings are much like waves, we can't stop them from coming but we can choose which one to surf.", author: "Jonatan Mårtensson" },
  { text: "The thought manifests as the word. The word manifests as the deed.", author: "Buddha" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "This too shall pass.", author: "Persian Proverb" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Let go of the thoughts that no longer serve you.", author: "Unknown" },
  { text: "You are the author of your own story.", author: "Unknown" },
  { text: "Breathe in courage, breathe out fear.", author: "Unknown" },
  { text: "Every heartbeat is a fresh beginning.", author: "Rumi" },
  { text: "The wound is the place where the Light enters you.", author: "Rumi" },
  { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi" },
  { text: "Don't let the behavior of others destroy your inner peace.", author: "Dalai Lama" },
  { text: "Just when the caterpillar thought the world was over, it became a butterfly.", author: "Anonymous" },
];

export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

export function getQuotesByCategory(_category) {
  return QUOTES;
}
