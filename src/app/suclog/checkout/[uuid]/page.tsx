import Checkout from "@/components/landing-page/Checkout";
import React from "react";

const Page = async ({ params }: { params: Promise<{ uuid: string }> }) => {
  const { uuid } = await params;

  return (
    <>
      <Checkout paramsUUID={uuid} />
    </>
  );
};

export default Page;
