"use client"
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {motion} from 'framer-motion'
const Navbar = () => {
  return (
    <motion.nav
    initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.8,delay:1}}
    className="w-full py-6 px-4 md:px-12 flex justify-between items-center ">
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
      <div className="flex text-neutral-400 justify-center items-center gap-12">
        <Link href="/" className="text-neutral-50">Home</Link>
        <Link href="">Features</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="">Testimonials</Link>
      </div>
      <div>
        <Link href="">
          <button className="text-amber-200 cursor-pointer  py-3 px-6 flex items-center gap-2">sign in <MoveRight  /></button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
