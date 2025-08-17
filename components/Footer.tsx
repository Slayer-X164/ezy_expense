import Link from "next/link";
import { SiGithub } from "react-icons/si";
const Footer = () => {
  return (
    <div className="w-full h-full py-6 text-sm text-neutral-400 justify-center flex items-center opacity-50">
      Made by <Link className="pl-1 font-bold flex items-center gap-1" href={"https://github.com/Slayer-X164"}><SiGithub className="text-md"/> Slayer-X164  </Link>
    </div>
  );
};

export default Footer;
