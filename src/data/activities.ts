import { Footprints, HeartPulse, Dumbbell, Swords, Gamepad2, Flame } from 'lucide-react';
export const activities = [
  { id: 'run', title: 'RUN', description: "Let's go for a run.", detail: 'Find your pace. Go a little further.', prompt: 'Ready to hit your stride?', tag: 'OUTDOORS / ENDURANCE', image: 'photo-1476480862126-209bfaa8edc8', icon: Footprints },
  { id: 'cardio', title: 'CARDIO', description: "Let's improve your endurance.", detail: 'More energy. Every single day.', prompt: 'Ready to get your heart moving?', tag: 'ENERGY / ENDURANCE', image: 'photo-1538805060514-97d9cc17730c', icon: HeartPulse },
  { id: 'workout', title: 'WORKOUT', description: "Let's get stronger.", detail: 'Build strength that stays with you.', prompt: 'Ready to build your strength?', tag: 'STRENGTH / CONDITIONING', image: 'photo-1534438327276-14e5300c3a48', icon: Dumbbell },
  { id: 'combat', title: 'COMBAT', description: 'Speed, movement and challenge.', detail: 'Stay focused. Find your fighting spirit.', prompt: 'Ready to step into your power?', tag: 'AGILITY / FOCUS', image: 'photo-1549719386-74dfcbf7dbed', icon: Swords },
  { id: 'game', title: 'GAME', description: "Let's play together.", detail: 'Good moves. Even better company.', prompt: 'Ready to play?', tag: 'PLAY / CONNECTION', image: 'photo-1546519638-68e109498ffc', icon: Gamepad2 },
  { id: 'challenge', title: 'CHALLENGE', description: 'Are you ready?', detail: 'A new goal. A new version of you.', prompt: 'Ready to take on the challenge?', tag: 'MINDSET / PROGRESS', image: 'photo-1517836357463-d25dfeac3438', icon: Flame },
] as const;
export type Activity = typeof activities[number];
export const photo = (id: string, width = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
