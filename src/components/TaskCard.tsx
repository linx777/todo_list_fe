'use client';

import Link from 'next/link';
import { Task, COLOR_CLASSES, COLOR_VALUES } from '@/types/Task';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const colorClass = COLOR_CLASSES[task.color as keyof typeof COLOR_CLASSES] || COLOR_CLASSES.blue;
  const colorValue = COLOR_VALUES[task.color as keyof typeof COLOR_VALUES] || COLOR_VALUES.blue;

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800 hover:bg-gray-750">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
        className="relative"
        style={{
          borderColor: colorValue
        }}
      />

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <Link href={`/edit/${task.id}`} className="block">
          <h3
            className={`text-lg font-medium transition-colors cursor-pointer ${
              task.completed 
                ? 'line-through text-gray-500' 
                : 'text-white hover:text-blue-400'
            }`}
          >
            {task.title}
          </h3>
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-gray-700 transition-colors"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
