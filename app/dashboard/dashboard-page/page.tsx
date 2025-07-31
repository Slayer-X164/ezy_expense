'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function dashboardPage() {
  const {data} = useSession()
  const session = data
  if(!session){
    redirect('/')
  }
  return (
    <div
       className=" w-full  "
    >
      hello
    </div>
  );
}
