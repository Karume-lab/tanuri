import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TEAM_MEMBERS } from "@/data";

const TeamMembers = () => {
  return (
    <section id="team" className="py-16 px-6 lg:px-24 bg-muted/30">
      <h2 className="text-3xl font-bold text-center mb-12">The Team</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {TEAM_MEMBERS.map((teamMember) => (
          <Card key={teamMember.id} className="text-center p-0 overflow-hidden">
            <div className="relative h-96 overflow-hidden">
              <div className="absolute top-3 left-3 flex flex-col gap-y-2 z-10">
                {teamMember.socials.map((social) => (
                  <Button key={social.href} asChild size="icon">
                    <Link href={social.href} target="_blank" rel="noreferrer">
                      <social.Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>

              <Image
                src={teamMember.imageUrl}
                alt={teamMember.name}
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>

            <CardHeader className="pt-4">
              <CardTitle className="text-lg font-semibold">
                {teamMember.name}
              </CardTitle>
              <Badge
                variant="secondary"
                className="text-xs font-medium mx-auto"
              >
                {teamMember.role}
              </Badge>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {teamMember.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TeamMembers;
