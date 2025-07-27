"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import validateEmail from "@/utils/validateEmail";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/app/actions/actions";
import { useFormStatus } from "react-dom";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEyeOpen, setEyeOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [loginState, loginAction] = useActionState(login, undefined);
  useEffect(()=>{
    if(loginState?.success){
    router.push('/')
  }
  },[loginState])
  const togglePasswordVisibility = () => {
    setEyeOpen((prev) => !prev);
  };

  return (
    <div className="h-full flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-200">
            Welcome back
          </h2>
          <p className="text-sm text-neutral-500">
            Continue with Google or enter your details.
          </p>
        </div>

        <button className="w-full flex items-center bg-neutral-950/50 justify-center border border-neutral-800 rounded-lg py-3 hover:bg-neutral-800 cursor-pointer">
          <FcGoogle className="text-xl mr-2" />
          Log in with Google
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-neutral-600" />
          <span className="text-sm text-neutral-400">or</span>
          <div className="flex-grow h-px bg-neutral-600" />
        </div>

        <form className="space-y-4" action={loginAction}>
          <div>
            <label className="text-sm font-medium text-neutral-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-neutral-700 rounded-lg bg-transparent text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">
              Password
            </label>
            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-neutral-700 rounded-lg bg-transparent text-white"
                placeholder="••••••••"
              />
              <div
                className="absolute right-3 top-3 text-xl text-neutral-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isEyeOpen ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>
          {loginState && (
            <p className="text-sm  text-red-500">
              {loginState?.error?.email || loginState?.error?.password}
            </p>
          )}
          {/* submit btn */}
          <SubmitBtn />
        </form>

        <p className="text-center text-sm text-neutral-500">
          Don’t have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-yellow-100 underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};
function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer bg-neutral-800 text-white py-2 rounded-lg hover:bg-neutral-700 transition"
    >
      Log in
    </button>
  );
}
export default LoginForm;
