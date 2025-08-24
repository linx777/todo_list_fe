import { taskApi } from '../api'
import { API_BASE_URL } from '@/types/Task'

// Mock fetch globally
global.fetch = jest.fn()

describe('taskApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('fetches all tasks successfully', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', color: 'blue', completed: false, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
        { id: 2, title: 'Task 2', color: 'red', completed: true, createdAt: '2024-01-01', updatedAt: '2024-01-01' }
      ]

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockTasks)
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      const result = await taskApi.getAll()

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(result).toEqual(mockTasks)
    })

    it('throws error when response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockResolvedValue({ error: 'Server error' })
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      await expect(taskApi.getAll()).rejects.toThrow('Server error')
    })
  })

  describe('getById', () => {
    it('fetches single task successfully', async () => {
      const mockTask = { id: 1, title: 'Task 1', color: 'blue', completed: false, createdAt: '2024-01-01', updatedAt: '2024-01-01' }

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockTask)
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      const result = await taskApi.getById(1)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(result).toEqual(mockTask)
    })
  })

  describe('create', () => {
    it('creates task successfully', async () => {
      const taskData = { title: 'New Task', color: 'blue' }
      const mockCreatedTask = { id: 3, ...taskData, completed: false, createdAt: '2024-01-01', updatedAt: '2024-01-01' }

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockCreatedTask)
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      const result = await taskApi.create(taskData)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
      expect(result).toEqual(mockCreatedTask)
    })
  })

  describe('update', () => {
    it('updates task successfully', async () => {
      const updateData = { title: 'Updated Task', color: 'red' }
      const mockUpdatedTask = { id: 1, ...updateData, completed: false, createdAt: '2024-01-01', updatedAt: '2024-01-01' }

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockUpdatedTask)
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      const result = await taskApi.update(1, updateData)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      expect(result).toEqual(mockUpdatedTask)
    })
  })

  describe('toggle', () => {
    it('toggles task completion successfully', async () => {
      const mockToggledTask = { id: 1, title: 'Task 1', color: 'blue', completed: true, createdAt: '2024-01-01', updatedAt: '2024-01-01' }

      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(mockToggledTask)
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      const result = await taskApi.toggle(1)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ toggle: true })
      })
      expect(result).toEqual(mockToggledTask)
    })
  })

  describe('delete', () => {
    it('deletes task successfully', async () => {
      const mockResponse = {
        ok: true
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      await taskApi.delete(1)

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/tasks/1`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('throws error when delete fails', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: jest.fn().mockResolvedValue({ error: 'Task not found' })
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      await expect(taskApi.delete(999)).rejects.toThrow('Task not found')
    })
  })

  describe('error handling', () => {
    it('handles network errors', async () => {
      ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(new Error('Network error'))

      await expect(taskApi.getAll()).rejects.toThrow('Network error')
    })

    it('handles response without error message', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: jest.fn().mockRejectedValue(new Error('JSON parse error'))
      }

      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any)

      await expect(taskApi.getAll()).rejects.toThrow('HTTP 500: Internal Server Error')
    })
  })
})
