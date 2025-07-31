"use client";
import { LogOut, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoExitOutline } from "react-icons/io5";
import { logOut } from "@/redux/slice/userSlice";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const session = data;


  const handleLogOut = () => {
    signOut({ redirectTo: "/" });
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="w-full py-2 lg:py-4 px-4 md:px-12 flex justify-between items-center "
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
      <div className="hidden md:flex text-neutral-200 justify-center items-center gap-12">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        <Link href="#testimonials">Testimonials</Link>
        <Link href={session?.user?'/dashboard/dashboard-page':'/login'}>Dashboard</Link>
      </div>
      <div>
        {!session?.user?.name ? (
          <Link href="/login">
            <button className="text-amber-200 cursor-pointer  py-3 pl-6 flex items-center gap-2">
              log in <MoveRight />
            </button>
          </Link>
        ) : (

          <ProfileDropdown/>
          // <button
          //   onClick={handleLogOut}
          //   className="text-red-300 cursor-pointer  py-3 pl-6 flex items-center gap-2"
          // >
          //   log out <IoExitOutline />
          // </button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
