import { render, screen, fireEvent } from '@testing-library/react'
import TaskCard from '../TaskCard'
import { Task } from '@/types/Task'

describe('TaskCard', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    color: 'blue',
    completed: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }

  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    mockOnToggle.mockClear()
    mockOnDelete.mockClear()
  })

  it('renders task title', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('renders checkbox with correct state', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(false)
  })

  it('renders checkbox as checked when task is completed', () => {
    const completedTask = { ...mockTask, completed: true }
    
    render(
      <TaskCard
        task={completedTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByTitle('Delete task')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('renders delete button with correct title', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByTitle('Delete task')).toBeInTheDocument()
  })

  it('applies strikethrough style when task is completed', () => {
    const completedTask = { ...mockTask, completed: true }
    
    render(
      <TaskCard
        task={completedTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const taskTitle = screen.getByText('Test Task')
    expect(taskTitle).toHaveClass('line-through', 'text-gray-500')
  })

  it('applies hover style when task is not completed', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const taskTitle = screen.getByText('Test Task')
    expect(taskTitle).toHaveClass('text-white', 'hover:text-blue-400')
  })

  it('renders link to edit page', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/edit/1')
  })

  it('applies correct color styling to checkbox', () => {
    render(
      <TaskCard
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveStyle({ borderColor: '#3b82f6' }) // blue color value
  })

  it('handles different task colors', () => {
    const redTask = { ...mockTask, color: 'red' }
    
    render(
      <TaskCard
        task={redTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveStyle({ borderColor: '#ef4444' }) // red color value
  })
})
