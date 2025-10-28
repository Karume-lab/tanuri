import { DownloadAppButton } from "@/components";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="px-6 sm:px-12 lg:px-20 py-24 flex flex-col lg:flex-row items-center justify-between gap-10"
    >
      <div className="flex flex-col gap-6 max-w-xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Gas Delivery Made <span className="text-primary">Fast & Easy</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Tanuri brings convenience to your doorstep — order cooking gas in
          seconds, track deliveries in real-time, and enjoy secure mobile
          payments.
        </p>

        <div>
          <DownloadAppButton />
        </div>
      </div>

      <div className="w-full max-w-md">
        <img
          src="/hero/gas-delivery.png"
          alt="Tanuri Gas Delivery"
          className="w-full object-cover drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;
