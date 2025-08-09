import React from "react";
import { motion } from "framer-motion";
import { RiLoaderLine } from "react-icons/ri";
const ActionLoader = ({ actionLoader }: { actionLoader: boolean }) => {
  return (
    <>
      {actionLoader && (
        <tr className="absolute w-full h-full bg-neutral-900/80">
          <td className="flex items-center  justify-center h-full">
            <motion.h3
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-4xl"
            >
              <RiLoaderLine className=" text-neutral-300" />
            </motion.h3>
          </td>
        </tr>
      )}
    </>
  );
};

export default ActionLoader;
