import { Task, API_BASE_URL } from '@/types/Task';

// Generic API error handler
const handleApiError = (error: any, defaultMessage: string) => {
  console.error(`API Error: ${defaultMessage}`, error);
  throw new Error(defaultMessage);
};

// Generic fetch wrapper with error handling
const apiRequest = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
};

// Task API functions
export const taskApi = {
  // Get all tasks
  getAll: async (): Promise<Task[]> => {
    const response = await apiRequest(`${API_BASE_URL}/tasks`);
    return response.json();
  },

  // Get single task
  getById: async (id: number): Promise<Task> => {
    const response = await apiRequest(`${API_BASE_URL}/tasks/${id}`);
    return response.json();
  },

  // Create new task
  create: async (taskData: { title: string; color: string }): Promise<Task> => {
    const response = await apiRequest(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
    return response.json();
  },

  // Update task
  update: async (id: number, taskData: Partial<Task>): Promise<Task> => {
    const response = await apiRequest(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
    return response.json();
  },

  // Toggle task completion
  toggle: async (id: number): Promise<Task> => {
    const response = await apiRequest(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ toggle: true }),
    });
    return response.json();
  },

  // Delete task
  delete: async (id: number): Promise<void> => {
    await apiRequest(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
