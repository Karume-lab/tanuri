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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map((benefit) => (
          <Card
            key={benefit.title}
            className="group bg-primary-foreground text-primary border border-primary/10 hover:border-primary/40 transition-all rounded-xl shadow-sm hover:shadow-md p-6"
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
    </section>
  );
};

export default Benefits;
