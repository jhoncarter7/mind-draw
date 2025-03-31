"use client";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Link from "next/link";
import React, { useState } from "react";

interface authPageIF {
  isSignin: boolean;
  heading?: string;
  submitHandler: (email: string, password: string) => void;
}

const AuthPage: React.FC<authPageIF> = ({
  isSignin,
  heading,
  submitHandler,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitHandler(email, password);
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto justify-center items-center rounded-lg inset-shadow-zinc-500 shadow-2xl px-22 py-9 gap-4 "
      >
        <h1 className="font-semibold text-xl">{heading}</h1>

        <Input
          type="email"
          placeholder="your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="min-w-full">
          <Button className="capitalize bg-orange-300 min-w-full text-gray-500" type="submit">
            {isSignin ? "signin" : "signup"}
          </Button>
        </div>
        <p className="text-gray-200 text-sm font-light">
          Don&apos;t have an account?{" "}
          <Link
            className="text-gray-600 font-semibold cursor-pointer"
            href={`${isSignin ? "/signup" : "/signin"}`}
          >
            {isSignin ? "Signup" : "Signin"}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
