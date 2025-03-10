import mongoose, { Document } from "mongoose";

export type Priority = "low" | "medium" | "high" | "none";

export interface Task extends Document {
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  dueDate: Date;
  user: string;
  tags: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "none"],
      default: "none",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<Task>("Task", taskSchema);
