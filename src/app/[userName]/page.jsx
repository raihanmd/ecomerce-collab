import { Suspense } from "react";

import LoadingUserPage from "./loading";
import { fetchGET } from "@/useFetch/fetchGET";

export default async function page({ params }) {
  const userPage = await fetchGET(`/api/${params.userName}`);

  return (
    <Suspense fallback={<LoadingUserPage />}>
      <>{JSON.stringify(userPage)}</>
    </Suspense>
  );
}
