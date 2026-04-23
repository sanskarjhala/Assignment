import { IoMdSearch } from "react-icons/io";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 drop-shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xs">LOGO</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg">
            Review<span className="font-bold">&RATE</span>
          </span>
        </div>

        {/* This is second part of navbar*/}
        <div className="ml-auto flex items-center gap-4">
          <div className="max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm  focus:ring-purple-300"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-600">
                <IoMdSearch/>
              </button>
            </div>
          </div>

          <button className="text-gray-700 font-medium hover:text-purple-600 transition-colors text-sm">
            SignUp
          </button>
          <button className="text-gray-700 font-medium hover:text-purple-600 transition-colors text-sm">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
