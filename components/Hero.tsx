"use client";
import Image from "next/image";
import Link from "next/link";
import Star from "./Star";
import { motion } from "framer-motion";
import CurvyLine from "./CurvyLine";
import GraphLine from "./GraphLine";

const Hero = () => {
  return (
    <main className="border-b-1 border-t-1 flex  border-neutral-400 w-full h-[70vh] md:h-[80vh] ">
      <div className="flex flex-col items-center justify-center gap-6 w-[50%] h-full border-r-1 border-neutral-400 px-6 md:px-12 ">
        <p className="text-6xl md:8xl leading-18 w-[90%] font-semibold">
          Manage Your Expenses Easily with{" "}
          <span className="font-[--font-robotoCondensed] bg-gradient-to-br text-transparent bg-clip-text from-blue-400 via-neutral-50 to-pink-600">
            EzyExpense
          </span>
        </p>
        <p className="w-[90%] text-neutral-400">
          {" "}
          With EzyExpense, you can effortlessly record daily expenses,
          categorize your spending, and set clear budget goals—all from a sleek,
          intuitive dashboard
        </p>
        <div className="w-[90%]">
          <Link href="">
            <button className="bg-gradient-to-br from-blue-400 via-neutral-50 to-pink-600 py-4 px-8 text-neutral-950 font-semibold shadow-2xl shadow-pink-300/35 cursor-pointer mt-3">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
      <div className="w-[50%] h-full grid grid-rows-3 ">
        {/* 1st row */}
        <div className="w-full  grid grid-cols-3">
          {/* first cube */}
          <div className="w-full overflow-hidden border-r-1 border-neutral-300 flex justify-center items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="bg-gradient-to-r   border-neutral-300"
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
        <div className="w-full  border-t-1 border-neutral-300 border-b-1">
          <GraphLine />
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
              className=" border-neutral-300 "
            >
              <Star color1="#f2bfec" color2="#b2b7f7" />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
