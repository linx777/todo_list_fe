interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ message = "Loading...", size = 'medium' }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className={`text-gray-400 ${sizeClasses[size]}`}>
        {message}
      </div>
    </div>
  );
}
