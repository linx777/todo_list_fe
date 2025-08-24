'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import { taskApi } from '@/utils/api';

export default function CreateTaskPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: { title: string; color: string }) => {
    setLoading(true);
    
    try {
      await taskApi.create(data);
      router.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-20 px-4">
      <Header />

      {/* Navigation */}
      <div className="w-full max-w-2xl mb-8 flex justify-start">
        <Link
          href="/"
          className="text-white hover:text-blue-300 transition-colors flex justify-start gap-2"
        >
          ← 
        </Link>
      </div>

      {/* Form */}
      <div className="w-full max-w-2xl">        
        <TaskForm
          onSubmit={handleSubmit}
          submitButtonText="Add Task"
          loadingButtonText="Adding..."
          isLoading={loading}
        />
      </div>
    </div>
  );
}

