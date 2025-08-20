import Image from "next/image";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
const OverViewSection = () => {
  return (
    <main id="features" className=" border-neutral-800 w-full md:h-[100vh]">
      <h3 className="text-center pt-4 flex items-center text-3xl w-full justify-center gap-1 text-neutral-300 font-semibold">
       Features
      </h3>

      <div className="w-full border-t-1 mt-4 border-b-1 h-[80%] border-neutral-800 flex items-center justify-center">
        <div className="lg:w-[70%] h-full border-r-1 md:border-l-1 border-neutral-800 grid grid-cols-1 md:grid-cols-3 ">
          {/* box1 */}
          <div className=" h-[40vh] md:h-full col-span-1 md:col-span-2  md:border-r-1 bg-neutral-950 border-neutral-800 flex flex-col items-end justify-end overflow-hidden">
            <h3 className="text-left w-full  font-bold flex  items-center px-4 text-neutral-500 py-4 text-lg">
              ✨Get a quick glance at your budget and expenses
            </h3>
            <div className="w-[90%] relative h-[80%] bg-neutral-500/50    border-amber-400/30 border-l border-t-1">
              <Image
                src={"/first.png"}
                fill
                alt="features image"
                className="object-cover object-left-top"
              ></Image>
            </div>
          </div>
          {/* box2 */}
          <div className=" h-[40vh] md:h-full col-span-1 flex border-t-1 md:border-0 border-neutral-800 flex-col items-end bg-neutral-950 justify-end overflow-hidden">
            <h3 className="text-left w-full  font-bold flex  items-center px-4 text-neutral-500 py-4 text-lg">
             ✨Track your spending across different categories.
            </h3>
            <div className=" w-[90%] h-[80%] relative bg-neutral-500/50      border-amber-400/30 border-l border-t-1">
              <Image
                src={"/second.png"}
                fill
                alt="features image"
className="object-cover object-top md:object-left-to"
              ></Image>
            </div>
          </div>
          {/* box3 */}
          <div className=" h-[40vh] md:h-full col-span-1 border-t-1  border-neutral-800 bg-neutral-950 flex flex-col items-end justify-end overflow-hidden">
            <h3 className="text-left w-full  font-bold flex  items-center px-4 text-neutral-500 py-4 text-lg">
              ✨Visualize your daily expense trends with insightful graphs
            </h3>
            <div className=" w-[90%] h-[80%] relative bg-neutral-500/50     border-amber-400/30 border-l border-t-1">
              <Image
                src={"/third.png"}
                fill
                alt="features image"
className="object-cover object-bottom md:object-left-to"
              ></Image>
            </div>
          </div>
          {/* box4 */}
          <div className="hidden h-[100%] md:h-full col-span-1 md:col-span-2 md:border-l-1 border-t-1 bg-neutral-950  border-neutral-800 md:flex flex-col items-end justify-end overflow-hidden">
            <h3 className="text-left w-full  font-bold flex  items-center px-4 text-neutral-500 py-4 text-lg">
              ✨Keep track of all your expenses with detailed logs
            </h3>
            <div className=" w-[90%] h-[80%] relative bg-neutral-500/50    border-amber-400/30 border-l border-t-1">
              <Image
                src={"/fourth.png"}
                fill
                alt="features image"
                className="object-cover object-top"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OverViewSection;
