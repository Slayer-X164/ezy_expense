'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdDashboard, MdWorkspacePremium } from "react-icons/md"
import { GrMoney } from "react-icons/gr"
import { GiPayMoney } from "react-icons/gi"

const links = [
  { href: "/dashboard/dashboard-page", label: "Dashboard", icon: <MdDashboard className="text-2xl"  />,color:'text-blue-400' },
  { href: "/dashboard/budgets", label: "Budgets", icon: <GrMoney className="text-2xl" />,color:'text-green-700' },
  { href: "/dashboard/expenses", label: "Expenses", icon: <GiPayMoney className="text-2xl" />,color:'text-red-400' },
  { href: "/dashboard/upgrade", label: "Upgrade", icon: <MdWorkspacePremium className="text-2xl" />,color:'text-yellow-400' },
]

const SideBar = () => {
  const pathname = usePathname()

  return (
    <div className=" border-r border-neutral-800">
      <div className="flex pt-8 w-[200px] md:w-[250px] lg:w-[350px] flex-col py-4 gap-4    text-lg font-extralight ">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 py-2 px-6 md:px-12 ${
                isActive ? `bg-neutral-800/80 ` : "bg-transparent"
              }`}
            >
              <h3 className={`${link.color}`}>{link.icon}</h3>
              <h3 className="">{link.label}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
