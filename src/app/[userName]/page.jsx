import { Suspense } from "react";

import { fetchGET } from "@/useFetch/fetchGET";
import Breadcumb from "../components/breadcumb";
import LoadingUserPage from "./components/loadingUserPage";

export default async function page({ params }) {
  const userPage = await fetchGET(`/api/${params.userName}`, { component: "server" });

  return (
    <>
      <Suspense fallback={LoadingUserPage}>
        <Breadcumb />
        {JSON.stringify(userPage)}
      </Suspense>
    </>
  );
}
