import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BENEFITS } from "@/data";

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="px-4 sm:px-8 lg:px-20 py-16 bg-primary text-primary-foreground"
    >
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Why Choose Tanuri
        </h2>
        <p className="text-primary-foreground/80 text-base sm:text-lg">
          Discover how Tanuri helps you streamline your workflow, save time, and
          maximize productivity with smart, intuitive features.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="w-full h-auto lg:h-full rounded-xl overflow-hidden shadow-lg border border-primary/20 flex">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:aspect-auto lg:h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/HeLSJTUb81c?feature=shared"
              title="Tanuri Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 h-full">
          {BENEFITS.map((benefit) => (
            <Card
              key={benefit.title}
              className="group bg-primary-foreground text-primary border border-primary/10 hover:border-primary/40 transition-all rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col justify-between"
            >
              <CardHeader className="flex flex-col gap-3">
                <benefit.icon className="size-8 text-primary group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg font-semibold">
                  {benefit.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
