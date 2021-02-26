  import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";

export async function getStaticPaths() {
  const paths = await getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
}