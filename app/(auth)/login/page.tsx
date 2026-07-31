"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(""); // it clears any old error before trying again
  setIsLoading(true);

  
    try {
      const res = await fetch("/api/users/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
};
  return (
    <div className="w-full">
        <form onSubmit={handleSubmit}>
      <div className="w-full h-screen  ">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[30%] h-[60%] bg-[#ff8f9c] border border-white rounded-2xl flex flex-col gap-[20px] justify-center items-center">
            <div className="text-2xl font-bold text-white">LOGIN</div>
            <div>
              <p className="text-[12px] text-white">User Name</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}               
                className="w-[250px] h-[20px] border border-red-100 focus:outline-none"
              />
            </div>
            <div>
              <p className="text-[12px] text-white">Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[250px] h-[20px] border border-red-100 focus:outline-none"
              />
            </div>
            {error && <p className="text-white text-[12px]">{error}</p>}
            <button
    className="w-[130px] h-[30px] flex items-center justify-center bg-white rounded-2xl text-[#ff8f9c] hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    type="submit"
    disabled={isLoading}
  >
    
    {isLoading ? <svg
      className="animate-spin h-4 w-4 text-[#ff8f9c]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg> : "submit"}
  </button>
            <div>
              <p className="text-[12px]">
                dont have an account yet?{" "}
                <a href="/signup" className="text-white text-[13px]">
                  signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default LoginPage;
