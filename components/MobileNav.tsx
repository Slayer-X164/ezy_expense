import Link from "next/link";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"
import { MdDashboard, MdWorkspacePremium } from "react-icons/md"
import { GrMoney } from "react-icons/gr"
import { GiPayMoney } from "react-icons/gi"

const links = [
  { href: "/dashboard/dashboard-page", label: "Dashboard", icon: <MdDashboard className="text-2xl"  />,color:'text-blue-400' },
  { href: "/dashboard/budgets", label: "Budgets", icon: <GrMoney className="text-2xl" />,color:'text-green-700' },
  { href: "/dashboard/expenses", label: "Expenses", icon: <GiPayMoney className="text-2xl" />,color:'text-red-400' },

]
const MobileNav = ({ openMobileNav, setOpenMobileNav }: any) => {
    const pathname = usePathname()
  useEffect(() => {
    if (openMobileNav) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }
    return () => {
      document.body.style.overflow = ""; // cleanup
    };
  }, [openMobileNav]);

  const handleClose = () => setOpenMobileNav(false);
  const {data:session} = useSession()
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="bg-black text-neutral-200 h-screen w-screen absolute z-50 top-[60px] left-0"
    >
      <div className="w-full h-full flex items-left p-6 justify-self-start flex-col  gap-6 font-bold">
        <Link href="/" onClick={handleClose} className="w-full border-b pb-2">
          Home
        </Link>
        <Link href="/features" onClick={handleClose} className="w-full border-b pb-2">
          Features
        </Link>
        <Link href="/testimonials" onClick={handleClose} className="w-full border-b pb-2">
          Testimonials
        </Link>
         {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleClose}
              className={`flex items-center gap-2 py-2 px-4 md:px-12 text-2xl ${
                isActive ? `bg-neutral-800/80 ` : "bg-transparent"
              }`}
            >
              <h3 className={`${link.color}`}>{link.icon}</h3>
              <h3 className="">{link.label}</h3>
            </Link>
          )
        })}
      </div>
    </motion.div>
  );
};

export default MobileNav;
