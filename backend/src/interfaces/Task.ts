export enum Status {
  Pending = 'pending',
  InProgress = 'in_progress',
  Done = 'done',
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: Status;
}
