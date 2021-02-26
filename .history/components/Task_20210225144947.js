export default function Task({ task, taskDeleted }) {
  return (
    <div>
      <span>{task.id}</span>
      {" : "}
      <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
        {task.title}
      </span>
    </div>
  );
}
