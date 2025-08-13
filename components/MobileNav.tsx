import Link from "next/link";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {motion} from 'framer-motion'
const MobileNav = ({ openMobileNav }: any) => {
  useEffect(() => {
    if (openMobileNav) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }
    return () => {
      document.body.style.overflow = ""; // cleanup on unmount
    };
  }, [openMobileNav]);
  return (
    <motion.div
     initial={{ x: '100%' }}
      animate={{ x: 0 }}    
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
     className="bg-black text-neutral-200 h-screen  w-screen absolute  top-[60px] left-0 ">

       <div className="w-full h-[60%] flex items-left p-6 justify-center flex-col text-4xl gap-6 font-bold">
          <Link href="" className="w-full border-b pb-2">Home</Link>
          <Link href="" className="w-full border-b pb-2">Features</Link>
          <Link href="" className="w-full border-b pb-2">Testimonials</Link>
          <Link href="" className="w-full border-b pb-2">Dashboard</Link>
        </div>
    </motion.div>
  );
};

export default MobileNav;
