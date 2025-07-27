"use client";
import { LogOut, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoExitOutline } from "react-icons/io5";
import { logOut } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/sessionFunctions";
import { logout } from "@/app/actions/actions";
import { useEffect, useState } from "react";

interface UserType {
  _id: string;
  name?: string;
  email?: string;
  createdAt: string;
  password: string;
  updatedAt: string;

}

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<UserType|null>();

  useEffect(() => {
    const handleUserSession = async () => {
      const res = await fetch("/api/session",{method:'GET'});
      const resData = await res.json();
      // console.log(resData);
      setUser(resData.user);
    };
    handleUserSession();
  },[]);
  if(user){
    console.log(user?._id);
  }

  const handleLogOut = () => {
    logout();
    setUser(null)
    router.push("/");
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="w-full py-4 px-4 md:px-12 flex justify-between items-center "
    >
      <Link href="/">
        <div className="flex items-center gap-2">
          {" "}
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="w-8 rounded-lg"
          ></Image>
          <h3 className="font-[--font-robotoCondensed] text-xl">EzyExpense</h3>
        </div>
      </Link>
      <div className="hidden md:flex text-neutral-400 justify-center items-center gap-12">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        <Link href="#testimonials">Testimonials</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div>
        {!user?._id? (
          <Link href="/login">
            <button className="text-amber-200 cursor-pointer  py-3 pl-6 flex items-center gap-2">
              log in <MoveRight />
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogOut}
            className="text-amber-200 cursor-pointer  py-3 pl-6 flex items-center gap-2"
          >
            log out <IoExitOutline />
          </button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
