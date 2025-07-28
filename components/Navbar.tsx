"use client";
import { LogOut, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoExitOutline } from "react-icons/io5";
import { logOut, setUser } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";
import { googleSignOut, logout } from "@/app/actions/actions";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);
  //google user
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleUserSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) return;
        const resData = await res.json();
        if (resData?.user) {
          dispatch(setUser(resData.user));
        }
      } catch (err) {
        console.error("Failed to fetch session", err);
      }
    };

    handleUserSession();
  }, [dispatch]);

  const handleLogOut = () => {
    logout();
    googleSignOut();
    router.push("/");
    dispatch(logOut());
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="w-full py-4 px-4 md:px-12 flex justify-between items-center"
    >
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="w-8 rounded-lg"
          />
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
        {user?.name || session?.user ? (
          <button
            onClick={handleLogOut}
            className="text-amber-200 cursor-pointer py-3 pl-6 flex items-center gap-2"
          >
            log out <IoExitOutline />
          </button>
        ) : (
          <Link href="/login">
            <button className="text-amber-200 cursor-pointer py-3 pl-6 flex items-center gap-2">
              log in <MoveRight />
            </button>
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
