import { Github, Globe, Linkedin } from "lucide-react";

export const TEAM_MEMBERS = [
  {
    id: crypto.randomUUID(),
    imageUrl: "/limisi.png",
    name: "Emanuel Limisi",
    role: "Research",
    description:
      "Focused on gathering insights, analyzing market needs, and validating ideas to ensure our solutions deliver real-world value.",
    socials: [
      {
        Icon: Github,
        href: "https://github.com/quadroli/",
      },
      {
        Icon: Linkedin,
        href: "https://www.linkedin.com/in/emmanuel-limisi-235a59351/",
      },
      {
        Icon: Globe,
        href: "https://limisi.srht.site/",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    imageUrl: "/karume.png",
    name: "Daniel Karume",
    role: "Developer - Backend, Mobile, Frontend",
    description:
      "Full-stack engineer building secure backend systems, smooth mobile apps, and high-performance web experiences. Led initial setup, backend and landing page development, mobile integration, and monorepo configuration.",
    socials: [
      {
        Icon: Github,
        href: "https://github.com/Karume-lab/",
      },
      {
        Icon: Linkedin,
        href: "https://www.linkedin.com/in/daniel-karume/",
      },
      {
        Icon: Globe,
        href: "https://karume.vercel.app/",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    imageUrl: "/joseph.png",
    name: "Joseph Ngure",
    role: "Developer - Mobile",
    description:
      "Crafts intuitive and reliable mobile applications with a strong focus on performance and user experience.",
    socials: [
      {
        Icon: Github,
        href: "https://github.com/ngure1/",
      },
      {
        Icon: Linkedin,
        href: "https://www.linkedin.com/in/ngure1/",
      },
      {
        Icon: Globe,
        href: "https://ngure1.vercel.app/",
      },
    ],
  },
];
