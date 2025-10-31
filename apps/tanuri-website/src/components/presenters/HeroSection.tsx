import Image from "next/image";
import { DownloadAppButton } from "@/components";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="px-6 sm:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20"
    >
      <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Gas Delivery Made <span className="text-primary">Fast & Easy</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Tanuri brings convenience to your doorstep - order cooking gas in
          seconds, track deliveries in real-time, and enjoy secure mobile
          payments.
        </p>

        <div>
          <DownloadAppButton />
        </div>
      </div>

      <div className="relative w-full max-w-2xl lg:max-w-3xl flex justify-center">
        <div className="relative w-full aspect-5/4 sm:aspect-4/3">
          <Image
            src="/hero-bg.png"
            alt="Tanuri Gas Delivery"
            fill
            className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
