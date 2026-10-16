export const profile = {
  name: 'Hai Nguyen',
  fullName: 'Nguyen Thanh Hai',
  handle: 'thanhhaidev',
  role: 'Mobile Engineer',
  company: 'AscendX',
  location: 'Ho Chi Minh City',
  email: 'hai2571998@gmail.com',
  codingSince: 2016,
  description:
    'Hai Nguyen (thanhhaidev) is a Mobile Engineer at AscendX in Ho Chi Minh City, building native iOS and Android SDKs, their cross-platform layers, and open-source Flutter & Dart packages.',
  links: {
    github: 'https://github.com/thanhhaidev',
    linkedin: 'https://www.linkedin.com/in/thanhhaidev98',
    x: 'https://x.com/thanhhaidev',
  },
  website: 'https://thanhhaidev.github.io',
};

export const skills: { title: string; note: string; items: string[]; primary?: string[] }[] = [
  {
    title: 'Mobile',
    note: 'Day-to-day',
    primary: ['Flutter', 'Dart'],
    items: ['Swift', 'Kotlin', 'Platform channels', 'CocoaPods', 'Swift PM', 'Gradle'],
  },
  {
    title: 'Ad tech',
    note: 'Monetization SDKs',
    items: ['Prebid Mobile', 'Google Ad Manager', 'AdMob', 'AppLovin MAX', 'Header bidding'],
  },
  {
    title: 'Package tooling',
    note: 'Publishing & docs',
    items: ['pub.dev', 'Melos', 'Dart CLIs', 'Code generation', 'Docusaurus', 'Mintlify'],
  },
  {
    title: 'Web',
    note: 'Previous focus',
    items: ['TypeScript', 'Angular', 'React', 'Next.js', 'Redux', 'RxJS', 'Svelte', 'SCSS'],
  },
  {
    title: 'Backend',
    note: 'APIs & data',
    items: ['Node.js', 'NestJS', 'Go', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'Infrastructure',
    note: 'Shipping it',
    items: ['Docker', 'Kubernetes / k3s', 'Nginx', 'AWS', 'GitHub Actions', 'Prometheus', 'Grafana'],
  },
];

export const education = {
  school: 'Van Lang University',
  degree: 'B.Eng. Software Engineering',
  gpa: '3.47 / 4',
  period: '2016 — 2020',
  highlights: [
    'Top 3 GPA in the faculty across four academic years.',
    'Finalist (top 24 teams) in the Makerthon programming contest.',
    'One of 23 student representatives on the Hung Kings Temple visit.',
  ],
};
