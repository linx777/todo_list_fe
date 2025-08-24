import { COLOR_OPTIONS } from '@/types/Task';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  label?: string;
}

export default function ColorPicker({ selectedColor, onColorChange, label = "Color" }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-blue-500 mb-2">
        {label}
      </label>
      <div className="flex gap-3 flex-wrap">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onColorChange(option.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              selectedColor === option.value 
                ? 'border-white scale-110' 
                : 'border-gray-600 hover:border-gray-400'
            }`}
            style={{ backgroundColor: option.value }}
            title={option.label}
          />
        ))}
      </div>
    </div>
  );
}
