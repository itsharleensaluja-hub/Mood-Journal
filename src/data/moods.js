export const MOODS = [
  { id: 'happy', emoji: '😀', label: 'Happy', color: '#FBBF24', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  { id: 'calm', emoji: '😊', label: 'Calm', color: '#6EE7B7', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 'neutral', emoji: '😐', label: 'Neutral', color: '#9CA3AF', bgColor: 'bg-gray-50 dark:bg-gray-800/20' },
  { id: 'sad', emoji: '😔', label: 'Sad', color: '#93C5FD', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  { id: 'angry', emoji: '😡', label: 'Angry', color: '#FCA5A5', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#C4B5FD', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  { id: 'excited', emoji: '😍', label: 'Excited', color: '#F9A8D4', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
];

export function getMoodById(id) {
  return MOODS.find(m => m.id === id) || MOODS[2];
}

export function getMoodColor(moodId) {
  const mood = getMoodById(moodId);
  return mood ? mood.color : '#9CA3AF';
}
