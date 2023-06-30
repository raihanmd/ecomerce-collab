import { Suspense } from "react";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingUserPage from "./components/loadingUserPage";
import BreadcumbComponent from "../components/breadcumb";

export default async function page({ params }) {
  const userPage = await fetchGET(`/api/${params.userName}`, { component: "server" });

  return (
    <>
      <Suspense fallback={<LoadingUserPage />}>
        <BreadcumbComponent />
        {JSON.stringify(userPage)}
      </Suspense>
    </>
  );
}
