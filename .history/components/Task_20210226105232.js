import Link from "next/link";

// Task を作成、更新、削除するためには、 JWT の認証を通す必要があるので、
// universal-cookie をインポートする。
import Cookie from "universal-cookie";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";

// new Cookie で cookie のインスタンスを作る。
const cookie = new Cookie();

// task-page から props で渡ってきた taskDeleted を受け取り、
// delete の処理が終わった後で実行する。
export default function Task({ task, taskDeleted }) {
  // useContext を使って更新ようの関数を参照する。
  const { setSelectedTask } = useContext(StateContext);
  // デリートボタンが押された時に実行される関数。
  const deleteTask = async () => {
    // fetch の DELETE のメソッドを使って、
    // アクセスするエンドポイントは、削除したい ID をエンドポイントの末尾に渡したもの。
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
      method: "DELETE",
      // headers に Authorization を追加。
      // cookie から、保存してある access_token を取得し、( JWT に？)埋め込み、渡す。
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${cookie.get("access_token")}`,
      },

      // fetch の後処理として then を使って
      // res の status が 401 だった場合は認証が切れているので（認証に失敗）
      // alert を表示。
    }).then((res) => {
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
    });
    taskDeleted();
  };

  return (
    <div>
      <span>{task.id}</span>
      {" : "}
      <Link href={`/tasks/${task.id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {task.title}
        </span>
      </Link>

      {/* タスクを削除するためのボタン */}
      <div className="float-right ml-20">
      
        <svg
          // クリックされた時に、 deleteTask 関数を実行する。
          onClick={deleteTask}
          className="w-6 h-6 mr-2 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
}
