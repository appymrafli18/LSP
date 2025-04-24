"use client";
const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" id="about">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About E-Ticketing
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Your trusted partner for flight bookings and travel arrangements.
        </p>
      </div>

      <div className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                E-Ticketing was founded in 2020 with a simple mission: to make
                flight booking easy, transparent, and affordable for everyone.
                What started as a small startup has now grown into a trusted
                platform serving thousands of travelers every day.
              </p>
              <p className="text-gray-600">
                We partner with major airlines around the world to bring you the
                best deals and ensure a seamless booking experience from start
                to finish.
              </p>
            </div>
            <div className="bg-sky-100 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Why Choose Us
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-sky-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Best price guarantee on all flights
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-sky-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-sky-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    No hidden fees or charges
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-sky-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Secure payment processing
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
