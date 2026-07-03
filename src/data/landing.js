export const FEATURES = [
  {
    icon: 'HiOutlineHeart',
    title: 'Mood Tracking',
    description: 'Log your emotions with a simple tap. Build a rich picture of your emotional landscape over time.',
    color: 'plum',
  },
  {
    icon: 'HiOutlineChartBar',
    title: 'Smart Analytics',
    description: 'Visualize patterns in your emotional data. Discover what influences your mood and when.',
    color: 'herb',
  },
  {
    icon: 'HiOutlineSparkles',
    title: 'AI Reflections',
    description: 'Receive gentle, personalized insights based on your journal entries. Feel truly understood.',
    color: 'plum',
  },
  {
    icon: 'HiOutlineSun',
    title: 'Emotion Garden',
    description: 'Watch your garden bloom as you build consistency. Your dedication creates something beautiful.',
    color: 'clay',
  },
  {
    icon: 'HiOutlineMoon',
    title: 'Dark Mode',
    description: 'Beautiful dark mode for late-night reflections. Easy on the eyes in every light.',
    color: 'plum',
  },
  {
    icon: 'HiOutlineLockClosed',
    title: 'Private & Safe',
    description: 'Your data never leaves your device. No servers, no accounts, no tracking. Yours alone.',
    color: 'herb',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Log Your Mood',
    description: 'Select how you\'re feeling from our curated set of emotions. Takes just a moment.',
    emoji: '😊',
  },
  {
    step: 2,
    title: 'Journal Your Day',
    description: 'Write a few sentences about your day. No pressure — just honest expression.',
    emoji: '📝',
  },
  {
    step: 3,
    title: 'Receive AI Insights',
    description: 'Get personalized reflections and affirmations tailored to your emotional state.',
    emoji: '✨',
  },
  {
    step: 4,
    title: 'Watch It Grow',
    description: 'See your emotional garden flourish as you build your journaling streak.',
    emoji: '🌳',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    quote: "MindPulse has completely transformed how I understand my emotions. The AI reflections feel like talking to a friend who truly gets me.",
    rating: 5,
    initials: 'SC',
  },
  {
    name: 'James Rivera',
    role: 'Software Engineer',
    quote: "I've tried many journaling apps, but nothing comes close to this. The Emotion Garden keeps me motivated, and the analytics are eye-opening.",
    rating: 5,
    initials: 'JR',
  },
  {
    name: "Emily O'Brien",
    role: 'Therapist',
    quote: "I recommend MindPulse to my clients. It's a beautiful tool for building emotional awareness and consistency in self-reflection.",
    rating: 5,
    initials: 'EO',
  },
];

export const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Resources: [
    { label: 'Guides', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Support', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Licenses', href: '#' },
  ],
};

export const PREVIEW_ENTRIES = [
  { time: '2:30 PM', moodId: 'calm', text: 'Feeling calm after a productive morning. Finished the report ahead of schedule.' },
  { time: '8:15 AM', moodId: 'neutral', text: 'Started the day with meditation. A bit anxious but feeling prepared.' },
];

export const PREVIEW_ACTIVITY = [
  { action: 'Logged mood', detail: 'Calm', time: '2:30 PM' },
  { action: 'Wrote journal', detail: '254 words', time: '2:35 PM' },
  { action: 'Streak updated', detail: '7 days', time: '12:00 AM' },
];

export const PREVIEW_WEEKLY = [
  { day: 'M', value: 60, emoji: '😀' },
  { day: 'T', value: 80, emoji: '😊' },
  { day: 'W', value: 70, emoji: '😊' },
  { day: 'T', value: 90, emoji: '😀' },
  { day: 'F', value: 45, emoji: '😢' },
  { day: 'S', value: 65, emoji: '😰' },
  { day: 'S', value: 85, emoji: '😊' },
];

export const AI_SHOWCASE = {
  moodId: 'calm',
  time: '2:30 PM',
  entry: 'Today was productive. Finished the report ahead of schedule. Went for a walk in the park and felt the fresh air.',
  reflection: 'You seem calm and centered today. Your entry shows a pattern of gratitude for small wins — this is strengthening your emotional resilience.',
  trendPercentage: 40,
  trendLabel: 'Calm days are trending +40% this week',
  insight: 'Continue your evening wind-down routine. Your meditation practice is directly correlated with calmer, more productive days.',
};

export const GARDEN_SHOWCASE = {
  streak: 7,
  currentStageId: 'plant',
  nextStageId: 'bloom',
  daysToNext: 1,
  progress: 87,
};
