import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
  const router = useRouter();

  // if (router.isFallback || !post) {
  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }
}
