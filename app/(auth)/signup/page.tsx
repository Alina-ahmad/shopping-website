"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import axios from 'axios';
const signupPage = () => {

  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   try {
    const response = await axios.post("/api/users", {email, username, password})
    console.log(response)
    router.push("/");
   } catch (error) {
    console.log(error);
   }

  }

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit}>
      <div className="w-full h-screen  ">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[30%] h-[60%] bg-[#ff8f9c] border border-white rounded-2xl flex flex-col gap-[20px] justify-center items-center">
            <div className="text-2xl font-bold text-white">SIGNUP</div>
            <div>
              <p className="text-[12px] text-white">Email</p>
              <input
                type="email"
                name="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-[250px] h-[20px] border border-red-100 focus:outline-none"
              />
            </div>
            
             <div>
              <p className="text-[12px] text-white">User Name</p>
              <input
                type="text"  
                onChange={(e) => setUsername(e.target.value)}             
                className="w-[250px] h-[20px] border border-red-100 focus:outline-none"
              />
            </div>
            <div>
              <p className="text-[12px] text-white">Set up a password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-[250px] h-[20px] border border-red-100 focus:outline-none"
              />
            </div>
            <button
              className="w-[130px] h-[30px] bg-white rounded-2xl text-[#ff8f9c] "
              type="submit"
            >
              submit
            </button>
            
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default signupPage
