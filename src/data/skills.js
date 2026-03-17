export const skillGroups = [
  {
    label: 'Languages',
    pills: [
      { name: 'Python', ico: 'Py', bg: '#3776AB', color: '#FFD43B' },
      { name: 'TypeScript', ico: 'TS', bg: '#3178C6', color: '#fff' },
      { name: 'Java', ico: 'Ja', bg: '#ED8B00', color: '#fff' },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    pills: [
      { name: 'Django', ico: 'Dj', bg: '#092E20', color: '#44B78B' },
      { name: 'React', ico: 'Re', bg: '#61DAFB', color: '#222' },
      { name: 'FastAPI', ico: 'FA', bg: '#009688', color: '#fff' },
      { name: 'Pydantic', ico: 'Pd', bg: '#E92063', color: '#fff' },
      { name: 'Angular', ico: 'A', bg: '#DD0031', color: '#fff' },
    ],
  },
  {
    label: 'Tools',
    pills: [
      { name: 'PostgreSQL', ico: 'PG', bg: '#336791', color: '#fff' },
      { name: 'Docker', ico: 'Do', bg: '#2496ED', color: '#fff' },
      { name: 'AWS', ico: 'AW', bg: '#FF9900', color: '#232F3E' },
      { name: 'Git', ico: 'Gi', bg: '#F05032', color: '#fff' },
      { name: 'Redis', ico: 'R', bg: '#DC382D', color: '#fff' },
      { name: 'Alembic', ico: 'Al', bg: '#6B4FBB', color: '#fff' },
      { name: 'Pandas', ico: 'Pa', bg: '#150458', color: '#E70488' },
    ],
  },
  {
    label: 'AI-Assisted Development',
    ai: true,
    pills: [
      { name: 'Windsurf', ico: 'Ws', bg: '#1a1a2e', color: '#52D96A' },
      { name: 'Claude', ico: 'Cl', bg: '#D97757', color: '#fff' },
    ],
  },
];

// Flat lookup by name for use in Experience tags
export const pillByName = Object.fromEntries(
  skillGroups.flatMap((g) => g.pills).map((p) => [p.name, p])
);
