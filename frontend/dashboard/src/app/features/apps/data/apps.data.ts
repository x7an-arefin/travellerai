export interface AppIntegration {
  name: string
  desc: string
  connected: boolean
  icon: string
}

export const mockApps: AppIntegration[] = [
  { name: 'Telegram', desc: 'Connect with Telegram for real-time communication.', connected: false, icon: 'lucideSend' },
  { name: 'Notion', desc: 'Effortlessly sync Notion pages for seamless collaboration.', connected: true, icon: 'lucideFileText' },
  { name: 'Figma', desc: 'View and collaborate on Figma designs in one place.', connected: true, icon: 'lucideFigma' },
  { name: 'Trello', desc: 'Sync Trello cards for streamlined project management.', connected: false, icon: 'lucideKanban' },
  { name: 'Slack', desc: 'Integrate Slack for efficient team communication.', connected: false, icon: 'lucideSlack' },
  { name: 'Zoom', desc: 'Host Zoom meetings directly from the dashboard.', connected: true, icon: 'lucideVideo' },
  { name: 'Stripe', desc: 'Easily manage Stripe transactions and payments.', connected: false, icon: 'lucideCreditCard' },
  { name: 'Gmail', desc: 'Access and manage Gmail messages effortlessly.', connected: true, icon: 'lucideMail' },
  { name: 'Medium', desc: 'Explore and share Medium stories on your dashboard.', connected: false, icon: 'lucideBookOpen' },
  { name: 'Skype', desc: 'Connect with Skype contacts seamlessly.', connected: false, icon: 'lucidePhone' },
  { name: 'Docker', desc: 'Effortlessly manage Docker containers on your dashboard.', connected: false, icon: 'lucideBox' },
  { name: 'GitHub', desc: 'Streamline code management with GitHub integration.', connected: false, icon: 'lucideGithub' },
  { name: 'GitLab', desc: 'Efficiently manage code projects with GitLab integration.', connected: false, icon: 'lucideGitlab' },
  { name: 'Discord', desc: 'Connect with Discord for seamless team communication.', connected: false, icon: 'lucideDisc' },
  { name: 'WhatsApp', desc: 'Easily integrate WhatsApp for direct messaging.', connected: false, icon: 'lucideMessageCircle' },
]
