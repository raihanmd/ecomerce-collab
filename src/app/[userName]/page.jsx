import { Suspense } from "react";
import { notFound } from "next/navigation";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingUserPage from "./components/loadingUserPage";
import BreadcumbComponent from "../components/breadcumb";
import UserPageComponent from "./components/UserPageComponent";

export default async function page({ params }) {
  const userPage = await fetchGET(`/api/${params.userName}`, { component: "server" });
  if (userPage.statusCode !== 200) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<LoadingUserPage />}>
        <BreadcumbComponent />
        <UserPageComponent userPage={userPage.payload} />
      </Suspense>
    </>
  );
}
