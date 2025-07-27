
import { Cardhover } from "@/components/Cardhover";
import { Globe } from "@/components/Globe";
import Hero from "@/components/Hero";
import { Story } from "@/components/Story";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Hero />

      
      <section className="pt-24">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          What's Hot
        </h1>

        <div className="mt-12">
          <Story />
        </div>
      </section>

      <section className="mt-12">
        <div className="mt-12">
            <Globe/>
        </div>
      </section>
    </main>
  );
}
