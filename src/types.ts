export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'None';
  completed: boolean;
}
