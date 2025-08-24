'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Task } from '@/types/Task';
import { taskApi } from '@/utils/api';

export default function EditTaskPage() {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const tasks = await taskApi.getAll();
      const currentTask = tasks.find((t: Task) => t.id === parseInt(taskId));
      
      if (currentTask) {
        setTask(currentTask);
      } else {
        alert('Task not found');
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Failed to fetch task');
      router.push('/');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (data: { title: string; color: string }) => {
    setLoading(true);
    
    try {
      await taskApi.update(parseInt(taskId), { 
        ...data,
        completed: task?.completed 
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <LoadingSpinner message="Loading task..." />;
  }

  if (!task) {
    return <LoadingSpinner message="Task not found" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-20 px-4">
      <Header />

      {/* Navigation */}
      <div className="w-full max-w-2xl mb-8 flex justify-start">
        <Link
          href="/"
          className="text-white hover:text-blue-300 transition-colors flex items-left gap-2"
        >
          ←
        </Link>
      </div>

      {/* Form */}
      <div className="w-full max-w-2xl">        
        <TaskForm
          initialTitle={task.title}
          initialColor={task.color}
          onSubmit={handleSubmit}
          submitButtonText="Save ➕"
          loadingButtonText="Saving..."
          isLoading={loading}
        />
      </div>
    </div>
  );
}
