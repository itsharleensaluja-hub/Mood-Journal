export const COUNSELORS = [
  {
    id: 'cs-1',
    name: 'Dr. Maya Chen',
    title: 'Clinical Psychologist',
    specialization: 'Anxiety & Stress Management',
    languages: ['English', 'Mandarin'],
    rating: 4.9,
    sessions: 2840,
    available: true,
    avatar: 'MC',
    bio: '15+ years helping individuals navigate anxiety, depression, and life transitions with evidence-based approaches.',
    tags: ['CBT', 'Mindfulness', 'Stress'],
  },
  {
    id: 'cs-2',
    name: 'James Okonkwo',
    title: 'Licensed Therapist',
    specialization: 'Depression & Grief',
    languages: ['English'],
    rating: 4.8,
    sessions: 1920,
    available: true,
    avatar: 'JO',
    bio: 'Compassionate therapist specializing in grief, depression, and self-esteem building through person-centered therapy.',
    tags: ['Person-Centered', 'Grief', 'Self-Esteem'],
  },
  {
    id: 'cs-3',
    name: 'Dr. Priya Sharma',
    title: 'Counseling Psychologist',
    specialization: 'Relationship & Trauma',
    languages: ['English', 'Hindi'],
    rating: 4.9,
    sessions: 3100,
    available: true,
    avatar: 'PS',
    bio: 'Trauma-informed therapist helping clients heal from past experiences and build healthier relationships.',
    tags: ['Trauma', 'EMDR', 'Relationships'],
  },
  {
    id: 'cs-4',
    name: 'Dr. Alex Rivera',
    title: 'Behavioral Therapist',
    specialization: 'PTSD & OCD',
    languages: ['English', 'Spanish'],
    rating: 4.7,
    sessions: 1560,
    available: true,
    avatar: 'AR',
    bio: 'Specializing in exposure therapy and behavioral interventions for PTSD, OCD, and phobias.',
    tags: ['Exposure Therapy', 'OCD', 'PTSD'],
  },
  {
    id: 'cs-5',
    name: 'Dr. Sarah Kim',
    title: 'Mental Health Counselor',
    specialization: 'Adolescent & Family',
    languages: ['English', 'Korean'],
    rating: 4.8,
    sessions: 2200,
    available: true,
    avatar: 'SK',
    bio: 'Dedicated to supporting adolescents, young adults, and families through developmental transitions.',
    tags: ['Family', 'Adolescent', 'ADHD'],
  },
];

export const SESSION_TYPES = [
  { id: 'chat', label: 'Anonymous Chat', icon: '💬', desc: 'Real-time text-based counseling — completely anonymous' },
];

export function generateAnonymousId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'ANON-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const AGE_GROUPS = [
  'Under 18', '18–24', '25–34', '35–44', '45–54', '55+',
];

export const LANGUAGES = [
  'English', 'Mandarin', 'Hindi', 'Spanish', 'Korean', 'Arabic',
];

export const PRIMARY_CONCERNS = [
  'Anxiety', 'Depression', 'Stress', 'Grief', 'Relationships',
  'Trauma', 'Self-esteem', 'Loneliness', 'Anger', 'Life transitions',
  'Burnout', 'Sleep issues', 'Other',
];
