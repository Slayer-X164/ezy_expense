import Hero from "@/components/Hero";
import OverViewSection from "@/components/OverViewSection";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <OverViewSection/>
      <Testimonials/>
    </div>
  );
}
