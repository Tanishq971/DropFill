import Link from "next/link";

const Navbar = ({page}:{page?:string}) => {
  return (
    <nav className="bg-purple-700/90 bg-opacity-20 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
         
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-extrabold text-white hover:text-purple-200">
              DropFill
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link href="/dashboard" className="text-white hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/forms" className="text-white hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Forms
            </Link>
            <Link href="/profile" className="text-white hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
          </div>

       
          <div className="flex items-center space-x-4">
            <button className="text-white hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


const Navlinks: Record<string, { name: string; href: string }[]> = {
   explore: [{
      name: "forms",
      href: "/forms"
   }]
}