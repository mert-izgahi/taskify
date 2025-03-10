export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagType {
  _id: string;
  name: string;
  color: string;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskType {
  _id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  dueDate: Date;
  user: string;
  tags: TagType[];
  createdAt: Date;
  updatedAt: Date;
}

export type Tab = "home" | "today" | "upcoming" | "completed";