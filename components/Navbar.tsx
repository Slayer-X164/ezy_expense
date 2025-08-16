"use client";
import { LogOut, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoExitOutline } from "react-icons/io5";
import { logOut } from "@/redux/slice/userSlice";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileDropdown from "./ProfileDropdown";
import { RiMenu3Line } from "react-icons/ri";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { AiOutlineClose } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const session = data;

  const [openMobileNav, setOpenMobileNav] = useState(false);

  const handleLogOut = () => {
    signOut({ redirectTo: "/" });
  };
  const handleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="w-full py-4  px-4 md:px-12 flex justify-between items-center relative"
    >
      <Link href="/">
        <div className="flex items-center gap-2">
          {" "}
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="w-8 "
          ></Image>
          <h3 className=" text-xl">EzyExpense</h3>
        </div>
      </Link>
      <div className="hidden lg:flex text-neutral-200 justify-center items-center gap-12">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        <Link href="#testimonials">Testimonials</Link>
        <Link href={session?.user ? "/dashboard/dashboard-page" : "/login"}>
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {!session?.user?.name ? (
          <Link href="/login">
            <button className="text-amber-200 cursor-pointer  py-3 pl-6 flex items-center gap-1">
              log in <CiLogin className="text-xl"/>
            </button>
          </Link>
        ) : (
          <ProfileDropdown />
        )}
        <div className="cursor-pointer  lg:hidden" onClick={handleMobileNav}>
          {openMobileNav ? (
            <AiOutlineClose className="text-4xl  text-neutral-300" />
          ) : (
            <RiMenu3Line className="text-4xl  text-neutral-300" />
          )}
        </div>
      </div>
      <AnimatePresence>
        {openMobileNav && (
          <MobileNav
            openMobileNav={openMobileNav}
            setOpenMobileNav={setOpenMobileNav}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
