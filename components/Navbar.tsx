import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full py-6 px-4 md:px-12 flex justify-between items-center ">
      <Link href="/">
        <div className="flex items-center gap-2">
          {" "}
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={100}
            height={100}
            className="w-10 rounded-lg"
          ></Image>
          <h3 className="font-[--font-robotoCondensed] text-2xl">EzyExpense</h3>
        </div>
      </Link>
      <div className="flex justify-center items-center gap-12">
        <Link href="">Services</Link>
        <Link href="">Features</Link>
        <Link href="">Dashboard</Link>
      </div>
      <div>
        <Link href="">
          <button className="text-amber-300 cursor-pointer ">sign in</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
