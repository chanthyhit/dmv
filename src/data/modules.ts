export type ModuleSummary = {
  id: string
  name: string
  coverage: string
  trend: string
  description: string
  state: 'healthy' | 'at-risk'
}

export type PracticeItem = {
  id: string
  title: string
  prompt: string
  answer: string
  tag: string
  state?: 'ready' | 'in-progress' | 'review'
}

export const modules: ModuleSummary[] = [
  {
    id: 'signals',
    name: 'Traffic Control',
    coverage: '12 / 18',
    trend: '+2 mastered this week',
    description: 'Signals, lane markings, rights-of-way, work zones.',
    state: 'healthy',
  },
  {
    id: 'signs',
    name: 'Signs & Warnings',
    coverage: '9 / 15',
    trend: 'Revisit 3 yellow flags',
    description: 'Regulatory, guide, and hazard signs with timed responses.',
    state: 'at-risk',
  },
  {
    id: 'safety',
    name: 'Safety & Readiness',
    coverage: '7 / 12',
    trend: 'Schedule night-driving module',
    description: 'Vehicle readiness, weather prep, and emergency actions.',
    state: 'healthy',
  },
]

export const practiceQueue: PracticeItem[] = [
  {
    id: 'stop-sign',
    title: 'Stop Sign',
    prompt: 'What does a red octagonal sign require of the driver?',
    answer: 'Come to a complete stop at the limit line or crosswalk; proceed only when clear.',
    tag: 'Regulatory',
    state: 'review',
  },
  {
    id: 'yield',
    title: 'Yield Sign',
    prompt: 'How should you approach an inverted triangle sign?',
    answer: 'Slow down, prepare to stop, and give right-of-way to traffic and pedestrians.',
    tag: 'Right-of-way',
    state: 'in-progress',
  },
  {
    id: 'work-zone',
    title: 'Work Zone',
    prompt: 'An orange diamond showing workers ahead appears. How do you respond?',
    answer: 'Reduce speed, be ready to stop for flaggers, and merge early to protect crews.',
    tag: 'Hazard',
    state: 'ready',
  },
]
