import { Suspense } from "react";
import { notFound } from "next/navigation";

import { fetchGET } from "@/useFetch/fetchGET";
import BreadcumbComponent from "../components/breadcumb";
import LoadingUserPage from "./loading";
import UserBanner from "./components/userBanner";
import UserTab from "./components/userTab";

export default async function page({ params }) {
  const userPage = await fetchGET(`/api/${params.userName}`, { component: "server" });

  if (userPage.statusCode !== 200) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<LoadingUserPage />}>
        <BreadcumbComponent />
        <UserBanner userPage={userPage.payload} />
        <UserTab userPage={userPage.payload} />
      </Suspense>
    </>
  );
}
