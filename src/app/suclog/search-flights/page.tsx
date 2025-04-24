import LandingFlights from "@/components/landing-page/LandingFlights";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingFlights />
    </Suspense>
  );
};

export default Page;
