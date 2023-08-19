import { Suspense } from "react";
import { notFound } from "next/navigation";

import { fetchGET } from "@/useFetch/fetchGET";
import LoadingUserPage from "./components/loadingUserPage";
import BreadcumbComponent from "../components/breadcumb";
import BannerUser from "./components/BannerUser";
import TabUser from "./components/TabUser";

export default async function page({ params }) {
  const userPage = await fetchGET(`/api/${params.userName}`, { component: "server" });

  if (userPage.statusCode !== 200) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<LoadingUserPage />}>
        <BreadcumbComponent />
        <BannerUser userPage={userPage.payload} />
        <TabUser userPage={userPage.payload} />
      </Suspense>
    </>
  );
}
