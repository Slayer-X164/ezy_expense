import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function login(){
    return (
        <div className="w-full h-[80vh] px-4 lg:px-6 flex items-center justify-center">
            <section className="bg-neutral-900 w-full lg:w-[80%] h-full lg:h-[80vh] flex items-center justify-center">
                <div className="w-full lg:w-[50%]  h-full">
                    <LoginForm/>
                </div>
                <div className="w-[50%] hidden lg:flex h-full overflow-hidden rounded-l-[5rem]">
                    <Image src='/login-bg.jpg' alt="login img" width={1000} height={1000} className="object-cover object-center w-full h-full"></Image>
                </div>
            </section>
        </div>
    )
}