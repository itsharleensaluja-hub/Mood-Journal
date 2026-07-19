export const WELLNESS_QUIZ = {
  title: 'Mindful Check-In',
  description: 'A quick self-assessment to understand your current state of mind and discover personalized wellness recommendations.',
  questions: [
    {
      id: 'energy',
      text: 'How would you describe your energy level right now?',
      options: [
        { value: 5, label: 'Buzzing — I feel energized and alert' },
        { value: 4, label: 'Good — steady and focused' },
        { value: 3, label: 'Okay — a bit tired but managing' },
        { value: 2, label: 'Low — drained and sluggish' },
        { value: 1, label: 'Exhausted — running on empty' },
      ],
    },
    {
      id: 'anxiety',
      text: 'How would you rate your current stress or anxiety level?',
      options: [
        { value: 5, label: 'Very calm — I feel peaceful and relaxed' },
        { value: 4, label: 'Mild — a few small worries, but manageable' },
        { value: 3, label: 'Moderate — some tension I can feel' },
        { value: 2, label: 'High — my mind is racing' },
        { value: 1, label: 'Overwhelming — I feel very anxious' },
      ],
    },
    {
      id: 'focus',
      text: 'How well can you focus on a single task right now?',
      options: [
        { value: 5, label: 'Deeply focused — in a flow state' },
        { value: 4, label: 'Pretty well — minor distractions' },
        { value: 3, label: 'Somewhat — my mind wanders now and then' },
        { value: 2, label: 'Struggling — easily distracted' },
        { value: 1, label: 'Very scattered — cannot concentrate' },
      ],
    },
    {
      id: 'body',
      text: 'How does your body feel physically?',
      options: [
        { value: 5, label: 'Relaxed and comfortable' },
        { value: 4, label: 'Mostly relaxed, slight tension' },
        { value: 3, label: 'Some tightness or discomfort' },
        { value: 2, label: 'Noticeably tense or sore' },
        { value: 1, label: 'Very tense, aching, or restless' },
      ],
    },
    {
      id: 'mood',
      text: 'Which word best describes your overall mood?',
      options: [
        { value: 5, label: 'Joyful / Content' },
        { value: 4, label: 'Hopeful / Optimistic' },
        { value: 3, label: 'Neutral / Okay' },
        { value: 2, label: 'Low / Heavy' },
        { value: 1, label: 'Irritable / Down' },
      ],
    },
  ],
  getScore(answers) {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const max = 25;
    const percent = Math.round((total / max) * 100);
    return percent;
  },
  getResult(score) {
    if (score >= 80) {
      return {
        level: 'Thriving',
        color: 'herb',
        icon: '🌿',
        summary: "You're in a great place! Your mind and body are balanced.",
        recommendation: 'Channel this energy into creative work or helping others. A short gratitude meditation can deepen this positive state.',
        suggestedActivity: 'meditation',
      };
    }
    if (score >= 60) {
      return {
        level: 'Balanced',
        color: 'plum',
        icon: '⚖️',
        summary: "You're doing well with some room for gentle care.",
        recommendation: 'Try a 5-minute breathing exercise to maintain your balance. A calming soundscape can help you stay centered.',
        suggestedActivity: 'breathing',
      };
    }
    if (score >= 40) {
      return {
        level: 'Stretched',
        color: 'brass',
        icon: '🌤',
        summary: "You're managing, but could use some mindful restoration.",
        recommendation: 'A guided meditation or gentle bubble game can help release tension. Take 10 minutes just for yourself.',
        suggestedActivity: 'meditation',
      };
    }
    if (score >= 20) {
      return {
        level: 'Strained',
        color: 'clay',
        icon: '🌱',
        summary: "You're carrying a heavy load. Small steps help.",
        recommendation: 'Start with something light — try the calming bubble game for 60 seconds, then a short breathing exercise. Be gentle with yourself.',
        suggestedActivity: 'game',
      };
    }
    return {
      level: 'Overwhelmed',
      color: 'clay',
      icon: '🫂',
      summary: "You're going through a difficult time. Please be kind to yourself.",
      recommendation: 'Consider reaching out to a counselor through our anonymous counseling service. For now, try a guided meditation or soothing sounds to find a moment of peace.',
      suggestedActivity: 'counseling',
    };
  },
};

export const MEDITATION_SESSIONS = [
  {
    id: 'quick',
    name: 'Quick Reset',
    duration: 180,
    description: '3-minute mindfulness boost',
    phases: [
      { label: 'Settle In', duration: 30, instruction: 'Find a comfortable seat. Close your eyes. Take three deep breaths.' },
      { label: 'Body Scan', duration: 45, instruction: 'Slowly scan from your head to your toes. Notice any tension without judgment.' },
      { label: 'Breath Focus', duration: 60, instruction: 'Follow your breath. Inhale... exhale... Let your breath be natural and easy.' },
      { label: 'Gentle Return', duration: 45, instruction: 'Gradually bring awareness back. Wiggle your fingers and toes. When ready, gently open your eyes.' },
    ],
  },
  {
    id: 'standard',
    name: 'Calm Center',
    duration: 300,
    description: '5-minute guided relaxation',
    phases: [
      { label: 'Arrive', duration: 45, instruction: 'Sit comfortably. Let your hands rest. Take a few deep breaths to arrive in this moment.' },
      { label: 'Body Scan', duration: 75, instruction: 'Bring attention to your feet... legs... torso... shoulders... face. Soften any tension you find.' },
      { label: 'Breath Awareness', duration: 90, instruction: 'Notice the natural rhythm of your breath. No need to change it. Simply observe the rising and falling.' },
      { label: 'Heart Space', duration: 60, instruction: 'Bring your attention to your heart center. Imagine warmth and compassion filling this space.' },
      { label: 'Integration', duration: 30, instruction: 'Carry this calm with you. Slowly open your eyes when you\'re ready.' },
    ],
  },
  {
    id: 'deep',
    name: 'Deep Rest',
    duration: 600,
    description: '10-minute deep relaxation',
    phases: [
      { label: 'Grounding', duration: 60, instruction: 'Lie down or sit comfortably. Close your eyes. Feel the support beneath you. Take five slow, deep breaths.' },
      { label: 'Full Body Scan', duration: 150, instruction: 'Bring gentle awareness to each part of your body: feet, legs, hips, belly, chest, back, shoulders, arms, hands, neck, face, scalp. Breathe into any areas of tension.' },
      { label: 'Ocean Breath', duration: 180, instruction: 'Imagine your breath as ocean waves. Inhale as the wave rises. Exhale as it recedes. Let each wave wash away tension.' },
      { label: 'Loving Kindness', duration: 120, instruction: 'Silently repeat: May I be happy. May I be healthy. May I be safe. May I live with ease. Extend these wishes to others.' },
      { label: 'Gentle Return', duration: 90, instruction: 'Slowly bring awareness back. Notice how you feel. Gently move your body. When ready, open your eyes.' },
    ],
  },
];

export const AMBIENT_SOUNDS = [
  {
    id: 'forest',
    name: 'Forest Canopy',
    icon: '🌲',
    desc: 'Gentle rustling leaves and distant birdsong',
    params: {
      type: 'noise',
      filterFreq: 800,
      filterQ: 0.5,
      lfoRate: 0.3,
      lfoDepth: 200,
      gain: 0.3,
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: '🌊',
    desc: 'Soft waves rolling onto a peaceful shore',
    params: {
      type: 'noise',
      filterFreq: 400,
      filterQ: 0.8,
      lfoRate: 0.15,
      lfoDepth: 300,
      gain: 0.35,
    },
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    icon: '🌧',
    desc: 'Steady rain on leaves and soft thunder',
    params: {
      type: 'noise',
      filterFreq: 2000,
      filterQ: 0.3,
      lfoRate: 0.5,
      lfoDepth: 100,
      gain: 0.25,
    },
  },
  {
    id: 'night',
    name: 'Night Sky',
    icon: '🌙',
    desc: 'Crickets and a calm starry night',
    params: {
      type: 'noise',
      filterFreq: 600,
      filterQ: 0.6,
      lfoRate: 0.1,
      lfoDepth: 150,
      gain: 0.2,
    },
  },
];

export const WELLNESS_MODULES = [
  {
    id: 'quiz',
    title: 'Mindful Check-In',
    subtitle: 'Wellness assessment',
    icon: '📋',
    description: 'Answer 5 quick questions for a personalized wellness score and recommendations.',
    gradient: 'from-plum-500/10 via-plum-400/5 to-transparent',
    borderColor: 'border-plum-300/30 dark:border-plum-600/30',
    hoverBorderColor: 'hover:border-plum-400/50',
    accent: 'plum',
  },
  {
    id: 'meditation',
    title: 'Guided Meditation',
    subtitle: 'Mindfulness practice',
    icon: '🧘',
    description: 'Choose from 3, 5, or 10 minute guided sessions with calming ambient audio.',
    gradient: 'from-herb-500/10 via-herb-400/5 to-transparent',
    borderColor: 'border-herb-300/30 dark:border-herb-600/30',
    hoverBorderColor: 'hover:border-herb-400/50',
    accent: 'herb',
  },
  {
    id: 'game',
    title: 'Calm Bubbles',
    subtitle: 'Mindful play',
    icon: '🫧',
    description: 'Pop floating bubbles at your own pace. A gentle, calming focus exercise.',
    gradient: 'from-brass-300/10 via-brass-300/5 to-transparent',
    borderColor: 'border-brass-300/20 dark:border-brass-500/20',
    hoverBorderColor: 'hover:border-brass-400/40',
    accent: 'brass',
  },
  {
    id: 'music',
    title: 'Mood Music',
    subtitle: 'Ambient soundscapes',
    icon: '🎵',
    description: 'Forest, ocean, rain, or night sky — immersive ambient sounds for focus and calm.',
    gradient: 'from-plum-500/10 via-earth-200/5 to-transparent',
    borderColor: 'border-plum-300/20 dark:border-plum-600/20',
    hoverBorderColor: 'hover:border-plum-400/40',
    accent: 'plum',
  },
];
