import { COLOR_OPTIONS, COLOR_CLASSES, COLOR_VALUES, API_BASE_URL } from '../Task'

describe('Task Constants', () => {
  describe('COLOR_OPTIONS', () => {
    it('contains all expected color options', () => {
      const expectedColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown']
      
      expect(COLOR_OPTIONS).toHaveLength(8)
      COLOR_OPTIONS.forEach((option, index) => {
        expect(option.value).toBe(expectedColors[index])
        expect(option.label).toBe(expectedColors[index].charAt(0).toUpperCase() + expectedColors[index].slice(1))
      })
    })

    it('has correct structure for each option', () => {
      COLOR_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('value')
        expect(option).toHaveProperty('label')
        expect(typeof option.value).toBe('string')
        expect(typeof option.label).toBe('string')
      })
    })
  })

  describe('COLOR_CLASSES', () => {
    it('contains classes for all colors', () => {
      const expectedColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown']
      
      expectedColors.forEach(color => {
        const colorKey = color as keyof typeof COLOR_CLASSES
        expect(COLOR_CLASSES[colorKey]).toBeDefined()
        expect(typeof COLOR_CLASSES[colorKey]).toBe('string')
      })
    })

    it('has correct class structure', () => {
      Object.values(COLOR_CLASSES).forEach(classes => {
        expect(classes).toContain('bg-')
        expect(classes).toContain('text-')
        expect(classes).toContain('border-')
      })
    })

    it('has blue as default color', () => {
      expect(COLOR_CLASSES.blue).toBeDefined()
      expect(COLOR_CLASSES.blue).toContain('blue')
    })
  })

  describe('COLOR_VALUES', () => {
    it('contains hex values for all colors', () => {
      const expectedColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown']
      
      expectedColors.forEach(color => {
        const colorKey = color as keyof typeof COLOR_VALUES
        expect(COLOR_VALUES[colorKey]).toBeDefined()
        expect(COLOR_VALUES[colorKey]).toMatch(/^#[0-9a-fA-F]{6}$/)
      })
    })

    it('has correct hex values', () => {
      expect(COLOR_VALUES.red).toBe('#ef4444')
      expect(COLOR_VALUES.blue).toBe('#3b82f6')
      expect(COLOR_VALUES.green).toBe('#22c55e')
      expect(COLOR_VALUES.yellow).toBe('#eab308')
    })
  })

  describe('API_BASE_URL', () => {
    it('has correct API base URL', () => {
      expect(API_BASE_URL).toBe('http://localhost:3001/api')
    })

    it('is a string', () => {
      expect(typeof API_BASE_URL).toBe('string')
    })
  })

  describe('Color consistency', () => {
    it('has consistent colors across all constants', () => {
      const colorOptionsValues = COLOR_OPTIONS.map(option => option.value).sort()
      const colorClassesKeys = Object.keys(COLOR_CLASSES).sort()
      const colorValuesKeys = Object.keys(COLOR_VALUES).sort()

      expect(colorOptionsValues).toEqual(colorClassesKeys)
      expect(colorOptionsValues).toEqual(colorValuesKeys)
    })

    it('has consistent color names', () => {
      COLOR_OPTIONS.forEach(option => {
        const colorKey = option.value as keyof typeof COLOR_CLASSES
        expect(COLOR_CLASSES[colorKey]).toBeDefined()
        expect(COLOR_VALUES[colorKey]).toBeDefined()
      })
    })
  })
})
