# Todo App Frontend

A modern React/Next.js todo application with reusable components and comprehensive testing.

## 🎥 Demo

**Watch the app in action:** [Quick Demo Video](https://www.loom.com/share/466392e87069430685f71cd6d5f4023c?sid=7c669f70-24d3-4861-bd2a-35b98f855d38)

*See the full functionality including task creation, editing, and deleting.*

## ⚡ Quick Start

### 📋 Prerequisites

Before running the frontend, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Backend API** running (see [Backend Repository](https://github.com/linx777/todo_list_be))

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🚀 Features

- ✅ Create, edit, and delete tasks
- 🎨 Color-coded tasks with visual indicators
- 📱 Responsive design with modern UI
- ♻️ Reusable components for better maintainability
- 🧪 Comprehensive unit tests (53 tests, 87%+ coverage)

## 🛠️ Development



### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── create/            # Create task page
│   ├── edit/[id]/         # Edit task page
│   └── page.tsx           # Home page (task list)
├── components/            # Reusable UI components
│   ├── ColorPicker.tsx    # Color selection component
│   ├── TaskForm.tsx       # Reusable form for create/edit
│   └── LoadingSpinner.tsx # Loading state component
├── types/                 # TypeScript definitions
│   └── Task.ts           # Task interface and constants
└── utils/                 # Utility functions
    └── api.ts            # Centralized API functions
```

## 🧩 Key Components

### TaskForm
Reusable form component for creating and editing tasks.

```tsx
<TaskForm
  initialTitle="My Task"
  initialColor="blue"
  onSubmit={handleSubmit}
  submitButtonText="Add Task"
  isLoading={false}
/>
```

### ColorPicker
Color selection component with visual buttons.

```tsx
<ColorPicker
  selectedColor="blue"
  onColorChange={setColor}
/>
```

## 🔧 API Utilities

All API calls are centralized in `utils/api.ts`:

```tsx
import { taskApi } from '@/utils/api';

// Get all tasks
const tasks = await taskApi.getAll();

// Create a task
await taskApi.create({ title: "New Task", color: "blue" });

// Update a task
await taskApi.update(id, { title: "Updated Task" });

// Delete a task
await taskApi.delete(id);
```

## 🧪 Testing

### Quick Test Commands

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 📚 Tech Stack

- **Framework**: Next.js 15.5.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **State Management**: React Hooks
- **API**: Fetch API with centralized utilities
