import { Conversation } from './chat.types'

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    username: 'alex_dev',
    fullName: 'Alex John',
    title: 'Senior Backend Dev',
    messages: [
      { sender: 'Alex', message: 'Hey! Have you reviewed the new Spartan UI migration?', timestamp: '10:45 AM' },
      { sender: 'You', message: 'Yes, looking awesome with Signals and Tailwind v4!', timestamp: '10:48 AM' },
      { sender: 'Alex', message: 'Great, let me know if you need any database schemas.', timestamp: '11:11 AM' },
      { sender: 'You', message: 'Will do. Talk to you later!', timestamp: '11:15 AM' },
    ],
  },
  {
    id: 'conv2',
    profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    username: 'sarah_m',
    fullName: 'Sarah Miller',
    title: 'Product Designer',
    messages: [
      { sender: 'Sarah', message: 'Could you check the new theme variables in OKLCH?', timestamp: '09:15 AM' },
      { sender: 'You', message: 'Checked! The dark mode contrasts are spot-on.', timestamp: '09:24 AM' },
    ],
  },
  {
    id: 'conv3',
    profile: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    username: 'isabella_n',
    fullName: 'Isabella Nguyen',
    title: 'QA Lead',
    messages: [
      { sender: 'Isabella', message: 'All E2E and unit test scenarios are passing!', timestamp: 'Yesterday' },
      { sender: 'You', message: 'Fantastic work Isabella.', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'conv4',
    profile: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    username: 'david_k',
    fullName: 'David Kim',
    title: 'DevOps Engineer',
    messages: [
      { sender: 'David', message: 'Production deployment pipeline has been updated.', timestamp: 'Aug 4' },
    ],
  },
]
