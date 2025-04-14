export interface Task {
  title: string;
  task_id: number;
  due_date: string; // ISO 8601 format
  status: string;
  updated_at: string; // ISO 8601 format
  goal_id: number;
  user_id: number;
  subject: string;
  priority: number;
  created_at: string; // ISO 8601 format
}

export interface TaskAdd {
  goal_id: number;
  user_id: number;
  title: string;
  subject: string;
  due_date: string; // ISO 8601 format
  priority: number;
  status: string;
}