  import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";

// 
const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getStaticPaths() {
  const paths = await getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  //const { task: staticTask } = await getTaskData(params.id);
  const staticTask = await getTaskData(params.id);
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
}
