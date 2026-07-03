export const AFFIRMATIONS = [
  "You are capable of amazing things.",
  "This is just a chapter, not your whole story.",
  "You've survived everything life has thrown at you.",
  "Small steps lead to big changes.",
  "Your feelings are valid and matter.",
  "You are doing better than you think.",
  "Every day is a fresh start.",
  "Growth begins at the end of your comfort zone.",
  "You are worthy of peace and happiness.",
  "Be kind to yourself — you're trying your best.",
  "The sun will rise and you will too.",
  "You don't have to be perfect to be amazing.",
  "Your potential is limitless.",
  "Healing is not linear, and that's okay.",
  "You are exactly where you need to be.",
  "Breathe. You've got this.",
  "Your presence is a gift to those around you.",
  "It's okay to not be okay sometimes.",
  "You are stronger than you know.",
  "Today is a new opportunity to grow.",
  "You deserve love and kindness, especially from yourself.",
  "Mistakes are proof that you are trying.",
  "Your voice matters.",
  "You are enough, just as you are.",
];

export function getDailyAffirmation(date = new Date()) {
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length];
}

export function getRandomAffirmation() {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
}
