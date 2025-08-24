import { render, screen, fireEvent } from '@testing-library/react'
import ColorPicker from '../ColorPicker'

describe('ColorPicker', () => {
  const mockOnColorChange = jest.fn()

  beforeEach(() => {
    mockOnColorChange.mockClear()
  })

  it('renders with default label', () => {
    render(
      <ColorPicker
        selectedColor="blue"
        onColorChange={mockOnColorChange}
      />
    )

    expect(screen.getByText('Color')).toBeInTheDocument()
  })

  it('renders with custom label', () => {
    render(
      <ColorPicker
        selectedColor="blue"
        onColorChange={mockOnColorChange}
        label="Choose Color"
      />
    )

    expect(screen.getByText('Choose Color')).toBeInTheDocument()
  })

  it('renders all color options', () => {
    render(
      <ColorPicker
        selectedColor="blue"
        onColorChange={mockOnColorChange}
      />
    )

    const colorButtons = screen.getAllByRole('button')
    expect(colorButtons).toHaveLength(8) // 8 color options
  })

  it('highlights selected color', () => {
    render(
      <ColorPicker
        selectedColor="red"
        onColorChange={mockOnColorChange}
      />
    )

    const redButton = screen.getByTitle('Red')
    expect(redButton).toHaveClass('border-white', 'scale-110')
  })

  it('calls onColorChange when color is clicked', () => {
    render(
      <ColorPicker
        selectedColor="blue"
        onColorChange={mockOnColorChange}
      />
    )

    const greenButton = screen.getByTitle('Green')
    fireEvent.click(greenButton)

    expect(mockOnColorChange).toHaveBeenCalledWith('green')
  })

  it('applies correct styles to color buttons', () => {
    render(
      <ColorPicker
        selectedColor="blue"
        onColorChange={mockOnColorChange}
      />
    )

    const blueButton = screen.getByTitle('Blue')
    expect(blueButton).toHaveClass('w-8', 'h-8', 'rounded-full', 'border-2')
    expect(blueButton).toHaveStyle({ backgroundColor: 'blue' })
  })
})
