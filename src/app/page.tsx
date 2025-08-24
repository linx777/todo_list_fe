'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TaskCard from '@/components/TaskCard';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Task } from '@/types/Task';
import { taskApi } from '@/utils/api';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskApi.getAll();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Failed to load tasks. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (id: number) => {
    try {
      await taskApi.toggle(id);
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error('Error toggling task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskApi.delete(id);
        fetchTasks(); // Refresh the list
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (loading) {
    return <LoadingSpinner message="Loading tasks..." />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-20 px-4">
      <Header />

      {/* Create Task Button */}
      <div className="w-full max-w-2xl mb-12 flex justify-center">
        <Link
          href="/create"
          className="w-full bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-xl hover:bg-blue-600"
        >
          <span>Create Task ⊕</span>
        </Link>
      </div>

      {/* Task Summary */}
      <div className="flex justify-between w-full max-w-2xl mb-8">
        <div className="flex items-center gap-3">
          <span className="text-blue-400 font-medium text-lg">Tasks</span>
          <span className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm font-medium">
            {totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-purple-400 font-medium text-lg">Completed</span>
          <span className="bg-gray-700 text-white px-4 py-1 rounded-full text-sm font-medium">
            {completedTasks} of {totalTasks}
          </span>
        </div>
      </div>

      {/* Task List or Empty State */}
      <div className="w-full max-w-2xl mt-10">
        {tasks.length === 0 ? (
          <div className="text-center">
            <div className="text-gray-500 text-7xl mb-6">📋</div>
            <h3 className="text-xl font-medium text-gray-400 mb-3">
              You don't have any tasks registered yet.
            </h3>
            <p className="text-gray-500 text-lg">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
