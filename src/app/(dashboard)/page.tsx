import Image from "next/image";
import preview from "./preview.png";
import Link from "next/link";
const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 w-full flex flex-col justify-between bg-[radial-gradient(rgba(128,128,128,0.3)_1px,transparent_1px)] bg-[length:20px_20px] relative">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-100 to-transparent rounded-b-[50%] opacity-80 z-0" />
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50 to-transparent rounded-b-[50%] opacity-80 z-0" />

      <nav className="mx-auto fixed z-50 left-1/2 transform -translate-x-1/2 text-white bg-purple-700 w-[90%] max-w-4xl flex items-center justify-center h-16 mt-5 rounded-3xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold">DropFill</h1>
      </nav>

      <main className="relative top-24 px-4 sm:px-6 lg:px-8 text-center flex-grow">
        <div className="max-w-7xl mx-auto py-20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-6">
            Welcome to DropFill
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-bold mb-8">
             A drag and drop form Builder
          </p>
          <Link href={"/signin"}>
            {" "}
            <button className="bg-purple-500 text-white font-bold px-6 py-3 rounded-full hover:bg-purple-600 transition-colors duration-300">
              Create
            </button>
          </Link>
        </div>
      </main>

      <section className=" bg-gradient-to-br  from:bg-gray-50  to:bg-gray-400 border-black  mx-auto w-full max-w-5xl rounded-t-3xl p-4">
        <Image
          src={preview}
          alt="preview"
          className="rounded-t-3xl w-full object-cover "
        />
      </section>
    </div>
  );
};

export default LandingPage;
