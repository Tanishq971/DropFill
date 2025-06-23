"use client"
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {data , status} = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("Credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/Browse"); // Redirect to homepage or desired page after login
    }
  };

  useEffect(()=>{
     
    if(data){
       router.push("/Browse")
    }

    if(status === "authenticated"){
      console.log("here at useEffect")
      
    }
  } , [])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="jsmith@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">Or sign in with</p>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900"
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}