'use client'

import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { LogOut, UserCircle } from 'lucide-react'
import Image from 'next/image'

const UserDropdown = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const userName = session?.user?.name || 'User'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center cursor-pointer gap-2 px-4 py-1.5  bg-neutral-800/50 border-1 border-neutral-700 text-white hover:bg-neutral-700 transition"
        aria-expanded={isOpen}
      >
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            alt="User Avatar"
            width={26}
            height={26}
            className="rounded-full"
          />
        ) : (
          <UserCircle className="w-6 h-6" />
        )}
        <span className="hidden md:inline text-sm truncate w-20">{userName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-auto bg-neutral-900 text-neutral-50 shadow-lg border-1 border-neutral-700 z-50 overflow-hidden">
          <div className="px-4 py-3 text-xs border-b border-neutral-600 ">

            <span>{session?.user?.email}</span>
          </div>
          <button
            onClick={() => signOut({redirectTo:'/'})}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-900/30 cursor-pointer flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
