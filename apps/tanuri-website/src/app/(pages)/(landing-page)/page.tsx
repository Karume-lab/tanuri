import {
  Benefits,
  Faqs,
  Footer,
  HeroSection,
  Navbar,
  TeamMembers,
} from "@/components";

const IndexPage = () => {
  return (
    <div>
      <HeroSection />
      <Benefits />
      <TeamMembers />
      <Faqs />
    </div>
  );
};

export default IndexPage;
