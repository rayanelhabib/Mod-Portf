import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-[#16181f] selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      <Navbar />

      <main className="min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-16 md:px-24 lg:pl-36 lg:pr-24 pt-24 pb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.06] rounded-full blur-[180px] pointer-events-none" />
      </main>
    </div>
  );
}
