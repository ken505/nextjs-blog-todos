import Link from "next/link";

// Task を作成、更新、削除するためには、 JWT の認証を通す必要があるので、
// universal-cookie をインポートする。
import Cookie from "universal-cookie";

// new Cookie で cookie のインスタンスを作る。
const cookie = new Cookie();

// デリートボタンが押された時に実行される関数。
const deleteTask = async () => {
  // fetch の DELETE のメソッドを使って、
  // 削除したい ID をエンドポイントの末尾に渡す。
  await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${cookie.get("access_token")}`,
    },
}

export default function Task({ task }) {
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
