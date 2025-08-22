import Footer from "@/components/main/Footer";
import Contact from "@/components/main/home/Contact";
import Facts from "@/components/main/home/Facts";
import Header from "@/components/main/home/Header";
import Testimonials from "@/components/main/home/Testimonials";
import WhyUs from "@/components/main/home/WhyUs";
import Navbar from "@/components/main/navbar/Navbar";

export default function page() {
  return (
    <div className="flex flex-col">
      <div className=" w-full z-[100]">
        <Navbar />
      </div>
      <div className="w-full overflow-hidden">
        <Header />
      </div>
      <WhyUs />
      <Facts />
      <Testimonials />
      <div className="w-full py-4 flex justify-center items-center bg-[#f5faff81]">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
