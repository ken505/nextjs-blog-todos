import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";

export default function TaskPage({ staticfilterdTasks }) {
  return (
    <Layout title="Task page">
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <ul>
            {staticfilterdTasks &&
              staticfilterdTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
          </ul>
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}
export async function getStaticProps() {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    // revalidate: 3,
  };
}
