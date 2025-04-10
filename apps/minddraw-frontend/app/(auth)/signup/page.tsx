"use client"
import { BACKEND_URL } from '@/app/config';
import AuthPage from '@/components/AuthPage'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const Signup = () => {
   const router = useRouter();
    const submitHandler = async(email: string, password: string, userName?: string)=> {
      console.log(userName, email,password)
      try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, {
          username: userName,
          email: email,
          password: password,
        });
  
        console.log(res);
        if (res.status === 200) {
          router.push("/signin");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Signin error:", error);
        alert("An error occurred during sign in");
      }
     }
  return (
    <div>
        <AuthPage isSignin={false} heading='Signup' submitHandler={submitHandler}/>
    </div>
  )
}

export default Signup