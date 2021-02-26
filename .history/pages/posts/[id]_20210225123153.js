import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
  const router = useRouter();

  // if (router.isFallback || !post) {
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={post.title}>
       <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
    </Layout>
  };
