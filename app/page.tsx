import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Quiz from "@/components/Quiz";
import { Process, About } from "@/components/Process";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden text-neutral-300">
      {/* Ambient background layers */}
      <div className="ambient-light"></div>
      <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <Header />
      <Hero />
      <WhyUs />
      <Services />
      <Quiz />
      <Process />
      <About />
      <Footer />
    </main>
  );
}
