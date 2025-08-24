import RocketIcon from './RocketIcon';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="text-5xl">
          <RocketIcon/>
        </div>
        <h1 className="text-5xl font-bold">
          <span className="todo-blue">Todo </span>
          <span className="app-purple">App</span>
        </h1>
      </div>
    </div>
  );
}
