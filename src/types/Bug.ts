export interface Bug {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'testing' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  assignee: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
  comments: Comment[];
  attachments: string[];
  reproductionSteps: string[];
  environment: string;
  version: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface BugStats {
  total: number;
  open: number;
  inProgress: number;
  testing: number;
  resolved: number;
  closed: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}