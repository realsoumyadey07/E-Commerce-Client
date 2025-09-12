import { QrCode, SendHorizontal } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#ff0000] text-white py-10 px-6 md:px-16 w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Exclusive</h3>
          <p className="mb-3">Subscribe</p>
          <p className="mb-4 text-sm">Get 10% off your first order</p>
          <form className="flex border border-white rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 items-center px-3 py-2 text-white outline-none placeholder:text-white"
            />
            <button
              type="submit"
              className="bg-white text-black p-2 font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              <SendHorizontal color="red" size={20} />
            </button>
          </form>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <p className="text-sm">Action area II, New Town, Kolkata, India.</p>
          <p className="text-sm mt-2">exclusive@gmail.com</p>
          <p className="text-sm mt-1">+99999-88888-77777</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">My Account</a></li>
            <li><a href="#" className="hover:underline">Login / Register</a></li>
            <li><a href="#" className="hover:underline">Cart</a></li>
            <li><a href="#" className="hover:underline">Wishlist</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms Of Use</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Download App</h3>
          <p className="text-sm mb-3">Save $3 with App New User Only</p>
          <div className="flex items-center gap-3">
            <QrCode size={50} />
            <div className="flex flex-col gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#"><FaFacebookF className="hover:text-gray-400" /></a>
            <a href="#"><FaTwitter className="hover:text-gray-400" /></a>
            <a href="#"><FaInstagram className="hover:text-gray-400" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-gray-400" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white text-center mt-10 pt-6 text-sm text-white">
        © Copyright soumya 2022. All rights reserved
      </div>
    </footer>
  );
}
