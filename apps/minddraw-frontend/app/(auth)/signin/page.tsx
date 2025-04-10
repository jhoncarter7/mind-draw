"use client";
import { BACKEND_URL } from "@/app/config";
import AuthPage from "@/components/AuthPage";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Signin = () => {
  const router = useRouter();

  const submitHandler = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, {
        email,
        password,
      });

      console.log(res);
      if (res.status === 200) {
        router.push("/joinRoom");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert("An error occurred during sign in");
    }
  };

  return (
    <div className="h-screen">
      <AuthPage isSignin={true} heading="Login" submitHandler={submitHandler} />
    </div>
  );
};

export default Signin;
