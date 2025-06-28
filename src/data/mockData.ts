import { Bug, BugStats } from '../types/Bug';

export const mockBugs: Bug[] = [
  {
    id: '1',
    title: 'Login form validation not working on mobile devices',
    description: 'Users are unable to submit the login form on mobile devices. The validation errors are not showing up properly.',
    status: 'open',
    priority: 'high',
    category: 'Authentication',
    assignee: 'Sarah Johnson',
    reporter: 'Mike Chen',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T14:20:00'),
    dueDate: new Date('2024-01-20T00:00:00'),
    tags: ['mobile', 'validation', 'login'],
    comments: [
      {
        id: '1',
        author: 'Sarah Johnson',
        content: 'I can reproduce this issue on iOS Safari. Looking into it now.',
        createdAt: new Date('2024-01-15T11:00:00')
      }
    ],
    attachments: ['screenshot-mobile-login.png'],
    reproductionSteps: [
      'Open the app on a mobile device',
      'Navigate to login page',
      'Enter invalid credentials',
      'Try to submit the form'
    ],
    environment: 'Mobile Safari iOS 17',
    version: '2.1.4'
  },
  {
    id: '2',
    title: 'Database connection timeout during peak hours',
    description: 'The application is experiencing database connection timeouts during peak usage hours (12 PM - 2 PM EST).',
    status: 'in-progress',
    priority: 'critical',
    category: 'Database',
    assignee: 'Alex Rodriguez',
    reporter: 'Emma Wilson',
    createdAt: new Date('2024-01-14T09:15:00'),
    updatedAt: new Date('2024-01-15T16:45:00'),
    dueDate: new Date('2024-01-16T00:00:00'),
    tags: ['database', 'performance', 'timeout'],
    comments: [
      {
        id: '2',
        author: 'Alex Rodriguez',
        content: 'Added connection pooling configuration. Testing on staging.',
        createdAt: new Date('2024-01-15T16:45:00')
      }
    ],
    attachments: ['db-logs.txt', 'performance-metrics.pdf'],
    reproductionSteps: [
      'Access application during peak hours',
      'Perform database-heavy operations',
      'Observe timeout errors'
    ],
    environment: 'Production - AWS RDS MySQL',
    version: '2.1.4'
  },
  {
    id: '3',
    title: 'Search results pagination not working correctly',
    description: 'When navigating through search results pages, some results are duplicated and others are missing.',
    status: 'testing',
    priority: 'medium',
    category: 'Search',
    assignee: 'David Kim',
    reporter: 'Lisa Brown',
    createdAt: new Date('2024-01-12T14:22:00'),
    updatedAt: new Date('2024-01-15T12:30:00'),
    tags: ['search', 'pagination', 'ui'],
    comments: [],
    attachments: [],
    reproductionSteps: [
      'Perform a search with many results',
      'Navigate to page 2',
      'Compare results with page 1',
      'Navigate back and forth between pages'
    ],
    environment: 'Chrome 120, Firefox 121',
    version: '2.1.3'
  },
  {
    id: '4',
    title: 'Email notifications contain broken image links',
    description: 'All email notifications sent to users contain broken image links for logos and icons.',
    status: 'resolved',
    priority: 'low',
    category: 'Email',
    assignee: 'Sophie Turner',
    reporter: 'John Davis',
    createdAt: new Date('2024-01-10T11:45:00'),
    updatedAt: new Date('2024-01-14T15:20:00'),
    tags: ['email', 'images', 'notifications'],
    comments: [
      {
        id: '3',
        author: 'Sophie Turner',
        content: 'Fixed the image paths in email templates. All images now load properly.',
        createdAt: new Date('2024-01-14T15:20:00')
      }
    ],
    attachments: ['email-template-before.html', 'email-template-after.html'],
    reproductionSteps: [
      'Trigger any email notification',
      'Check email inbox',
      'Observe broken image icons'
    ],
    environment: 'Email clients (Gmail, Outlook)',
    version: '2.1.2'
  },
  {
    id: '5',
    title: 'Dashboard charts not loading on slow connections',
    description: 'Analytics charts on the dashboard fail to load properly on slow internet connections.',
    status: 'closed',
    priority: 'medium',
    category: 'Dashboard',
    assignee: 'Michael Zhang',
    reporter: 'Amy Johnson',
    createdAt: new Date('2024-01-08T16:30:00'),
    updatedAt: new Date('2024-01-12T10:15:00'),
    tags: ['dashboard', 'charts', 'performance'],
    comments: [
      {
        id: '4',
        author: 'Michael Zhang',
        content: 'Implemented lazy loading and reduced chart bundle size. Issue resolved.',
        createdAt: new Date('2024-01-12T10:15:00')
      }
    ],
    attachments: ['performance-comparison.png'],
    reproductionSteps: [
      'Throttle network to slow 3G',
      'Navigate to dashboard',
      'Observe chart loading behavior'
    ],
    environment: 'All browsers with slow connection',
    version: '2.1.1'
  }
];

export const mockStats: BugStats = {
  total: 47,
  open: 12,
  inProgress: 8,
  testing: 5,
  resolved: 15,
  closed: 7,
  critical: 3,
  high: 9,
  medium: 18,
  low: 17
};