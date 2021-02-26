import Layout from "../components/Layout";
import Link from "next/link";

export default function BlogPage() {
  <Layout title="Blog page">
    <Link href="/main-page">
    <div className="flex cursor-pointer mt-12">x
      <svg
        className="w-6 h-6 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
    </Link>
  </Layout>;
}
