import Link from "next/link"
import {Facebook, Twitter, Instagram, Linkedin, Send, MapPin, Phone, Mail, ArrowRight} from "lucide-react"

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-500"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-sky-600 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">
                FlightBooker
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Find the best deals on flights to your favorite destinations worldwide. We make travel planning simple and
              stress-free.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-sky-600 flex items-center justify-center transition-colors duration-300"
              >
                <Facebook size={18}/>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-sky-600 flex items-center justify-center transition-colors duration-300"
              >
                <Twitter size={18}/>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-sky-600 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram size={18}/>
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-sky-600 flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin size={18}/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 pb-2 border-b border-gray-700">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Flights</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Special Offers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6 pb-2 border-b border-gray-700">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                >
                  <ArrowRight size={14} className="mr-2 text-sky-500"/>
                  <span>Refund Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 pb-2 border-b border-gray-700">Subscribe</h4>
            <p className="text-gray-400 mb-4">Get the latest deals and special offers directly to your inbox</p>
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg w-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-md transition-colors duration-300">
                  <Send size={16}/>
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-sky-500 mr-3 mt-1"/>
                <span className="text-gray-400 text-sm">123 Aviation Street, Jakarta, Indonesia</span>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="text-sky-500 mr-3 mt-1"/>
                <span className="text-gray-400 text-sm">+62 123 4567 890</span>
              </div>
              <div className="flex items-start">
                <Mail size={18} className="text-sky-500 mr-3 mt-1"/>
                <span className="text-gray-400 text-sm">info@flightbooker.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} FlightBooker. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Terms
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
