import type { Task } from '@/lib/types';

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design the new landing page',
    description: 'Create a modern and appealing design for the FocusFlow landing page.',
    tags: ['design', 'marketing'],
    priority: 'high',
    deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Develop the task creation feature',
    description: 'Implement the functionality to add new tasks to the list.',
    tags: ['development', 'core-feature'],
    priority: 'high',
    deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
    status: 'todo',
  },
  {
    id: '3',
    title: 'Write user documentation',
    description: 'Draft the initial user guides for the main features.',
    tags: ['documentation'],
    priority: 'medium',
    deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
    status: 'todo',
  },
  {
    id: '4',
    title: 'Set up the marketing campaign',
    tags: ['marketing'],
    priority: 'low',
    deadline: null,
    status: 'todo',
  },
  {
    id: '5',
    title: 'Review team performance for Q2',
    description: 'Analyze team metrics and prepare a report for the quarterly meeting.',
    tags: ['management', 'report'],
    priority: 'medium',
    deadline: new Date(new Date().setDate(new Date().getDate() + 10)),
    status: 'done',
  },
];
