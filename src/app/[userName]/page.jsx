import { Suspense } from "react";
import { notFound } from "next/navigation";

import { fetchGET } from "@/useFetch/fetchGET";
import BreadcumbComponent from "../components/breadcumb";
import LoadingUserPage from "./loading";
import BannerUser from "./components/bannerUser";
import TabUser from "./components/tabUser";

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
