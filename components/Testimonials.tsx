"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { IoMdQuote } from "react-icons/io";
import { motion, useInView } from "framer-motion";

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
    id: 3,
    text: "I love how simple and clean the interface is. EzyExpense makes expense tracking fun and stress-free!",
    name: "Aditya Mehta",
    img: "/testimonials/boy2.jpg",
  },
  {
    id: 4,
    text: "As a student, EzyExpense helps me stay within budget every month. Highly recommend it.",
    name: "Neha Barai",
    img: "/testimonials/neha.jpeg",
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

// Parent animation (controls stagger)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // delay between cards
    },
  },
};

// Each card animation
const cardVariants = {
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
      className="border-b-1 border-neutral-800 w-full"
    >
      <div className="w-full h-full py-2 text-center mt-6 md:mt-0">
        <h3 className="text-4xl font-semibold">Testimonials</h3>
      </div>

      <div className="w-full border-t-1 p-6 border-neutral-800 flex items-center justify-center">
        <motion.div
          className="w-[70%] grid gap-6 grid-cols-1 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-gradient-to-br from-neutral-400 via-neutral-800 to-neutral-950 p-[1px] min-h-[300px] min-w-[300px]"
            >
              <div className="w-full h-full bg-neutral-950/80 py-6 px-6">
                <h3 className="text-8xl text-neutral-500">
                  <IoMdQuote />
                </h3>
                <div className="flex flex-col mt-6">
                  <p className="text-sm font-light text-neutral-300">
                    {t.text}
                  </p>
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
                      <h3 className="text-neutral-200 font-semibold">
                        {t.name}
                      </h3>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-xs"
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
