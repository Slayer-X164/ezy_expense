"use client";
import Image from "next/image";
import Link from "next/link";
import Star from "./Star";
import { motion } from "framer-motion";
import CurvyLine from "./CurvyLine";
import GraphLine from "./GraphLine";

const Hero = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
        delayChildren:0.3
      },
    },

  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0,
      transition:{
        duration:0.6,

      }
     },

  };

  return (
    <main className="border-b-1 border-t-1 flex flex-col lg:flex-row border-neutral-400 w-full  lg:h-[80vh] ">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center gap-6 w-[100%] lg:w-[50%] h-full border-b-1 lg:border-r-1 border-neutral-400 py-12 lg:py-6 px-0 md:px-12 "
      >
        <motion.p
          variants={item}
          className="text-6xl md:6xl lg:8xl leading-18 w-[90%] font-semibold"
        >
          Manage Your Expenses Easily with{" "}
          <span className="font-[--font-robotoCondensed] bg-gradient-to-br text-transparent bg-clip-text from-blue-400 via-neutral-50 to-pink-600">
            EzyExpense
          </span>
        </motion.p>
        <motion.p variants={item} className="w-[90%] text-neutral-400">
          {" "}
          With EzyExpense, you can effortlessly record daily expenses,
          categorize your spending, and set clear budget goals—all from a sleek,
          intuitive dashboard
        </motion.p>
        <motion.div variants={item} className="w-[90%]">
          <Link href="">
            <button className="bg-gradient-to-br from-blue-400 via-neutral-50 to-pink-600 py-4 px-8 text-neutral-950 font-semibold shadow-2xl shadow-pink-300/35 cursor-pointer mt-3">
              Get Started Now
            </button>
          </Link>
        </motion.div>
      </motion.div>
      <div className="w-[100%] lg:w-[50%] h-full grid grid-rows-3 ">
        {/* 1st row */}
        <div className="w-full  grid grid-cols-3">
          {/* first cube */}
          <div className="w-full overflow-hidden border-r-1 border-neutral-300 flex justify-center items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="bg-gradient-to-r  w-34 md:w-full border-neutral-300"
            >
              <Star color1="#faff66" color2="#f5a2f5" />
            </motion.div>
          </div>
          {/* second cube */}
          <div className="w-full "></div>
          {/* third cube */}
          <div className="w-full  border-l-1 border-neutral-300 overflow-hidden">
            <CurvyLine colorStart="#faff66" colorEnd="#f5a2f5" />
            {/* <CurvyLine  colorStart='#faff66' colorEnd="#f5a2f5" /> */}
          </div>
        </div>
        {/* 2nd row */}
        <div className="w-full relative border-t-1 border-neutral-300 border-b-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay:1.2
            }}
            className="absolute  top-5 md:top-10 left-5 md:left-10 text-md lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-600 to-neutral-900 font-bold"
          >
            Keep Expenses
          </motion.h3>
          <GraphLine />
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay:1.5
            }}
            className="absolute bottom-5 right-5 md:bottom-10 md:right-10 text-md lg:text-2xl bg-clip-text text-transparent bg-gradient-to-l from-neutral-50 via-neutral-600 to-neutral-900 font-bold"
          >
            Crystal Clear
          </motion.h3>
        </div>
        {/* 3rd row */}
        <div className="w-full  grid grid-cols-3">
          {/* first cube */}
          <div className="w-full  border-r-1 border-neutral-300 overflow-hidden">
            <CurvyLine colorStart="#5542bd" colorEnd="#faff66" />
          </div>
          {/* second cube */}
          <div className="w-full "></div>
          {/* third cube */}
          <div className="w-full overflow-hidden  border-l-1 border-neutral-300 flex justify-center items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className=" border-neutral-300 w-34 md:w-full"
            >
              <Star color1="#64e873" color2="#e68e87" />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
