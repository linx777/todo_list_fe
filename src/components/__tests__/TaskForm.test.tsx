import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '../TaskForm'

describe('TaskForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form with title input', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter task title...')).toBeInTheDocument()
  })

  it('renders color picker', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    expect(screen.getByText('Color')).toBeInTheDocument()
  })

  it('renders submit button with correct text', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
        isLoading={true}
      />
    )

    expect(screen.getByRole('button', { name: 'Adding...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeDisabled()
  })

  it('disables submit button when title is empty', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Add Task' })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when title is filled', async () => {
    const user = userEvent.setup()
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    const titleInput = screen.getByLabelText('Title')
    await user.type(titleInput, 'Test Task')

    const submitButton = screen.getByRole('button', { name: 'Add Task' })
    expect(submitButton).not.toBeDisabled()
  })

  it('calls onSubmit with form data when submitted', async () => {
    const user = userEvent.setup()
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    const titleInput = screen.getByLabelText('Title')
    await user.type(titleInput, 'Test Task')

    const submitButton = screen.getByRole('button', { name: 'Add Task' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Task',
        color: 'blue' // default color
      })
    })
  })

  it('uses initial values when provided', () => {
    render(
      <TaskForm
        initialTitle="Initial Task"
        initialColor="red"
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    const titleInput = screen.getByLabelText('Title') as HTMLInputElement
    expect(titleInput.value).toBe('Initial Task')

    const submitButton = screen.getByRole('button', { name: 'Add Task' })
    expect(submitButton).not.toBeDisabled()
  })

  it('trims whitespace from title', async () => {
    const user = userEvent.setup()
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    const titleInput = screen.getByLabelText('Title')
    await user.type(titleInput, '  Test Task  ')

    const submitButton = screen.getByRole('button', { name: 'Add Task' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Task',
        color: 'blue'
      })
    })
  })

  it('prevents submission when title is empty', async () => {
    const user = userEvent.setup()
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        submitButtonText="Add Task"
        loadingButtonText="Adding..."
      />
    )

    const submitButton = screen.getByRole('button', { name: 'Add Task' })
    await user.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
