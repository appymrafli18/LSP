import LandingFlights from "@/components/landing-page/LandingFlights";
import {Suspense} from "react";

const Page = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700 font-medium">Loading flights...</p>
        </div>
      </div>
    }>
      <LandingFlights/>
    </Suspense>
  );
};

export default Page;
