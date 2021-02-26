import Link from "next/link";

// Task を作成、更新、削除するためには、 JWT の認証を通す必要があるので、
// universal-cookie をインポートする。
import Cookie from "universal-cookie";

// new Cookie で cookie のインスタンスを作る。
const cookie = new Cookie();

export default function Task({ task }) {
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
    });
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
    </div>
  );
}
