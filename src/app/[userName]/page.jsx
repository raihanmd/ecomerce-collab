"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function page({ params }) {
  const { data, error, isLoading } = useSWR(`/api/${params.userName}`, fetcher);

  return (
    <>
      {params.userName}
    </>
  );
}
