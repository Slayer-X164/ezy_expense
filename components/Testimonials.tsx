"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { IoMdQuote } from "react-icons/io";
import { motion, useInView, Variants } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "EzyExpense has completely changed the way I manage my money. Tracking my daily expenses is now effortless!",
    name: "Pragati Yerunkar",
    img: "/testimonials/pragati.jpeg",
  },
  {
    id: 2,
    text: "The monthly budget insights are a lifesaver. I was finally able to save more by identifying where my money goes.",
    name: "Shubham Yadav",
    img: "/testimonials/shubham.jpeg",
  },
  {
    id: 4,
    text: "As a student, EzyExpense helps me stay within budget every month. Highly recommend it.",
    name: "Neha Barai",
    img: "/testimonials/neha.jpeg",
  },
  {
    id: 3,
    text: "I love how simple and clean the interface is. EzyExpense makes expense tracking fun and stress-free!",
    name: "Aditya Mehta",
    img: "/testimonials/boy2.jpg",
  },

  {
    id: 5,
    text: "The graphs and charts give me a clear picture of my spending habits. It’s like having a personal finance assistant.",
    name: "Vikram Nair",
    img: "/testimonials/boy3.jpg",
  },
  {
    id: 6,
    text: "I tried multiple apps before, but EzyExpense is the only one I stuck with. It’s reliable, simple, and super effective.",
    name: "Neha Patel",
    img: "/testimonials/girl3.jpg",
  },
];

// ✅ Add proper typing for Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // delay between cards
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <main
      id="testimonials"
      ref={ref}
      className="border-b border-neutral-800 w-full"
    >
      <div className="w-full py-2 text-center mt-6 md:mt-0">
        <h3 className="text-4xl font-semibold">Testimonials</h3>
      </div>

      <div className="w-full border-t p-6 border-neutral-800 flex items-center justify-center">
        <motion.div
          className="w-[70%] grid gap-6 grid-cols-1 lg:grid-cols-3 "
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}

        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-gradient-to-br from-neutral-400 via-neutral-800 to-neutral-950 p-[1px] min-h-[300px] min-w-[300px]  hover:bg-gradient-to-br hover:from-neutral-950 hover:to-neutral-400 hover:transition-colors hover:ease-linear hover:duration-200"
            >
              <div className="w-full h-full bg-black/90 py-6 px-6 ">
                <h3 className="text-8xl text-neutral-800">
                  <IoMdQuote />
                </h3>
                <div className="flex flex-col mt-6">
                  <p className="text-sm font-light text-neutral-300 italic">{t.text}</p>
                  <div className="w-full flex items-center gap-2 mt-4 text-sm">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-neutral-400 font-semibold">
                        {t.name}
                      </h3>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 text-xs"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default Testimonials;
