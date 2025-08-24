import { useState } from 'react';
import ColorPicker from './ColorPicker';

interface TaskFormProps {
  initialTitle?: string;
  initialColor?: string;
  onSubmit: (data: { title: string; color: string }) => Promise<void>;
  submitButtonText: string;
  loadingButtonText: string;
  isLoading?: boolean;
}

export default function TaskForm({
  initialTitle = '',
  initialColor = 'blue',
  onSubmit,
  submitButtonText,
  loadingButtonText,
  isLoading = false
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    await onSubmit({ title: title.trim(), color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-blue-500 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 transition-colors"
          placeholder="Enter task title..."
          required
        />
      </div>

      {/* Color Picker */}
      <ColorPicker
        selectedColor={color}
        onColorChange={setColor}
      />

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
        >
          {isLoading ? loadingButtonText : submitButtonText}
        </button>
      </div>
    </form>
  );
}
