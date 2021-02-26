import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

// 5.一覧のデータが props で渡ってくる。
// 6.useSWR の初期値として設定される。
// 7.ユーザーがサイトにアクセスした時は、まず initialData が表示される。
export default function TaskPage({ staticfilterdTasks }) {

  // 8.initialData は tasks に繋がっており、 sort される。
  // 10.同時に useSWR でクライアントサイドから非同期で restAPI へ最新データを取りに行く。
  // 11.データが取れ次第、 data tasks へクライアントから fetch したデータが入る。
  // 12.最新データを再度 sort する。
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticfilterdTasks,
  });
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <Layout title="Task page">
      {/* 9.tasks がリスト上に表示される。 */}
      {/* 13.初期値が最新データで上書きされる。 */}
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => <Task key={task.id} task={task} />)}
      </ul>
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
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

// 1.ビルド時には getStatcProps が呼ばれる。
// 2.getAllTaskData が呼ばれる。
// 3.API のエンドポイントからタスクの一覧を取得。
// 4.staticfilterdTasks にタスク一覧を格納。
export async function getStaticProps() {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    // revalidate: 3,
  };
}
